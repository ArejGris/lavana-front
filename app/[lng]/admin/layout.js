'use client'
import AdminNavbar from "@/app/[lng]/components/navbar/AdminNavbar";

import './layout.css'
import { Footer } from "../components/Footer";
import ThemeProvider from "../components/dashbord/utils/ThemeContext";
import { useState } from "react";
import Sidebar from "../components/dashbord/partials/Sidebar";
import Header from "../components/dashbord/partials/Header";
export default function Layout({children,params: {
  lng
}}){
  let dir
    if(lng==="ar"){
      dir="rtl"
    }else{
      dir="ltr"
    }
  const [sidebarOpen, setSidebarOpen] = useState(false);
 return(
    <div className="admin">
 <ThemeProvider>

           {/* Sidebar */}
           <div style={{direction:"ltr"}} className="t-90 flex h-screen  w-full">

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} lng={lng}/>
        <div dir={dir} className="flex flex-col w-full">
          
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {children}
        </div>
    </div>
    </ThemeProvider>
    </div>
 )
}