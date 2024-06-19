"use client";
import { useEffect, useState } from "react";
import cookies from "react-cookies";
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const token = cookies.load("token2");
  async function fetchorders() {
    const res = await fetch("http://localhost:5000/user/get-orders", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
   
    const data = await res.json();
    if(data.orders){
    setOrders(data.orders);}
    console.log(data);
  }
  async function deleteregistedorder(id) {
    if (id !== null) {
      const res = await fetch("http://localhost:5000/user/delete-order/" + id, {
        method: "DELETE",
        headers:{'Authorization':'Bearer '+token},
        mode: "cors",
      });
      const data = await res.json();
      console.log(data.message);
    }else{
      console.log("no order found")
    }
  }
  useEffect(() => {
    fetchorders();
  }, []);
  if (orders.length == 0) {
    return <>loading...</>;
  } else {
    return (
      <div className="orders">
        {orders.map((order) => (
          <div className="card" key={order.id}>
            <h1>{order.date}</h1>
            <ul>
            {order.items.map((item) => (
              <ul key={item.title}>
                <li>{item.title}</li>
                <li>{item.description}</li>
                <li>{item.price}</li>
                <li>{item.quentity}</li>
              </ul>
            ))}
            </ul>
            <button onClick={()=>deleteregistedorder(order.id)}>delete order</button>
          </div>
        ))}
      </div>
    );
  }
};

export default OrderHistory;
