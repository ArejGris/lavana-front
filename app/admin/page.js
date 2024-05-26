'use client'
import { useSession } from "next-auth/react";

export default function Admin() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <div>Name: {session.user.id}</div>
        <div>Email: {session.user.email}</div>
        <div>role: {session.user.role}</div>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
}
