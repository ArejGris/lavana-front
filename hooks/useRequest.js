'use client'
import cookies from "react-cookies";
export default function useRequest(){
 // const [token,setToken]=useCookies(['token2'])

 async function send(url,bodydata){
  const tokenv=cookies.load('token')
    const data= await sendReq(url,bodydata,tokenv)
        console.log(data);
        if(data.status===300){
        const datal=  await getRefreshToken()
      const data2= await sendReq(url,bodydata,datal.token)
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
    //setToken('token2',data.token,{maxAge:30})
    const expires = new Date();
    expires.setDate(expires.getDate() + 30);

 cookies.save('token',data.token,{expires,path:'/'})
    if(typeof window !=="undefined"){
        localStorage.setItem('refreshToken',data.refreshToken)
    }
    return data
  }
  
  async function sendReq(url ,data,token){
 
  console.log("heloo")
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify(data),
      mode: "cors",
    });
    
    const data2=await res.json()
    console.log(data2,"data2")
    return data2
  }  
  return {send}
}