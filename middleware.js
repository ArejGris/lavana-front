
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
export async function middleware(req) {
  try {
    if (req.nextUrl?.pathname.startsWith("/admin")) {
      const url = req.nextUrl.clone();
     const admin= cookies().get("admin")
       
      if (admin) {
        return NextResponse.redirect(url);
      } else {
        url.pathname = "/loginasadmin/sign-in";
        return NextResponse.redirect(url);
      }
    }
  } catch (error) {
    console.log(error)
  }

}
