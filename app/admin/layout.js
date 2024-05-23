import AdminNavbar from "@/components/navbar/AdminNavbar";
import './layout.css'
export default function Layout({children}){
 return(
    <div className="admin">
    <AdminNavbar/>
    {children}
    </div>
 )
}