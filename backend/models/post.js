import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true
  }
);

export const postModel = mongoose.model('Post', postSchema);