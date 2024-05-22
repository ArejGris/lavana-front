import { NextResponse } from "next/server";
export async function POST(req){
    const {title}=await req.json()
const res=await fetch('http://localhost:5000/admin/add-category',{
    method:"POST",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({title})
})
const data=await res.json()
console.log(data.cat)
}