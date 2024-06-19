'use client'
import { useEffect, useRef ,useState} from "react";
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import  {storage}  from "@/fiebaseStore";
import { useSession } from "next-auth/react";
import { useTranslation } from "@/app/i18n/client";
import { Footer } from "../../Footer/client";
import classes from './createproducte.module.css'
const AddProduct = ({lng,setIsModel,getData}) => {
    const {t}=useTranslation(lng,'addProduct')
    const title=useRef(null)
    const title2=useRef(null)
    const description=useRef(null)
    const description2=useRef(null)
    const size=useRef(null)
    const price=useRef(null)
    const [images,setImages]=useState([])
    const [category,setCategory]=useState([])
    const [selectedCategory,setSelectedCategory]=useState([])
    const [progress,setProgress]=useState(0)
    async function getCat(){
        const data= await fetch('http://localhost:5000/admin/get-categorys',{
            mode:'cors'
        })
        const res=await data.json()
       setCategory(res.categorys)
       console.log(res)
    }
    useEffect(()=>{
      
        getCat()
     
    },[])
    function changeSelect(value,checked){
        console.log(value,checked)
        if(checked){
        setSelectedCategory(prev=>[...prev,value])}
        else{
            setSelectedCategory(selectedCategory.filter(cat=>cat!==value))
        }
        
    }
    function handleChange(e){
        e.preventDefault()
        const inputfiles=document.getElementById('fileInput')
        const files=inputfiles.files
        console.log(files)
     Array.from(files).forEach((file,index)=>{
        if(file){
            const storageRef=ref(storage,`images/${file.name}`)  
            const upload=uploadBytesResumable(storageRef,file)
            upload.on("state_changed",(snapchat)=>{
              const progressAmount=Math.round((snapchat.bytesTransferred/snapchat.totalBytes)*100)
              setProgress(progressAmount)
             
            },(error)=>{
              console.error(error)
            },
          ()=>{
              getDownloadURL(upload.snapshot.ref).then((downloadURl)=>{
                console.log(downloadURl)
                const imagesdiv=document.getElementById("images")
                const snap=document.createElement('img')
                snap.setAttribute('src',downloadURl)
                snap.style.width='50px'
                snap.style.height='50px'
                imagesdiv.appendChild(snap) 
                 setImages(prev=>[...prev,downloadURl]) 
                 console.log(images)
              })
          })
          }
     })
     console.log(images)
    }
    
    async function send(e){
        e.preventDefault()
        const t=title.current.value
        const t2=title2.current.value
        const d=description.current.value
        const d2=description2.current.value
        const s=size.current.value
        const p=parseInt(price.current.value)
       console.log(t,d,s,p,images,selectedCategory)
        try {
            const res= await fetch('http://localhost:5000/admin/add-product',{
                method:"POST",
                headers:{
                 'Content-Type':'application/json'
                },
                body:JSON.stringify({categories:selectedCategory,keyWord:t,keyWord2:t2,price:p,size:s,description:d,description2:d2,images}),
                mode:"cors"
               })
              const data=await res.json()
               console.log(data) 
               if(data.product){  
                await getData()
                  const form=e.target
                setSelectedCategory([])
                setImages([])
                setProgress(0)
                form.reset()}
            
        } catch (error) {
            console.log(error)
        }

    }
    return ( <div className={classes.container}>
    <div className={classes.background} onClick={()=>setIsModel(false)}>
        </div>
    <form onSubmit={send} className={classes.AddProduct}>
        <h1>ADD Product</h1> <button onClick={()=>setIsModel(false)} className={classes.btnclose}><i className="bi bi-x-lg" style={{color:'white',fontWeight:'700'}}></i></button>
   
        <div className={classes.formGroup}>
            <label htmlFor="">{t('price')}</label>
            <input type="number" ref={price} />
        </div>
        <div className={classes.formGroup}>
            <label htmlFor="">{t('size')}</label>
            <select ref={size} >
                <option value="xx-small">xx-small</option>
                <option value="x-small">x-small</option>
                <option value="small">small</option>
                <option value="meduim">meduim</option>
                <option value="large">large</option>
                <option value="x-large">x-large</option>
                <option value="xx-large">xx-large</option>
            </select>
        </div>
       
        <div className={classes.formGroup}>
            <label htmlFor="">{t('title')}</label>
            <input type="text" ref={title} />
        </div>
        <div className={classes.formGroup}>
            <label htmlFor="">{t('title2')}</label>
            <input type="text" ref={title2} />
        </div>
        <div className={classes.formGroup}>
            <label htmlFor="">{t('description')}</label>
            <input type="text" ref={description} />
        </div>
        <div className={classes.formGroup}>
            <label htmlFor="">{t('description2')}</label>
            <input type="text" ref={description2} />
        </div>
        <div className={classes.formGroup} id="images">
            <label htmlFor="">{t('images')}</label>
            <input type="file" id="fileInput" name="files" accept="image/*"  onChange={(e)=>handleChange(e)} multiple />
            <progress value={progress} max="100"></progress>
        </div>
        <div className={classes.formGroup}>
            <label htmlFor="">{t('categories')}</label>
            <div type="text" >
              {category&&category.map((cat)=><>
              <label>{cat.title}</label>
              <input type="checkbox" value={cat.id} onChange={(e)=>changeSelect(cat.id,e.target.checked)}/>
              </>)}
            </div>
        </div>
        <div className={classes.actions}>
        <button type="submit" className={classes.btnsend}>{t('send')}</button>
        <button className={classes.btn2} onClick={()=>setIsModel(false)}>cancel</button>
        </div>
    </form>
    
    </div> );
}
 
export default AddProduct;