'use client'
import Navbar from "../components/navbar/Navbar";

import './layout.css'
import StoreProvider from "./StoreProvider";
export default function Layout({ children,params:{lng}} ) {
    return (
        <div className="user">
              <Navbar lng={lng}/>
            <StoreProvider>
        {children}
        </StoreProvider>
        </div>
    );
  }