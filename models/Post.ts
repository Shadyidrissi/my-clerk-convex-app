import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  userId: { type: String, required: true },
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post;

