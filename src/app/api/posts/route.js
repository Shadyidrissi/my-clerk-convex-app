import { NextResponse } from 'next/server';
import connectToDB from "../../../lib/connectToDB"
import Post from '../../../../models/Post';
import { currentUser } from '@clerk/nextjs/server';
import { request } from 'http';

export async function POST(request) {
  try {
    
    const {title , description,price}= await request.json()
    await connectToDB();
    await Post.create({title,description,price});
    return NextResponse.json({message:"Created Done"},{status:201})
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
  }
export async function GET() {
  try {
    await connectToDB();
    const posts = await Post.find();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
