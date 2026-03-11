import Payment from "../DB/models/payment.model.js";
import User from "../DB/models/user.model.js";

export const createPayment = async (req, res) => {
  try {
    const { subscriptionType } = req.body; // weekly or monthly
    const amount = subscriptionType === "weekly" ? 29 : 49;

    // Create payment in DB (status pending)
    let userIdalreadyExist = await Payment.findOne({ userId: req.user._id });
    if (userIdalreadyExist) {
      res.status(401).json({
        success: false,
        msg: "User had already get premium",
      });
    }
    const payment = new Payment({
      userId: req.user._id,
      amount,
      subscriptionType,
    });
    await payment.save();

    // Simulate payment completion
    payment.paymentId = "RAZORPAY123";
    payment.paymentStatus = "completed";
    await payment.save();

    // Update user subscription
    req.user.subscription = subscriptionType;
    req.user.role = "premium";
    req.user.subscriptionExpiresAt = new Date(
      Date.now() +
        (subscriptionType === "weekly" ? 7 : 30) * 24 * 60 * 60 * 1000,
    );
    await req.user.save(); // ✅ saving the document

    res.status(200).json({
      msg: "Payment successful",
      user: req.user,
      payment,
    });
  } catch (err) {
    res.status(500).json({ msg: "Payment failed", error: err.message });
  }
};

// import Razorpay from "razorpay";
// import crypto from "crypto";
// import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "../config/env.js";
// import User from "../DB/models/user.model.js";
// import Payment from "../DB/models/payment.model.js";

// // Initialize Razorpay instance
// const razorpay = new Razorpay({
//   key_id: RAZORPAY_KEY_ID,
//   key_secret: RAZORPAY_KEY_SECRET,
// });

// // Step 1: Create Payment Order
// export const createPayment = async (req, res) => {
//   try {
//     const { subscriptionType } = req.body; // weekly or monthly
//     const amount = subscriptionType === "weekly" ? 29 : 49;

//     // Create Razorpay order
//     const order = await razorpay.orders.create({
//       amount: amount * 100, // Razorpay amount in paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//       payment_capture: 1,
//     });

//     // Save order in DB as pending
//     const payment = new Payment({
//       userId: req.user._id,
//       subscriptionType,
//       amount,
//       paymentId: order.id,
//       paymentStatus: "pending",
//     });
//     await payment.save();

//     res.status(200).json({ msg: "Order created", order, payment });
//   } catch (err) {
//     res.status(500).json({ msg: "Payment creation failed", error: err.message });
//   }
// };

// // Step 2: Verify Payment
// export const verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     // Verify signature
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ msg: "Payment verification failed" });
//     }

//     // Update payment status
//     const payment = await Payment.findOne({ paymentId: razorpay_order_id });
//     payment.paymentStatus = "completed";
//     payment.razorpayPaymentId = razorpay_payment_id;
//     await payment.save();

//     // Update user subscription
//     const user = await User.findById(payment.userId);
//     user.subscription = payment.subscriptionType;
//     user.role = "premium";
//     user.subscriptionExpiresAt = new Date(
//       Date.now() + (payment.subscriptionType === "weekly" ? 7 : 30) * 24 * 60 * 60 * 1000
//     );
//     await user.save();

//     res.status(200).json({ msg: "Payment verified successfully", user, payment });
//   } catch (err) {
//     res.status(500).json({ msg: "Payment verification failed", error: err.message });
//   }
// };
