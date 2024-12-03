import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Post= mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post
