'use client'
import { useEffect, useState } from "react";
import './style.css'
import Link from "next/link";
const AllCategory = () => {
   const [cats,setCats] =useState([])
  async function getCategory(){
       const res=await fetch('http://localhost:5000/admin/get-categorys',{mode:"cors"})
      
       console.log(res)
       const data=await res.json()
       setCats(data.categorys)
    }
    useEffect(()=>{
      getCategory()
    },[])
    return ( <div className="cats">{
        cats&&cats.map(cat=>(
            <>
            <div className="cat">{cat.title}
            </div>
            <Link href={`/user/allCategorys/${cat.id}`}>visit page</Link>
            </>     
        ))
    }
    </div> );
}
export default AllCategory;