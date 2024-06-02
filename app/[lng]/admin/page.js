'use client'
import { useSession } from "next-auth/react";
import { Footer } from "../components/Footer/client";

export default function Admin({params: {lng}}) {
  const { data: session } = useSession();

  if (session) {
    return (
      <><>
        <div>Name: {session.user.id}</div>
        <div>Email: {session.user.email}</div>
        <div>role: {session.user.role}</div>
        </>
        <>
        
    <Footer lng={lng}  path='/admin'/>
        </>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
}
