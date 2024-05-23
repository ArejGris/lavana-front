"use client";
import { useEffect, useState } from "react";
import styles from "./signin.module.css";
import { useRouter } from "next/navigation";
import { CgSpinner } from "react-icons/cg";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function SignIn() {
  const [info, setInfo] = useState({ firstname: "",lastname:"",location:"",city:"",tower:"",phoneNumber:"",birthDate:new Date(),gender:"male", email: "", password: "" });
  const [error, setError] = useState("");
  const [pending, setPending] = useState("");
  const route = useRouter();

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
      fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === 201) {
            const form = e.target;
            form.reset();
            setPending(false);

            route.push("/");
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
        <label htmlFor="">firstName</label>
        <input type="text" name="firstname" onChange={(e) => handleInput(e)} />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="">LastName</label>
        <input type="text" name="lastname" onChange={(e) => handleInput(e)} />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="">PhoneNumber</label>
        <input type="text" name="phoneNumber" onChange={(e) => handleInput(e)} />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="">Location</label>
        <input type="text" name="location" onChange={(e) => handleInput(e)} />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="">city</label>
        <input type="text" name="city" onChange={(e) => handleInput(e)} />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="">tower</label>
        <input type="text" name="tower" onChange={(e) => handleInput(e)} />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="">Date of brith</label>
        <DatePicker
        selected={info.birthDate}
        onChange={(date) => inputDate(date)}
        dateFormat="dd/MM/yyyy"
      />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="">gender</label>
        <select name="gender" onChange={(e) => handleInput(e)} >
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="other">other</option>

        </select>
      </div>
      <div className={styles.form_group}>
        <label htmlFor="">Email</label>
        <input type="email" name="email" onChange={(e) => handleInput(e)} />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="">Password</label>
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
