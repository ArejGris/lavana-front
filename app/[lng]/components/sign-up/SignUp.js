"use client";
import { useEffect, useState } from "react";
import styles from "./signin.module.css";
import { useRouter } from "next/navigation";
import { CgSpinner } from "react-icons/cg";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/features/orderSlice";
import { useTranslation } from "@/app/i18n/client";
export default function SignUp({lng}) {
  const {t}=useTranslation(lng,"signUp")
  const [info, setInfo] = useState({ firstname: "",lastname:"",location:"",city:"",towen:"",phoneNumber:"",birthDate:new Date(),gender:"male", email: "", password: "" });
  const [error, setError] = useState("");
  const [pending, setPending] = useState("");
  const route = useRouter();
const dispatch=useDispatch()
  function handleInput(e) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function inputDate(date){
    setInfo(prev=>({...prev,birthDate:date}))
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!info.firstname ||!info.lastname||!info.phoneNumber||!info.location|| !info.email || !info.password) {
      setError("Must provide all credintials");
      return;
    }
    console.log(info)
    try {
      setPending(true);
      fetch("http://localhost:5000/user/sign", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 200) {
        
    //dispatch(setUser(info))
    route.push('/en/user/otp')
      } else {
        const form = e.target;
        form.reset();
        setError(data.message);
      }
    });
    
      } catch (error) {
      console.log(error);
      setError(error);
      setPending(false);
    }
  }
  console.log(info);
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.title}>
        <h1>Register</h1>
      </div>

      <div className={styles.form_group}>
        <label htmlFor="">{t("firstname")}</label>
        <input type="text" name="firstname" onChange={(e) => handleInput(e)} />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="">{t("lastname")}</label>
        <input type="text" name="lastname" onChange={(e) => handleInput(e)} />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="">{t("phone")}</label>
        <input type="text" name="phoneNumber" onChange={(e) => handleInput(e)} />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="">{t("location")}</label>
        <input type="text" name="location" onChange={(e) => handleInput(e)} />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="">{t("city")}</label>
        <input type="text" name="city" onChange={(e) => handleInput(e)} />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="">{t("towen")}</label>
        <input type="text" name="towen" onChange={(e) => handleInput(e)} />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="">{t("birthday")}</label>
        <DatePicker
        selected={info.birthDate}
        onChange={(date) => inputDate(date)}
        dateFormat="dd/MM/yyyy"
      />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="">{t("gender")}</label>
        <select name="gender" onChange={(e) => handleInput(e)} >
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="other">other</option>

        </select>
      </div>
      <div className={styles.form_group}>
        <label htmlFor="">{t("email")}</label>
        <input type="email" name="email" onChange={(e) => handleInput(e)} />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="">{t("password")}</label>
        <input type="text" name="password" onChange={(e) => handleInput(e)} />
      </div>
      {error && (
        <span className={styles.error}>{error}</span>
      )}
      <div className={styles.actions}>
        <button>
          <span>sign up</span>
          {pending && <CgSpinner size={20} class="animate-spin" />}
        </button>
        <Link href="/user/log-in" >log in</Link>
      </div>
    </form>
  );
}
