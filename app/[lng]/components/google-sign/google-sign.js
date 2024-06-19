'use client'
import { signIn, signOut, useSession, getProviders, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import cookies from "react-cookies";

     export default function LoginByGoogle(){
      const route=useRouter()
        const [providers, setProviders] = useState(null);
        //const [tokencookie,setTokencookie]=useCookies(['token2'])
        async  function handlesign(){
          await signIn('google',{redirect:false})
         const session=await getSession()
         const token=session?.accessToken
         console.log(token,"token2")
         try {
          console.log(token,"token")
          const expires = new Date();
          expires.setDate(expires.getDate() + 30);
      
       cookies.save('token2',token,{expires,path:'/'})
         } catch (error) {
           console.log(error)
         }
       
        const res=await fetch('http://localhost:5000/user/refresh-token',{
           method:"POST",
           headers:{
             'Authorization':'Bearer '+token
           },
           mode:'cors'
         })
         
         console.log(tokencookie.token)
         const data=await res.json()
         console.log(data,"my refresh data")
         if(typeof window !=="undefined"){
           localStorage.setItem('refreshToken',data.token)
         }
         route.push('/en/user/otp')
          }
        useEffect(() => {
          const setUpProviders = async () => {
            const res = await getProviders();
            setProviders(res);
            if(providers) {Object.values(providers).map((provider) => {
              console.log(provider.name,provider.id)
            })}
          };
          setUpProviders();
         
        }, []);
      
        return(<>
        <div className="sign">
       {providers &&
            
              <button type="button"  onClick={handlesign}>
                Sign In by google
              </button>
            }
            </div>
          
        </>
          
      
        )
     }