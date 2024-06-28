'use client'
import { useRef, useState } from "react";
import { useTranslation } from "@/app/i18n/client"; 
import classes from './addcat.module.css'
const AddCategoryModel = ({lng,setAddcat,getData}) => {
  const { t } = useTranslation(lng, 'addCategory')
    const [catdata,setCatdata]=useState({title:'',title2:''})
    const [image,setImage]=useState(null)
    const [note,setNote]=useState(null)

function changeData(e){
setCatdata((prev)=>({...prev,[e.target.name]:e.target.value}))
}
    async function send(e){
        e.preventDefault()
        try {
            const res= await fetch('http://localhost:5000/admin/add-category',{
                method:"POST",
                headers:{
                 'Content-Type':'application/json'
                },
                body:JSON.stringify(catdata),
                mode: "cors"
               })
              const data=await res.json()
               console.log(data)
                if(data.status===200){
                    await getData()
                    setNote("successfully added the category")
                }else{
                    setNote("an error occured")
                }
            const form=e.target
            form.reset()
            setAddcat(false)
            
        } catch (error) {
            console.log(error)
            
            setNote("an error occured")
        }
    
    }
    return ( <>
    <div className={classes.background}></div>
     <form onSubmit={send} className={classes.form}>
        {note&&<div className={classes.note}>{note}</div>}
        <div className={classes.formGroup}>
            <label htmlFor="">  {t('title')}</label>
            <input type="text" name="title"  onChange={(e)=>changeData(e)} />
        </div>
        <div className={classes.formGroup}>
            <label htmlFor="">  {t('title2')}</label>
            <input type="text" name="title2" onChange={(e)=>changeData(e)} />
        </div>
        <div className={classes.formGroup}>
            <label htmlFor="">  {t('image')}</label>
            <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
        </div>
        <div className={classes.actions}>
            
        <button type="submit" className={classes.btn}>{t('btn')}</button>
        
        <button type="btn" className={classes.btn2} onClick={()=>setAddcat(false)}>{t('cancel')}</button>

        </div>
    </form>

  
    </> );
}
 
export default AddCategoryModel;