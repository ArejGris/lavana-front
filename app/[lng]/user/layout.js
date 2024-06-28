'use client'
import Navbar from "../components/navbar/Navbar";

import './layout.css'
import StoreProvider from "./StoreProvider";
export default function Layout({ children,params:{lng}} ) {
  let dir
    if(lng==="ar"){
      dir="rtl"
    }else{
      dir="ltr"
    }
    return (
        <div className="user">
              <Navbar lng={lng}/>
            <StoreProvider>
              <div dir={dir}>
                
        {children}

              </div>
        </StoreProvider>
        </div>
    );
  }