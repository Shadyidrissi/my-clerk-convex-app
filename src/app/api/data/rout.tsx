import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  // Get authentication data
  const { userId }:any = auth();

  // Retrieve the current user
  const user = await currentUser();

  if (!userId ) {
    return NextResponse.json({message:"Error"},{status:401});
  }

  return NextResponse.json({
        message:"Done",
        data:{userId:userId,username:user?.username}
    },{status:200})
}
