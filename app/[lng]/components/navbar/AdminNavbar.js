
import Link from 'next/link';
import './Adminnavbar.css'
import { useTranslation } from '@/app/i18n';
const AdminNavbar = async({lng}) => {
    
    const {t}=await useTranslation(lng,'adminNavbar')
    return (  <div className='adminnavbar'>
             <ul>
        <li><Link href={`/${lng}/admin/addCategory`}>{t('add_category')}</Link></li>
        <li><Link href={`/${lng}/admin/addProduct`}>{t('add_product')}</Link></li>
        <li><Link href={`/${lng}/loginasadmin/sign-in`}>{t('log_in')} </Link></li>
    </ul>
    </div>);
}
export default AdminNavbar;