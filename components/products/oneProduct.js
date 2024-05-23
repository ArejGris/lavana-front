'use client'
import { useDispatch,useSelector } from "react-redux";
import { increment,decrement } from '@/lib/features/orderSlice';
import { useState } from 'react';
const OneProduct = ({product}) => {
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
              
    <div className="actions">
        <button onClick={Add}>Add</button>
        <button onClick={Reduce}>Reduce</button>
    </div>
    </div> );
}
 
export default OneProduct;