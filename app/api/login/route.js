import { NextResponse } from "next/server";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";
export async function POST(req, res) {
  const { email, password } = await req.json();
  console.log(email, password);
  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      mode: "cors",
    });
    const data = await res.json();
    const token = data.token;
    console.log(data);

    if (token) {
     cookies().set("jwt",token)
     cookies().set("userId",data.user.id)
      return NextResponse.json(
        { message: "User logged in successfully" ,status:201}
      );
    } else {
      return NextResponse.json({ message: data.message ,status: 404 });
    }
  } catch (error) {
    console.log("something went wrong while log in");

    return NextResponse.json(
      { message: "Error occured while log in" ,status: 500}
    );
  }
}
