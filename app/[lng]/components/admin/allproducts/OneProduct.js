'use client'
import useStyle from "@/hooks/useStyle";
import classes from "./oneproduct.module.css";
import './oneproduct.css'
import DeleteProduct from "../deleteproduct/DeleteProductModel";
import { useEffect, useState } from "react";
import Link from "next/link";
const OneProduct = ({lng, product,grid,getData }) => {
  const [review,setReview]=useState(0)
  const [isDeleteModel,setIsDeleteModel]=useState(false)
    const {style}=useStyle()
   async function getreviews(){
      const res=await  fetch('http://localhost:5000/admin/get-review/'+product.id)
      const data=await res.json()

      setReview(data.max)

    }
   
   useEffect(()=>{
getreviews()
   },[])
  return (<>
 
 {isDeleteModel&&<DeleteProduct  id={product.id} setOpen={setIsDeleteModel} getData={getData}/>}
 {  grid? <li className={classes.li}>
      <div style={style.card}>
      <div className={classes.actions}>
                <Link href={`/${lng}/admin/updateProduct/${product.id}`}><i className="bi bi-pencil-square"></i></Link>
                <button ><i className="bi bi-bookmark-star"></i></button>
                <button onClick={()=>setIsDeleteModel(true)}><i className="bi bi-trash"></i></button>
                <button><i className="bi bi-download"></i></button>
                <button><i className="bi bi-upload"></i></button>
            </div>
            
        <div style={style.img}>
   
         <Link href={`/${lng}/admin/allProducts/${product.id}`}> <img src={product.images[0]} alt="" /></Link>
        
        </div>
        <div className={classes.cardbody}>
        <h1>{product.keyWord}</h1>
        <div className={classes.price}>
        <span>${product.price}</span><div className={classes.ribbon}>${product.price}</div>
          
            </div>
            <div className={classes.review}>
               {[...Array(review)].map((star)=><li key={star}><i className="bi bi-star-fill" ></i></li>
              )
              }
              {[...Array(5-review)].map((star)=><li key={star}><i className="bi bi-star"></i></li>
              )}
              </div>
          
             
        </div>
      </div>
    </li>:
      <li className={classes.li}>
      
      <div style={style.card2}>
            
        <div style={style.img2}>
   
          <img src={product.images[0]} style={{height:'100%'}} alt="" />
        
        </div>
        <div className={classes.cardbody}>
        <h1>{product.keyWord}</h1>
        <div className={classes.price}>
        <span>${product.price}</span><div className={classes.ribbon}>${product.price}</div>
          
            </div>
            <div className={classes.review}>
               {[...Array(review)].map((star)=><li key={star}><i className="bi bi-star-fill" ></i></li>
              )
              }
              {[...Array(5-review)].map((star)=><li key={star}><i className="bi bi-star"></i></li>
              )}
              </div>
            <div className={classes.actions}>
                <button><i className="bi bi-pencil-square"></i></button>
                <button><i className="bi bi-bookmark-star"></i></button>
                <button onClick={()=>setIsDeleteModel(true)}><i className="bi bi-trash"></i></button>
                <button><i className="bi bi-download"></i></button>
                <button><i className="bi bi-upload"></i></button>
            </div>
          
             
        </div>
      </div>
    </li>
   }
    </>
  );
};

export default OneProduct;
