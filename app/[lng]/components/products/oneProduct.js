"use client";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "@/lib/features/orderSlice";
import { useEffect, useState } from "react";
import './oneproduct.css'
const OneProduct = ({ product }) => {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);
  const items = useSelector((state) => state.order.items);
  function Add() {
    const item = {
      price: product.price,
      productId: product.id,
      quentity: 1,
    };
    dispatch(increment(item));
   // setCounter((prev) => prev++);
  }
  function Reduce() {
    const item = {
      price: product.price,
      productId: product.id,
      quentity: 1,
    };
    dispatch(decrement(item));
    //if (counter >= 0) setCounter((prev) => prev--);
  }
  useEffect(() => {
    if (items.length > 0) {
      const oneItem = items.filter((item) => item.productId == product.id);
      if (oneItem.length > 0) {
        const t = oneItem[0].quentity;
        setCounter(t);
      }else {
        setCounter(0);
      }
    }else {
        setCounter(0);
      }
  }, [items]);
  return (
    <div className="one-product">
      <h1>{product.keyWord}</h1>
      <p>{product.description}</p>
       <ul>
        <li><i className="bi bi-star"></i>
          </li>
       </ul>
      <div className="actions">
        <button onClick={Add}>Add</button>
        <button onClick={Reduce}>Reduce</button>
        <button>{counter}</button>
      </div>
    </div>
  );
};

export default OneProduct;
