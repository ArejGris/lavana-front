import AdminNavbar from "@/app/[lng]/components/navbar/AdminNavbar";

import './layout.css'
import { Footer } from "../components/Footer";
export default function Layout({children,params: {
  lng
}}){
 return(
    <div className="admin">

         
    <AdminNavbar lng={lng}/>
    {children}

    </div>
 )
}