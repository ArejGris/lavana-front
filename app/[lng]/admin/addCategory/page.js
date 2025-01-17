'use client'
import { useRef, useState } from "react";
import { Footer } from "../../components/Footer/client";
import { useTranslation } from "@/app/i18n/client"; 
import classes from './addCat.module.css'
import Model from "../../components/model/model";
const AddCategory = ({ params: { lng } }) => {
  const { t } = useTranslation(lng, 'addCategory')
    const [catdata,setCatdata]=useState({title:'',title2:''})
    const [image,setImage]=useState(null)
    const [note,setNote]=useState(null)
async function storeImg(){
    const formdata=new FormData()
    formdata.append('image',image)
    try {
        const res=await fetch('/api/upload',{
            method:"POST",
            body:formdata
        })
        const data=await res.json()
        if(!res.ok){
            throw data
        }
    } catch (error) {
       console.log(error) 
    }
}
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
                    setNote("successfully added the category")
                }else{
                    setNote("an error occured")
                }
            const form=e.target
            form.reset()
            
        } catch (error) {
            console.log(error)
            
            setNote("an error occured")
        }
    
    }
    return ( <>
    {note&&<Model note={note} setAlert={setNote}/>}
    <div className={classes.AddCategory}>
    <div className={classes.catsnap}>
        <div className={classes.img}>
            <img src="/images/product2.jpg" alt="" />
        </div>
        <h1>{catdata.title}</h1>

     </div>
     <div className={classes.add}>
     <form onSubmit={send} className={classes.form}>
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
        
        <button type="submit" className={classes.btn}>{t('send')}</button>
    </form>

     </div>
   
   
    </div>
  
    <Footer  lng={lng} path="/admin/addCategory"/>
    </> );
}
 
export default AddCategory;