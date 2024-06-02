"use client"

import LogIn from "@/app/[lng]/components/log-in/LogIn"
import LoginByGoogle from "../../components/google-sign/google-sign"

export default function Login(){
return(<>
   <LogIn/>
   <p>or</p>
   <LoginByGoogle/>

</>
 
)
}