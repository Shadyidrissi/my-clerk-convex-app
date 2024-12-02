'use client';

// app/page.js
import {  useAuth } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';

export default   function Page() {
  const { userId } =  useAuth();

  if (!userId) {
    return <h1>Please sign in</h1>;
  }

  return <ClientComponent />;
}

// app/ClientComponent.js


 function ClientComponent() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded || !isSignedIn) return null;

  return <h1>Hello, {user?.fullName}</h1>;
}
