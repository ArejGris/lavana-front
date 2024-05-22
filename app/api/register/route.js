import { NextResponse } from "next/server";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";
export async function POST(req, res) {
  try {
    const { firstname,lastname,phoneNumber,location,city,tower,birthDate,gender, email, password } = await req.json();
    console.log( email, password);
    try {
      const res = await fetch("http://localhost:5000/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({firstname,lastname,phoneNumber,location,city,tower,birthDate,gender, email, password }),
        mode:"no-cors"
      });
      const data = await res.json();
      const token = data.token;
      if (token) {
        console.log(token);
        cookies().set("jwt", token);
        cookies().set("userId", data.user.id);
        return NextResponse.json({ message: "User registered", status: 201 });
      } else {
        return NextResponse.json({
          message: data.message,
          status: 404,
        });
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log("something went wrong while registering");

    return NextResponse.json({
      message: "Error occured while register",
      status: 500,
    });
  }
}
