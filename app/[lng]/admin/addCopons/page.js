'use client'
import dynamic from "next/dynamic";
import jsPDF from "jspdf";
//const JsPDF=dynamic(()=>import('jspdf'),{ssr:false})
import { useRef, useState } from "react";
 const AddCopons = () => {
    
const discount=useRef()
const number=useRef()
const [copons,setCopons]=useState([])
const [urls,setUrls]=useState([])
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
                   
          doc.addPage()
          doc.text(copons[t].code,50,50)
                
            
    }
    doc.save(`copon${v++}.pdf`) 
    }
    return ( <div>
              <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="">discount amount</label>
             <input type="text" ref={discount}/>
        </div>
        <div className="form-group">
        <label htmlFor="">number of copons</label>
             <input type="text" ref={number}/>
        </div>
        <button>send</button>
    </form>
    <div>
        <h1>print all copons</h1>
        <h4>{urls.length>0&&urls.forEach(url=><>
        <a href={url.url} target="_blank">url.code</a>
        </>)}</h4>
        <button onClick={print}>print</button>
    </div>
    </div> );
}
 
export default AddCopons;