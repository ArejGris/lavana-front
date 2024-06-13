"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteOrder,
  increment,
  decrement,
  remove,
  setOrderId,
} from "@/lib/features/orderSlice";
import useRequest from "@/hooks/useRequest";
const MakeOrder = () => {
  const route = useRouter();
  const [productorder, setProductorder] = useState(null);
  const [issend, setIssend] = useState(false);
  const { send } = useRequest();
  const { data: session } = useSession();
  const items = useSelector((state) => state.order.items);
  const id = useSelector((state) => state.order.orderId);
  const dispatch = useDispatch();
  async function itemsfetch() {
    if (items.length == 0) {
      setProductorder([]);
      return;
    }
    const itemsProductIds = items.map((item) => item.productId);

    const res = await fetch("http://localhost:5000/admin/get-order-products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: itemsProductIds }),
    });
    const data = await res.json();
    if (data.products) {
      const products = data.products;
      if (products.length > 0) {
        const viewedProducts = products.map((pro) => {
          const i = items.filter((item) => item.productId === pro.id);
          let q = 0,
            p = 0;
          if (i.length > 0) {
            q = i[0].quentity;
            p = i[0].price;
          }
          return {
            id: pro.id,
            title: pro.keyWord,
            size: pro.size,
            description: pro.description,
            quentity: q,
            price: p,
          };
        });
        console.log(viewedProducts, "viewedProducts");
        setProductorder(viewedProducts);
      }
    }
    return [];
  }
  useEffect(() => {
    itemsfetch();
    console.log(items, "items");
  }, [items]);
  async function sendOrder() {
    console.log(items);
    const order = {
      orderItems: items,
    };

    const data = await send("http://localhost:5000/user/make-order", order);
    if (data.order) {
      dispatch(setOrderId(data.order.id));
      setIssend(true);
      deleteO()
      setIssend(false);
    }
   
  }
  function deleteO() {
    dispatch(deleteOrder());
    console.log("items", items);
  }
  function add(id) {
    const item = items.filter((item) => item.productId === id);
    dispatch(increment(item[0]));
    console.log(items);
  }
  function reduce(id) {
    const item = items.filter((item) => item.productId === id);
    dispatch(decrement(item[0]));
  }
  function remove2(id) {
    const item = items.filter((item) => item.productId === id);
    dispatch(remove(item[0]));
  }

  return (
    <>
      {productorder &&
        productorder.map((item) => (
          <div key={item.title}>
            <h1>{item.title}</h1>
            <p>{item.quentity}</p>
            <p>{item.description}</p>
            <p>{item.price}</p>
            <p>{item.size}</p>
            <button onClick={() => add(item.id)}>add</button>
            <button onClick={() => reduce(item.id)}>reduce</button>
            <button onClick={() => remove2(item.id)}>remove</button>
          </div>
        ))}
      
        <div>
          {items.length > 0 ? (
            <>
              <button onClick={sendOrder}>send order</button>
              <button onClick={deleteO}>delete order</button>
            </>
          ) : (
            <button
              disabled
              style={{ color: "gray", backgroundColor: "white" }}
            >
              send order
            </button>
          )}
        </div>
     
    </>
  );
};

export default MakeOrder;
