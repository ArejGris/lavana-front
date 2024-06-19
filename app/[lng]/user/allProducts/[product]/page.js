'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSession } from 'next-auth/react';
import useRequest from '@/hooks/useRequest';
const Product = (context) => {
  const [productItem,setProductItem]=useState(null)
  const [images,setImages]=useState([])
  const [comments,setComments]=useState([])
  const [review,setReview]=useState(null)
  const route=useRouter()
  const comment=useRef()
    const { product } = context.params;
    const {data:session}=useSession()
    const {send}=useRequest()
    useEffect(()=>{
        getProduct()
        //getReviews()
    },[])
   async function getProduct(){
      const res=await fetch('http://localhost:5000/admin/get-product/'+product)
      const data=await res.json()
      setProductItem(data.product)
      setImages(data.product.images)
      console.log(data.product)
    }
    async function getReviews(){
      
     const res=await fetch('http://localhost:5000/admin/get-review/'+product)
     const data=await res.json()
     setReview(data.reviews)
    }
   
   async function getComment(){
   const res=await fetch('http://localhost:5000/user/get-comments/'+product)
   const data=await res.json()
   console.log(data.comments,"comments")
   setComments(data.comments)
   }
   useEffect(()=>{
    getComment()
   },[])
   async function sendComment(e){
   e.preventDefault()
   const comment1=comment.current.value
 const data=await send('http://localhost:5000/user/comment-product/'+product,{comment:comment1})
    console.log(data)
    const form=e.target
    form.reset()
   }
  async function addReview(e){
    const review=e.target.value
  const data=await send('http://localhost:5000/user/review-product/'+product,{val:review})
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
      {comments.length>0&&
        comments.map(comment=><>
        <p>{comment.customer}</p>
        <p>{comment.content}</p>


        </>)
      }
     <button>add comment</button>
     <select name="" id="" onChange={(e)=>addReview(e)}>
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>

       </select>

    </form>
    </> );
}
 
export default Product;