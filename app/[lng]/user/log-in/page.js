"use client"
import LogIn from "@/app/[lng]/components/log-in/LogIn"
import LoginByGoogle from "../../components/google-sign/google-sign"
import { signOut, useSession } from "next-auth/react"

export default function Login(){
   const {data:session}=useSession()
   function handleSignout(){
      signOut()
      fetch('/api/token')
   }
return(session?.user ?
   <>
   <button onClick={handleSignout}>sign out</button>
   </>:<>
   <LogIn/>
   <p>or</p>
   <LoginByGoogle/>

</>
 
)
}