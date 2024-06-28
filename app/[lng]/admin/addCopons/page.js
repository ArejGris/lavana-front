'use client'
import dynamic from "next/dynamic";
import jsPDF from "jspdf";
//const JsPDF=dynamic(()=>import('jspdf'),{ssr:false})
import { useRef, useState } from "react";
import classes from './addcopon.module.css'
 const AddCopons = () => {
    
const discount=useRef()
const number=useRef()
const [copons,setCopons]=useState([])
   async function handleSubmit(e){
e.preventDefault()
const discountv=discount.current.value
const numberv=number.current.value
const res=await fetch('http://localhost:5000/admin/add-copon',{
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({number:numberv,discount:discountv}),
    mode:'cors'
})
const data=await res.json()
console.log(data.copons)
setCopons(data.copons)
   }
  let v=0
    const generatePdf=(mytext,doc)=>{
       
            
            
       
   /*     const pdf= doc.output('blob')
       const pdfUrl=URL.createObjectURL(pdf)
       return pdfUrl */
    }
   async function print(){
    if(!copons){
        alert("must create coponn first")
    }
    const doc=new jsPDF()
    for(let t=0;t<copons.length;t++){
          doc.text(copons[t].code,50,50)
          doc.addPage()
    }
    doc.save(`copon${v++}.pdf`) 
const form=document.getElementById("form")
const inputs=form.querySelectorAll("input")
inputs.forEach(input=>{
    input.value=null
})
    }
    return ( <div className={classes.coponpage}>
              <form onSubmit={handleSubmit} className={classes.form} id="form">
                <h1>add copon</h1>

        <div className={classes.formGroup}>
            <label htmlFor="">discount amount</label>
             <input type="text" ref={discount}/><span>%</span>
        </div>
        <div className={classes.formGroup}>
        <label htmlFor="">number of copons</label>
             <input type="text" ref={number}/>
        </div>
        <div className={classes.fromGroup}>
            
        <button className={classes.btn} type="submit">create</button>
        
       {copons.length>0&& <button onClick={print} type="button" className={classes.btn}  >print</button>}
            </div>
        
    </form>
  
    </div> );
}
 
export default AddCopons;