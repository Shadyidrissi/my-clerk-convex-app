import connectToDB from "../../../lib/connectToDB";
import Post from "../../../../models/Post";
import { currentUser } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  await connectToDB();
  const user = await currentUser();

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const post = await Post.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      // userId: user.id,
    });

    res.status(200).json(post);
  } catch (error) {
    console.error("Failed to create post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
