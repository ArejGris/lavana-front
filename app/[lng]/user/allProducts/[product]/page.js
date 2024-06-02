'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSession } from 'next-auth/react';
const Product = (context) => {
  const [productItem,setProductItem]=useState(null)
  const [images,setImages]=useState([])
  const [comments,setComments]=useState([])
  const [userId,setUserId]=useState(null)
  const [review,setReview]=useState(null)
  const route=useRouter()
  const comment=useRef()
    const { product } = context.params;
    const {data:session}=useSession()
    useEffect(()=>{
        getProduct()
        getReviews()
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
    useEffect(()=>{
      if(session?.user.role==="admin"){
           setUserId(session?.user.id)
      }
      fetch('http://localhost:3000/api/userId').then(res=>res.json()).then(data=>{
       console.log(data)
       if(data.userId){
       setUserId(data.userId)
       console.log(data.userId,"userid")

   }
      })
   },[]) 
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
   if(!userId){
    route.push('/user/login')
  }
    const comment1=comment.current.value
   console.log(comment1,userId)
    if(session?.user.role==="admin"){
      const res=await fetch('http://localhost:5000/admin/comment-product/'+product,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          productId:parseInt(product),
          comment:comment1})
      })
      
    const data=await res.json()
    console.log(data)
    const form=e.target
    form.reset()
    }
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
    const form=e.target
    form.reset()
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

    </form>
    </> );
}
 
export default Product;