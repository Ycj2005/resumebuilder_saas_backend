import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 2, maxLength: 50 },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"],
    },
    bio: {
      type: String,
      maxLength: 400,
      default: "",
    },
    personalwebsite: {
      type: String,
      maxLength: 200,
      default: "",
    },
    password: { type: String, required: true, minLength: 6 },
    role: { type: String, enum: ["free", "premium", "admin"], default: "free" },
    subscription: {
      type: String,
      enum: ["free", "weekly", "monthly"],
      default: "free",
    },
    subscriptionExpiresAt: { type: Date, default: null },
    resume: { type: String, default: null }, // URL/path to resume PDF
    isVerified: { type: Boolean, default: false },
    lastLogin: { type: Date },
  },
  { timestamps: true },
);

// Method to check if subscription is active
UserSchema.methods.isSubscriptionActive = function () {
  if (this.subscription === "free") return false;
  if (!this.subscriptionExpiresAt) return false;
  return new Date() < new Date(this.subscriptionExpiresAt);
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
