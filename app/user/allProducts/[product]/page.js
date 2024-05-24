'use client'
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
const Product = (context) => {
  const [productItem,setProductItem]=useState(null)
  const [images,setImages]=useState([])
    const { product } = context.params;
    useEffect(()=>{
        getProduct()
    },[])
   async function getProduct(){
      const res=await fetch('http://localhost:5000/admin/get-product/'+product)
      const data=await res.json()
      setProductItem(data.product)
      localStorage.setItem("images",data.product.images)
    }
    function load(){
      const imgs=localStorage.get("images")
      setImages(imgs)
    }
    return ( <>
            <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
   {images&&images.map(img=> <SwiperSlide><img src={img} alt="img" /></SwiperSlide>) }
      ...
    </Swiper>  
    <button onClick={load}>load images</button>
    </> );
}
 
export default Product;