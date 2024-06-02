'use client'
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

     export default function LoginByGoogle(){
        const [providers, setProviders] = useState(null);
  
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
            
              <button type="button"  onClick={() => signIn('google',{ callbackUrl: '/en/user/otp'
            })}>
                Sign In by google
              </button>
            }
            </div>
          
        </>
          
      
        )
     }