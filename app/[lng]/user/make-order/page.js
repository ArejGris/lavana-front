"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const MakeOrder = () => {
  const route = useRouter();
  const [userId, setUserId] = useState();
  const [productorder, setProductorder] = useState([]);
  const [isPaid, setIsPaid] = useState(false);

  const { data: session } = useSession();
  const items = useSelector((state) => state.order.items);
  async function getToken() {
    const res = await fetch("/api/token");
    const data = await res.json();
    console.log(data, "data");
  }
  function getUserId() {
    fetch("/api/userId")
      .then((res) => res.json())
      .then((data) => {
        setUserId(data.userId);
      });
  }
  async function itemsfetch() {
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
          let q=0,p=0
          if(i.length>0){
            q= i[0].quentity
            p=i[0].price
          }
          return {
            title: pro.keyWord,
            size: pro.size,
            description: pro.description,
            quentity: q,
            price:  p,
          };
        });
        console.log(viewedProducts, "viewedProducts");
        return viewedProducts;
      }
    }
    return [];
  }
  useEffect(() => {
    getUserId();
    const products = itemsfetch();
    setProductorder(products);
  }, []);
  async function sendOrder() {
    console.log(items);
    const order = {
      userId,
      orderItems: items,
    };
    console.log(order, session?.accessToken);
    const res = await fetch("http://localhost:5000/user/make-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session?.accessToken,
      },
      body: JSON.stringify(order),
      mode: "cors",
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <>
      {productorder.length > 0 &&
        productorder.map((item) => (
          <div key={item.title}>
            <h1>{item.title}</h1>
            <p>{item.quentity}</p>
            <p>{item.description}</p>
            <p>{item.price}</p>
            <p>{item.size}</p>
          </div>
        ))}
      <button onClick={sendOrder}>send order</button>
    </>
  );
};

export default MakeOrder;
