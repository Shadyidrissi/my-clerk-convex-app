import { NextResponse } from 'next/server';
import connectToDB from "../../../lib/connectToDB"
import mongoose from "mongoose";
import Post from '../../../../models/Post';
import { currentUser } from '@clerk/nextjs/server';
import { request } from 'http';

export async function POST(request) {
  try {
    const { title, description, price } = await request.json();

    // جلب المستخدم الحالي
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id; // معرف المستخدم من Clerk

    // تحويل userId إلى ObjectId
    // const objectIdUserId = mongoose.Types.ObjectId(userId);

    await connectToDB();

    // إنشاء المنشور مع ربطه بالمستخدم
    await Post.create({ title, description, price, userId });

    return NextResponse.json({ message: "Created Done" }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    await connectToDB();
    const posts = await Post.find(); // جلب بيانات المستخدم مع المنشور
    // const posts = await Post.find().populate("userId");
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

