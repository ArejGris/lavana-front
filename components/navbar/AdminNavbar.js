
import Link from 'next/link';
import './Adminnavbar.css'
const AdminNavbar = () => {
    return (  <div className='adminnavbar'>
             <ul>
        <li><Link href="/admin/allCategorys">add Categorys</Link></li>
        <li><Link href="/admin/allProducts">add Products</Link></li>
        <li><Link href="/admin/log-in">log in </Link></li>
    </ul>
    </div>);
}
export default AdminNavbar;