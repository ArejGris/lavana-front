'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

const Product = (context) => {
  const [productItem,setProductItem]=useState(null)
  const [images,setImages]=useState([])
  const [userId,setUserId]=useState(null)
  const route=useRouter()
  const comment=useRef()
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
    useEffect(()=>{
      fetch('http://localhost:3000/api/userId').then(res=>res.json()).then(data=>{
       console.log(data)
       if(data.userId){
       setUserId(data.userId)
       console.log(data.userId,"userid")

   }
      })
   },[]) 
   async function sendComment(e){
   e.preventDefault()
   if(!userId){
    route.push('/user/login')
  }
    const comment1=comment.current.value
   console.log(comment1,userId)
    
    const res=await fetch('http://localhost:5000/user/comment-product/'+product,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        productId:parseInt(product),
        userId,
        comment:comment1})
    })
    const data=await res.json()
    console.log(data)
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
    <form onSubmit={sendComment}>
      <div className="form-group">
        <label htmlFor="">comment</label>
        <input type="text" ref={comment}/>
      </div>
     <button>add comment</button>

    </form>
    </> );
}
 
export default Product;