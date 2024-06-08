'use client'
import Link from 'next/link';
import './Adminnavbar.css'
import { useTranslation } from '@/app/i18n/client';
import { signOut, useSession } from 'next-auth/react';
const AdminNavbar = ({lng}) => {
    const {data:session}=useSession()
    const {t}= useTranslation(lng,'adminNavbar')
    function handlelogout(){
        signOut()
        fetch("/api/token",{
            method:'DELETE'
        })
    }
    return (  <div className='adminnavbar'>
             <ul>
              <li>{session?.user.name}</li>
        <li><Link href={`/${lng}/admin/addCategory`}>{t('add_category')}</Link></li>
        <li><Link href={`/${lng}/admin/addProduct`}>{t('add_product')}</Link></li>
        <li>{session?.role==="admin"?<button onClick={handlelogout}>logout</button>:<Link href={`/${lng}/loginasadmin/sign-in`}>{t('log_in')} </Link>}</li>
        <li><Link href={`/${lng}/user/allProducts`}>{t('all_products')} </Link></li>

    </ul>
    </div>);
}
export default AdminNavbar;