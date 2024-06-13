"use client";
import { useEffect, useState } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { CgSpinner } from "react-icons/cg";
import Link from "next/link";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import cookies from 'react-cookies';
export default function LogIn() {
  const [info, setInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [pending, setPending] = useState("");
  const [notification, setNotification] = useState("");
 // const [tokencookie,setTokencookie]=useCookies(['token2'])
  const route = useRouter();
const {data:session}=useSession()

  function handleInput(e) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!info.email || !info.password) {
      setError("Must provide all credintials");
      return;
    }
    try {
      setPending(true);
     await  signIn("credentials",{
          email:info.email,
          password:info.password,
          role:"user",
          redirect:false
        });
              // Retrieve session immediately after sign-in
        const session = await getSession();
        const token=session?.accessToken
        console.log(token,"token")
        const expires = new Date();
        expires.setDate(expires.getDate() + 30);
    
     cookies.save('token2',token,{expires})
       
       const res=await fetch('http://localhost:5000/user/refresh-token',{
          method:"POST",
          headers:{
            'Authorization':'Bearer '+token
          },
          mode:'cors'
        })
        
        //console.log(tokencookie.token)
        const data=await res.json()
        console.log(data,"my refresh data")
        if(typeof window !=="undefined"){
          localStorage.setItem('refreshToken',data.token)
        }
        route.push('/en/user')
      } catch (error) {
      console.log(error);
      setError("error occured");
      setPending(false);
    }
    
  }
  console.log(info);
  return <>
    <form className={styles.form} onSubmit={handleSubmit}>
        
      {notification && <span className={styles.success}>{notification}</span>}
      <div className={styles.title}>
        <h1>Login</h1>
      </div>

      <div className={styles.form_group}>
        <label htmlFor="">Email</label>
        <input type="email" name="email" onChange={(e) => handleInput(e)} />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="">Password</label>
        <input type="text" name="password" onChange={(e) => handleInput(e)} />
      </div>
      {error && <span className={styles.error}>{error}</span>}
      <div className={styles.actions}>
        <button>
          <span>log in</span>
          {pending && <CgSpinner size={20} className="animate-spin" />}
        </button>
        <Link href="/user/sign-up">sign up</Link>
      </div>
    </form></>
  ;
}
