"use client";
import classes from "./otp.module.css";
import { BsFillShieldLockFill } from "react-icons/bs";
import { BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import "./otp_style.css";
import { auth } from "@/firebase.config";
import {RecaptchaVerifier,signInWithPhoneNumber} from 'firebase/auth'
import Toaster from "react-hot-toast"
import {toast} from "react-hot-toast"
const Otp = () => {
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  function onCaptchVerify(){
   if(!window.recaptchaVerifier){
        window.recaptchaVerifier=new RecaptchaVerifier(auth, 'recaptcha-container',{
            'size':'invisible',
            'callback':(response)=>{
              onSignup()
            },
            'expired-callback':()=>{

            }
        })
    }
  }
  function onSignup(){
    setLoading(true)
    onCaptchVerify()
    const appVerifier=window.recaptchaVerifier
    const formatPh= "+971547809856"
    signInWithPhoneNumber(auth, formatPh, appVerifier)
    .then((confirmationResult) => {
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
setUser(res.user)
setLoading(false)
}).className((err)=>{
  console.log(err);
  setLoading(false)
})
  }
  return (
    <section className={classes.otp}>
        <Toaster toastOptions={{duration:4000}}/>
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
              <OtpInput
                value={otp}
                onChange={setOtp}
                OTPLength={6}
                otpType="number"
                disabled={false}
                autoFocus
              ></OtpInput>
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
