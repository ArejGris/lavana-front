'use client'
import { useCookies } from "react-cookie";
export default function useRequest(){
  const [token,setToken]=useCookies(['token'])

 async function send(url,bodydata){
    const data= await sendReq(url,bodydata)
        console.log(data);
        if(data.status===300){
          await getRefreshToken()
      const data2= await sendReq(url,bodydata)
        return data2
        }else{
          console.log(data)
          return data
        }
      
  }
async function getRefreshToken(){
      let refreshToken
    if(typeof window !=="undefined"){
       refreshToken=localStorage.getItem('refreshToken')
    }
   const res=await fetch('http://localhost:5000/user/token',{
     method:"POST",
     headers:{
       'Content-Type':'application/json',
     'Authorization':'Bearer '+refreshToken
     },
     body:JSON.stringify({token:refreshToken}),
     mode:"cors"
     
    })
    console.log(res,"res")
    const data=await res.json()
    console.log(data,"from refresh token....")
    setToken('token',data.token,{maxAge:30})
    if(typeof window !=="undefined"){
        localStorage.setItem('refreshToken',data.refreshToken)
    }
  }
  
  async function sendReq(url ,data){
    const tokenv=token.token
  
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + tokenv,
      },
      body: JSON.stringify(data),
      mode: "cors",
    });
    
    const data2=await res.json()
    return data2
  }  
  return {send}
}