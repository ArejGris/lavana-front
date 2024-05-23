import Link from 'next/link';

import './navbar.css'
const Navbar = () => {
    return ( <div className="navbar">
    <ul>
        <li><Link href="/user/allCategorys">All Categorys</Link></li>
        <li><Link href="/user/allProducts">All Products</Link></li>
        <li><Link href="/user/make-order">make order</Link></li>
        <li><Link href="/user/log-in">log in </Link></li>
    </ul>
    </div> );
}
 
export default Navbar;