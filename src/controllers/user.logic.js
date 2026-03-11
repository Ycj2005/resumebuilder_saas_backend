import User from "../DB/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtExpiresIn, jwtSecret } from "../config/env.js";
import mongoose from "mongoose";
import { SignJWT } from "jose";
export const GetUserData = async (req, res) => {
  try {
    let response = await User.find();
    if (response) {
      return res.json({
        status: 200,
        msg: "Data is successfully Fetched!",
        data: response,
      });
    }
  } catch (error) {
    return res.json({
      msg: "data is not fetched !",
      status: 500,
      error: error,
    });
  }
};
export const GetParticularUser = async (req, res) => {
  const id = req.params.id;
  try {
    let response = await User.findById(id).select("-password");
    if (response) {
      res.status(200).json({
        success: true,
        msg: "Data is successfully Fetched!",
        data: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      data: error,
    });
  }
};

export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    let response = await User.create({
      name,
      email,
      password: hashPassword,
    });

    if (response) {
      res.status(200).json({
        success: true,
        status: 200,
        msg: "register successfully",
        data: {
          response,
        },
      });
    }
  } catch (error) {
    return res.json({
      msg: "not registered! !",
      status: 500,
      error: error,
    });
  }
};

export const LoginUser = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, password } = req.body;
    let isUserExist = await User.findOne({ email });
    if (!isUserExist) {
      return res.status(401).json({
        status: 401,
        msg: "Email is not exist",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExist.password,
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: 401,
        msg: "incorrect Password please try again",
      });
    }
    await session.commitTransaction();
    session.endSession();

    const secret = new TextEncoder().encode(jwtSecret);
    const token = await new SignJWT({
      userId: isUserExist._id?.toString(),
      userName: isUserExist.name,
      userEmail: isUserExist.email,
      role: isUserExist.role,
      subscription: isUserExist.subscription,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(jwtExpiresIn)
      .sign(secret);

    // const token = jwt.sign({ userId: isUserExist._id }, jwtSecret, {
    //   expiresIn: jwtExpiresIn,
    // });

    res.cookie("tokenCookie", token, {
      httpOnly: true,
      secure: false, // localhost only
      sameSite: "lax", // correct for localhost
      path: "/",
    });

    res.setHeader("token-in-headers", token);

    return res.status(201).json({
      status: 200,
      msg: "User Logged in Succesfully!",
      success: true,
      data: {
        token,
      },
    });
  } catch (error) {
    console.log("logged in error  :", error);
    return res.status(500).json({
      msg: "not login!",
      error: error,
      success: false,
    });
  }
};
export async function logOut(req, res) {
  try {
    res.cookie("tokenCookie", "", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
      domain: "localhost",
    });
    return res.status(200).json({
      success: true,
      msg: "Logout success",
    });
  } catch (error) {
    return res.status(500).json({ msg: "logout error" });
  }
}

export const updateUserData = async (req, res) => {
  const _id = req.user._id;
  const updateData = req.body;
  try {
    const resume = await User.findOneAndUpdate(
      { _id: req.user._id },
      { ...updateData, _id },
      { upsert: true, new: true },
    );
    if (!resume) {
      res.json({
        msg: "user not saved",
        status: 500,
      });
    }
    res.json({ msg: "user saved", resume, status: 200 });
  } catch (error) {
    res.json({
      msg: "user not update",
      status: 500,
      err: error,
    });
  }
};
