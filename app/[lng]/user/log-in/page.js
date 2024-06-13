"use client"
import LogIn from "@/app/[lng]/components/log-in/LogIn"
import LoginByGoogle from "../../components/google-sign/google-sign"
import { signOut, useSession } from "next-auth/react"
import cookies from "react-cookie"
export default function Login(){
   //const [token,setToken,removeToken]=useCookies(['token'])
   const {data:session}=useSession()
   function handleSignout(){
      signOut()
      //removeToken('token',{domain:'localhost'})
      fetch('/api/token',{
         method:"DELETE"
      })
   }
return(session?.accessToken ?
   <>
   <button onClick={handleSignout}>sign out</button>
   </>:<>
   <LogIn/>
   <p>or</p>
   <LoginByGoogle/>

</>
 
)
}