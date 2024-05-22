'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch,useSelector } from "react-redux";
import { increment,decrement } from '@/lib/features/orderSlice';
import { useState } from 'react';
const OneProduct = ({product}) => {
    const [counter,setCounter]=useState(0)
    const dispatch=useDispatch()
    function Add(){
        const item={
            price:product.price,
            productId:product.id,
            quentity:1
        }
        dispatch(increment(item))
    }
    function Reduce(){
        const item={
            price:product.price,
            productId:product.id,
            quentity:1
        }
         dispatch(decrement(item))
    }
    return ( <div className="one-product">
              <h1>{product.keyWord}</h1>
              <p>{product.description}</p>
              <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide><img src={product.image1} alt="" /></SwiperSlide>
      <SwiperSlide><img src={product.image2} alt="" /></SwiperSlide>
      <SwiperSlide><img src={product.image3} alt="" /></SwiperSlide>
      <SwiperSlide><img src={product.image4} alt="" /></SwiperSlide>
      <SwiperSlide><img src={product.image5} alt="" /></SwiperSlide>
      ...
    </Swiper>
    <div className="actions">
        <button onClick={Add}>Add</button>
        <button onClick={Reduce}>Reduce</button>
    </div>
    </div> );
}
 
export default OneProduct;