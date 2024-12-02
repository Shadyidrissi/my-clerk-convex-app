'use client';
import {  useAuth } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';

export default   function Page() {
  const { userId }:any =  useAuth();
  const { user, isLoaded, isSignedIn } = useUser();

  if (!userId) {
    return <h1>Please sign in</h1>;
  }

  if (!isLoaded || !isSignedIn) return null;

  return <h1>Hello, {user?.fullName}</h1>;
}