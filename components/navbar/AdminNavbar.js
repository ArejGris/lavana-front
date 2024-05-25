
import Link from 'next/link';
import './Adminnavbar.css'
const AdminNavbar = () => {
    return (  <div className='adminnavbar'>
             <ul>
        <li><Link href="/admin/addCategory">add Categorys</Link></li>
        <li><Link href="/admin/addProduct">add Products</Link></li>
        <li><Link href="/admin/sign-in">log in </Link></li>
    </ul>
    </div>);
}
export default AdminNavbar;