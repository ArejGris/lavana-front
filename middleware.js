
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
export async function middleware(req) {
  if (req.nextUrl?.pathname.startsWith("/ar/loginasadmin")||req.nextUrl?.pathname.startsWith("/en/loginasadmin")) {
    const url = req.nextUrl.clone();
const data=await verfiytoken()
    if (data.status===200) {
      url.pathname="/en/admin"
     return NextResponse.redirect(url)
    }else{
      return NextResponse.next()
    }
  }
    if (req.nextUrl?.pathname.startsWith("/ar/admin")||req.nextUrl?.pathname.startsWith("/en/admin")) {
      const url = req.nextUrl.clone();
     const data=await verfiytoken()
   console.log(data) 
      if (data.status===200) {
        return NextResponse.next();
      } else {
        url.pathname = "/en/loginasadmin/sign-in";
        return NextResponse.redirect(url);
      }
    }

}

async function verfiytoken(){
  const token= cookies().get("token")
 //  why you havn't verifty token?
 if(token){
const res=await fetch("http:localhost:5000/admin/token",{
 method:"POST",
 headers:{
   'Authorization':'Bearer '+token.value
 },
 mode:"cors"
})
const data=await res.json()
return data
}else{
  return {status:403}
}
}