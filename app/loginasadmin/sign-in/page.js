'use client'
import {signIn} from "next-auth/react";
import { useRef } from "react";
const SignIn = () => {
    const email=useRef()
    const password=useRef()
    async function sendForm(e){
e.preventDefault()
const email1=email.current.value
const password1=password.current.value
try {
    signIn("credentials",{
        email:email1,
        password:password1,
        callbackUrl: '/admin/addProduct'
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
            <div className="form-group">
             <label htmlFor="">password</label>
             <input type="text" ref={password}/>
            </div>
            <button>sign in</button>
         </form>
    </> );
}
 
export default SignIn;