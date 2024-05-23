"use client";
import { useEffect, useState } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { CgSpinner } from "react-icons/cg";
import Link from "next/link";
export default function LogIn() {
  const [info, setInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [pending, setPending] = useState("");
  const [notification, setNotification] = useState("");

  const route = useRouter();

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
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.status == 201) {
            const form = e.target;
            form.reset();
            setError("")
            setPending(false);
            setNotification(data.message)
            route.push("/");
          } else {
            const form = e.target;
            form.reset();
            setPending(false);
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
      {error && <span className={styles.error}>somthing going wrong</span>}
      <div className={styles.actions}>
        <button>
          <span>log in</span>
          {pending && <CgSpinner size={20} class="animate-spin" />}
        </button>
        <Link href="/user/sign-in">sign up</Link>
      </div>
    </form>
  );
}
