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
      console.log(data.product)
    }
   
    return ( <>{productItem&&<>
    <h1>{productItem.keyWord}</h1>
    <p>{productItem.description}</p>
    <p>{productItem.price}</p>
    <p>{productItem.size}</p></>}
            <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
   {images&&images.map(img=> <SwiperSlide><img src={img} alt="img" /></SwiperSlide>) }
      ...
    </Swiper>  
    </> );
}
 
export default Product;