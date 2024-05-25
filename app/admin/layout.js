import AdminNavbar from "@/components/navbar/AdminNavbar";
import Provider from "@/utils/Provider";
import './layout.css'
export default function Layout({children}){
 return(
    <div className="admin">
      <Provider>
         
    <AdminNavbar/>
    {children}
    
    </Provider>
    </div>
 )
}