'use client'
import Products from "@/components/products/products"
import { useEffect,useState } from "react"

const AllProducts = () => {
    const [products,setProducts]=useState([])
   async function getProducts(){
      const res=await  fetch('http://localhost:5000/admin/get-products',{mode:"cors"})
      const data=await res.json()
      if(data.products){
      setProducts(data.products)
     
    }}
  useEffect(()=>{
  getProducts()
  },[])
    return ( <>
           <Products products={products}/>
    </> );
}

export default AllProducts;