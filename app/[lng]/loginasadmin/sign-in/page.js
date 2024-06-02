'use client'
import {signIn,signOut} from "next-auth/react";
import { useRef } from "react";
const SignIn = () => {
    const email=useRef()
    async function sendForm(e){
e.preventDefault()
const email1=email.current.value
try {
    signIn("credentials",{
        email:email1,
        role:"admin",
        callbackUrl: '/en/admin'
      });
} catch (error) {
    console.log(error)
}
    }
    return ( <>
         <form onSubmit={sendForm}>
            <div className="form-group">
             <label htmlFor="">email</label>
             <input type="email" ref={email}/>
            </div>
            <button>sign in</button>
         </form>
    </> );
}
 
export default SignIn;