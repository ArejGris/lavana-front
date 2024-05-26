'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const MakeOrder = () => {
    const route=useRouter()
    const [userId,setUserId]=useState()
    const [isPaid,setIsPaid]=useState(false)
  const items=useSelector((state)=>state.order.items)
    useEffect(()=>{
       fetch('http://localhost:3000/api/userId').then(res=>res.json()).then(data=>{
        console.log(data)
        if(data.userId){
        setUserId(data.userId)
        console.log(data.userId,"userid")

    }
        else{
            
            route.push('/user/log-in')
        }
       })
    },[]) 
   async function sendOrder(){
    console.log(items)
        const order={
            userId,orderItems:items
        }
        console.log(order)
       const res=await fetch('http://localhost:5000/user/make-order',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(order),
            mode:"cors"
        })
        const data=await res.json()
        console.log(data)
    }
   
    return ( 
    <>
    {
       items&& items.map(item=>(<>{item.product}{item.quentity}{item.price}</>))
    }
    <button onClick={sendOrder}>send order</button>
    </> );
}
 
export default MakeOrder;