import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      index: { unique: true }
    },
    authentication: {
      password: { type: String, required: true, select: false },
    },
  }
);

userSchema.pre("save", async function () {
  this.authentication.password = await bcrypt.hash(this.authentication.password, 12);
});

export const userModel = mongoose.model('User', userSchema);