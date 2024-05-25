
import { useSession } from 'next-auth/react';
import { NextResponse } from 'next/server';
export async function middleware(req) {
    if (req.nextUrl?.pathname.startsWith("/admin")) {
        const url = req.nextUrl.clone();
        const { data: session } = useSession();
         const isAuth=session.user.role==="admin"
        if (isAuth) {
          return NextResponse.next();
        } else {
          url.pathname = "/loginasadmin/sign-in";
          return NextResponse.redirect(url);
        }
      }
  return {
    props: {},
  };
}
