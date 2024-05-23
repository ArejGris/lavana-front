'use client'
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
const Product = (context) => {
    const { product } = context.params;
    useEffect(()=>{
        getProduct()
    },[])
    function getProduct(){
     fetch('http://localhost:5000/admin/get-product/'+product)
    }
    return ( <>
            <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
   { product.images.map(img=> <SwiperSlide><img src={img} alt="" /></SwiperSlide>) }
      ...
    </Swiper>  
    
    </> );
}
 
export default Product;