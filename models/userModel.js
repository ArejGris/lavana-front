import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true,'must provide username'],
    },
    email: {
      type: String,
      required: [true,'Must provide an Email'],
    },
    password: {
      type: String,
      required: [true,'must provide password'],
    },
  },
  { timestamps: true }
);
const User = mongoose.models.User || mongoose.model("user", userSchema);
export default User;
