'use client'
import { useRef } from "react";
import { Footer } from "../../components/Footer/client";
import { useTranslation } from "@/app/i18n/client"; 
const AddCategory = ({ params: { lng } }) => {
  const { t } = useTranslation(lng, 'addCategory')
    const title=useRef(null)
    const title2=useRef(null)
    async function send(e){
        e.preventDefault()
        const titleCat=title.current.value
        const titleCat2=title2.current.value
        try {
            const res= await fetch('http://localhost:5000/admin/add-category',{
                method:"POST",
                headers:{
                 'Content-Type':'application/json'
                },
                body:JSON.stringify({title:titleCat,title2:titleCat2}),
                mode: "cors"
               })
              const data=await res.json()
               console.log(data)
            const form=e.target
            form.reset()
            
        } catch (error) {
            console.log(error)
        }
    
    }
    return ( <>
    <form onSubmit={send}>
        <div className="form-group">
            <label htmlFor="">  {t('title')}</label>
            <input type="text" ref={title} />
        </div>
        <div className="form-group">
            <label htmlFor="">  {t('title2')}</label>
            <input type="text" ref={title2} />
        </div>
        
        <button type="submit">{t('send')}</button>
    </form>
    <Footer  lng={lng} path="/admin/addCategory"/>
    </> );
}
 
export default AddCategory;