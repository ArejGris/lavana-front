'use client'
import Link from 'next/link';
import { useTranslation } from '@/app/i18n/client';
import './navbar.css'
import { useSession ,signOut} from 'next-auth/react';
const Navbar = ({lng}) => {
  const {data:session}=useSession()
    const {t}=useTranslation(lng,'navbar')
    function handlesignout(){
      signOut()
      fetch('/api/token',{
        method:'DELETE'
      })
    }
    return ( <div className="navbar">
    <ul>
      <li>{session?.user.name}</li>
      <li><Link href={`/${lng}/user/allCategorys`}>{t("all_Categories")}</Link></li>
      <li><Link href={`/${lng}/user/allProducts`}>{t("all_products")}</Link></li>
      <li>{session?.accessToken ? <button onClick={handlesignout}>logout</button>:<Link href={`/${lng}/user/log-in`}>{t("log_in")}</Link>}</li>
      <li><Link href={`/${lng}/user/make-order`}>{t("make_order")}</Link></li>
      <li><Link href={`/${lng}/user/sign-up`}>{t("sign_up")}</Link></li>
    </ul>
    </div> );
}
 
export default Navbar;