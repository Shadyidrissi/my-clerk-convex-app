import { NextResponse } from 'next/server';
import connectToDB from "../../../lib/connectToDB"
import Post from '../../../../models/Post';
import { currentUser } from '@clerk/nextjs/server';
import { request } from 'http';

export async function POST(request) {
  const {title , description,price}= await request.json()
  await connectToDB();
  await Post.create({title,description,price});
  return NextResponse.json({message:"Created Done"},{status:201})
}
export async function GET() {
  await connectToDB();
  const posts =await Post.find();
  return NextResponse.json(posts)
}