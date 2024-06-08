import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function DELETE(){
    cookies().delete('token')
   return NextResponse.json({status:200})
}