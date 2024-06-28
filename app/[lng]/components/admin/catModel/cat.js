'use client'
import Link from 'next/link';
import classes from './catstyle.module.css'
import CatModel from './catModel';
import { useEffect, useState } from 'react';
const Cat = ({cat,lng,getData}) => {
    const [show,setShow]=useState(false)
    const [productNum,setProductNum]=useState(false)
      async function fetchCat() {
        const res = await fetch("http://localhost:5000/admin/get-category/" + cat.id);
        const data = await res.json();
        console.log(data);
        setProductNum(data.products.length)
    
    }
    useEffect(()=>{
        fetchCat()
    },[])
    return (  <>
   {show&& <CatModel id={cat.id} setOpen={setShow} getData={getData}/>}
  
        <div key={cat.id} className={classes.cat}>
          <div className={classes.actions}>
            <Link href={`/${lng}/admin/updateProduct/${cat.id}`}>
              <i className="bi bi-pencil-square"></i>
            </Link>
            <button>
              <i className="bi bi-bookmark-star"></i>
            </button>
            <button onClick={()=>setShow(true)}>
              <i className="bi bi-trash"></i>
            </button>
            <button>
              <i className="bi bi-download"></i>
            </button>
            <button>
              <i className="bi bi-upload"></i>
            </button>
          </div>
          <div className={classes.img}>
            <img src="/images/product2.jpg" alt="" />
          </div>
          <h1>{cat.title} </h1>
          <p>({productNum})products</p>
        </div>
        </>
      );
}
 
export default Cat;
