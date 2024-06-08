'use client'
import {getSession, signIn,signOut} from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useCookies } from "react-cookie";
const SignIn = () => {
    const [token,setToken]=useCookies(['token'])
    const route=useRouter()
    const email=useRef()
    async function sendForm(e){
e.preventDefault()
const email1=email.current.value
try {
   await signIn("credentials",{
        email:email1,
        role:"admin",
        redirect:false
      });
const session=await getSession()
const token1=session?.accessToken
//setToken('token',token1,{maxAge:30})
       
const res=await fetch('http://localhost:5000/admin/refresh-token',{
    method:"POST",
    headers:{
      'Authorization':'Bearer '+token1
    },
    mode:'cors'
  })
  const data=await res.json()
  if(typeof window !=="undefined"){
    localStorage.setItem("refreshToken",data.token)
  }
  route.push('/en/admin')
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