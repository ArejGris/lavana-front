'use client'
import { PDFDocument,StandardFonts,rgb } from "pdf-lib";
import { useRef, useState } from "react";
 const AddCopons = () => {
    
const discount=useRef()
const number=useRef()
const [copons,setCopons]=useState([])
const [pdfs,setPdfs]=useState([])
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
    const generatePdf=async(mytext)=>{
    const pdfDoc=await PDFDocument.create();
    
    const fontt=await pdfDoc.embedFont(StandardFonts.TimesRoman)
    const page=pdfDoc.addPage()
    page.drawText(mytext,{x:50,y:50,size:40,font:fontt,color:rgb(0,0,0)})
    const pdf3=await pdfDoc.save()
    const blob=new Blob(pdf3,{type:'application/pdf'})
    const url=URL.createObjectURL(blob)
    const link=document.createElement('a')
    link.download=`${mytext}.pdf`
    link.href=url
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link) 
    setPdfs(prev=>[...prev,pdf3])
    }
   async function print(){
    if(!copons){
        alert("must create coponn first")
    }
  copons.forEach(copon=>{
  
  generatePdf(copon.code)

  })
  console.log(pdfs,"pdfs")
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
    <div id="pdf">
        <h1>print all copons</h1>
        {
            pdfs.length>0&&pdfs.map(url=>{
                <><a href={url}>pdf</a></>
            })
        }
        <button onClick={print}>print</button>
    </div>
    </div> );
}
 
export default AddCopons;