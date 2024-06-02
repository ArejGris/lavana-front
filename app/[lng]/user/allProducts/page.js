'use client'
import Products from "@/app/[lng]/components/products/products"
import { useEffect,useState } from "react"
import { useRouter } from "next/navigation"
const AllProducts = ({params:{lng}}) => {
    const [products,setProducts]=useState([])
    const route=useRouter()
   async function getProducts(){
      const res=await  fetch('http://localhost:5000/admin/get-products',{mode:"cors"})
      const data=await res.json()
      if(data.products){
      setProducts(data.products)
    }else{
    route.refresh()
    }
  }
  useEffect(()=>{
  getProducts()
  },[])
    return ( <>
           <Products products={products} lng={lng}/>
    </> );
}

export default AllProducts;