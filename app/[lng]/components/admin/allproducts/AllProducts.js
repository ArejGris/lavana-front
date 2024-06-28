'use client'
import { useState,useEffect } from "react";
import OneProduct from "./OneProduct";
import classes from "./allproducts.module.css";
import useStyle from "@/hooks/useStyle";
import AddProduct from "../addproduct/AddProductModule";
import DeleteProduct from "../deleteproduct/DeleteProductModel";
import Link from "next/link";
const AllProducts = ({ lng}) => {
   const [grid,setGrid] =useState(true)
   const [isModel,setIsModel]=useState(false)
   const [count,setCount]=useState(0)
   const [products,setProducts]=useState([])
   async  function getProduct(){
     const res=await fetch('http://localhost:5000/admin/get-products',{mode:"cors"})
     
     const data= await res.json()
     console.log(data,"data")
     setProducts(data.products)


 }
     useEffect(()=>{
         getProduct()
         console.log(count)
     },[count])
   function filter(e){
    const name=e.target.value
   const f= products.filter(product=>{
        if(product.keyWord.startsWith(name)){
            return true
        }
        return false

    })
    setProducts(f)

   }
  
   const style=useStyle()
   const model=()=>{
    return(
<AddProduct lng={lng} setIsModel={setIsModel} getData={getProduct}/>
    )
   }
  return (
    <div className={classes.page}>
      
        {isModel&&model()}
      <div className={classes.list}>
        <div className={classes.actions}>
        <button onClick={()=>setGrid(false)}>
          <i className="bi bi-list-task"></i>
        </button>
        <button onClick={()=>setGrid(true)}>
          <i className="bi bi-grid"></i>
        </button>
         <button onClick={()=>setIsModel(true)}><i className="bi bi-plus"></i></button>
        </div>
        <form action="" className={classes.form}><input type="text" placeholder="search..." onChange={(e)=>filter(e)} /> <i className="bi bi-search"></i></form>
       
      </div>
      <ul style={grid?style.style.grid:style.style.flex}>
        {products.length>0&&products.map((product) => (
         <OneProduct product={product} grid={grid}  getData={getProduct} lng={lng}/>
        ))}
      </ul>
    </div>
  );
};

export default AllProducts;
