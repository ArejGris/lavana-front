"use client";
import classes from "./otp.module.css";
import { BsFillShieldLockFill } from "react-icons/bs";
import { BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OTPInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from "react";
import "./otp_style.css";
import auth from "@/firebase.config";
import {RecaptchaVerifier,signInWithPhoneNumber} from 'firebase/auth'
import Toaster from "react-hot-toast"
import {toast} from "react-hot-toast"
import { useDispatch,useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
const Otp = () => {
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [error,setError]=useState(null)
 // const user1=useSelector((state)=>state.order.user)
 const {data:session}=useSession()
  const route=useRouter()
  function onCaptchVerify(){
   if(!window.recaptchaVerifier){
        window.recaptchaVerifier=new RecaptchaVerifier(auth, 'recaptcha-container',{
            'size':'visible',
            'callback':(response)=>{
              onSignup()
            },
            'expired-callback':()=>{

            }
        })
    }
  }
 useEffect(()=>{
fetch('/api/userId').then(res=>res.json()).then(data=>{
  setUserId(data.userId)
})
if(session){
console.log(session?.user,"session.user")}
 },[])
  function onSignup(){
    setLoading(true)
    //onCaptchVerify()
    console.log(auth)
   const appVerifier=new RecaptchaVerifier(auth, 'recaptcha-container',{
      'size':'invisible',
      'callback':(response)=>{
      },
      'expired-callback':()=>{

      }
  })
    const formatPh= '+'+phone
    signInWithPhoneNumber(auth,formatPh, appVerifier)
    .then((confirmationResult) => {
      console.log(confirmationResult.verificationId)
      window.confirmationResult = confirmationResult;
      setLoading(false)
      setShowOTP(true)
      toast.success("otp sended successfully")
    }).catch((error) => {
      console.log(error)
      setLoading(false)
    });

  }
  function onOTPVerify(){
setLoading(true)
window.confirmationResult.confirm(otp).then(async(res)=>{
console.log(res)
if(res.user){
  fetch("http://localhost:5000/user/confirm", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({userId,phone}),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 200) {
        
        setUser(res.user)
        setLoading(false)
        route.push('/user')
      } else {
        setError(data.message);
      }
    });
}
}).catch((err)=>{
  console.log(err);
  setLoading(false)
  setError(err.message)
})
  }
  return (
    <section className={classes.otp}>
        <Toaster toastOptions={{duration:4000}}/>
        {error&&<>there was un error please confirm it again</>}
        <div id="recaptcha-container"> </div>
      {user ? (
        <h2>login success</h2>
      ) : (
        <div className={classes.container}>
          {showOTP ? (
            <div className={classes.container2}>
              <h1>
                Welcom to <br />
                CODE A PROGRAM
              </h1>
              <div className={classes.icon}>
                <BsFillShieldLockFill size={30} />
              </div>
              <label htmlFor="" className={classes.lbl}>
                Enter your OTP
              </label>
              <OTPInput
                value={otp}
                onChange={setOtp}
                OTPLength={6}
                otpType="number"
                disabled={false}
                autoFocus
              ></OTPInput>
              <button className={classes.btn} onClick={onOTPVerify}>
                <span>verify OTP</span>
                {loading && <CgSpinner size={20} class="animate-spin" />}
              </button>
            </div>
          ) : (
            <div className={classes.container2}>
              <h1>
                Welcom to <br />
                CODE A PROGRAM
              </h1>
              <div className={classes.icon}>
                <BsTelephoneFill size={30} />
              </div>
              <label htmlFor="" className={classes.lbl}>
                Verify your phone number
              </label>
              <div>
                <PhoneInput country={"sy"} value="phone" onChange={setPhone} />
              </div>
              <button className={classes.btn} onClick={onSignup}>
                <span>Send code via SMS</span>
                {loading && <CgSpinner size={20} class="animate-spin" />}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Otp;
