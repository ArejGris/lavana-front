"use client";
import LogIn from "@/app/[lng]/components/log-in/LogIn";
import LoginByGoogle from "../../components/google-sign/google-sign";
import { signOut, useSession } from "next-auth/react";
import cookies from "react-cookies";
export default function Login() {

  const { data: session } = useSession();
  function handleSignout() {
    signOut({redirect:false});
    
    cookies.remove("token",{path:'/'});
  }

  return (session?.accessToken?
   <>
      <button onClick={handleSignout}>sign out</button>
   </>:<>
 
      <LogIn />
      <p>or</p>
      <LoginByGoogle />
    </>)
}
