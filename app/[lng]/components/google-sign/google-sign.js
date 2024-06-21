"use client";
import {
  signIn,
  useSession,
} from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect} from "react";

export default function LoginByGoogle() {
  const { data: session } = useSession();
  const route = useRouter();
  async function handlesign() {
    try {
      if (session) {
        const token = session?.accessToken;

        const res = await fetch("http://localhost:5000/user/refresh-token", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          mode: "cors",
        });

        const data = await res.json();
        console.log(data, "my refresh data");
        if (typeof window !== "undefined") {
          localStorage.setItem("refreshToken", data.token);
        }
        route.push("/en/user/otp");
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    handlesign();
  }, [session]);
  return (
    <>
      <button onClick={() => signIn("google", { redirect: false })}>
        Sign In by google
      </button>
    </>
  );
}
