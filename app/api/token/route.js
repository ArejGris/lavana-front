import { cookies } from "next/headers"
import { NextResponse } from "next/server"
export async function GET(req){
const token=cookies().get("token")
const res=await fetch("http://localhost:5000/user/token",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({token:token.value}),
    mode:"cors"
})
const data=await res.json()
if(data){
return NextResponse.json(
  {
  token: token.value
  })}
  else{
    return NextResponse.json(
        {
        token: token.value
        })
  }



}