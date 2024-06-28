"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './makeorder.css'
import {
  deleteOrder,
  increment,
  decrement,
  remove,
} from "@/lib/features/orderSlice";
import useRequest from "@/hooks/useRequest";
import { GetCountries,GetCity,GetState} from "react-country-state-city";
import 'react-country-state-city/dist/react-country-state-city.css'
const MakeOrder = () => {
  const route = useRouter();
  const [productorder, setProductorder] = useState(null);
  const [copon,setCopon]=useState(null)
  const [issend, setIssend] = useState(false);
  const [shipment,setShipment]=useState(false)
  const [order,setOrder]=useState(null)
  const [shipmentorder,setShipmentorder]=useState(null)
  const [countryId,setCountryId]=useState(0)
  const [stateId,setStateId]=useState(0)
  const [cityId,setCityId]=useState(0)
  const [countryList,setCountryList]=useState([])
  const [stateList,setStateList]=useState([])
  const [cityList,setCityList]=useState([])
  const { send } = useRequest();
  const { data: session } = useSession();
  const items = useSelector((state) => state.order.items);
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
  useEffect(()=>{
    GetCountries().then((result)=>{
      setCountryList(result)
    })
   },[])
 
  function handleCountryChange(e){
const country=countryList[e.target.value]
setCountryId(country.id)
setShipmentorder(prev=>({...prev,country:country.name}))
GetState(country.id).then((result)=>{
  setStateList(result)
})
  }
  function handleStateChange(e){
    const state=stateList[e.target.value]
    setStateId(state.id)
    setShipmentorder(prev=>({...prev,state:state.name}))
    GetCity(countryId,state.id).then((result)=>{
      setCityList(result)
    })
      }
 function handleCityChange(e){
    const city=cityList[e.target.value]
    setCityId(city.id)
    setShipmentorder(prev=>({...prev,city:city.name}))
      }   
  function handlechangeInput(e){
    setShipmentorder((prev)=>({...prev,[e.target.name]:e.target.value}))
      }
 async function sendShipment(e){
e.preventDefault()
const res=await fetch('http://localhost:5000/user/shipment-data',{
  method:"POST",
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({...shipmentorder,order}),
  mode:"cors"
})
const data=await res.json()
if(data.status===200){
deleteO()
}
 }

  useEffect(() => {
    itemsfetch();
  }, [items]);
  async function sendOrder() {
    console.log(items);
    const order = {
      orderItems: items,
      copon:copon
    };

    const data = await send("http://localhost:5000/user/make-order", order);
    if(data.status===200){
      console.log("order shipment")
      setOrder(data.order)
      setShipment(true)
    }
    
   
  }
  function deleteO() {
    dispatch(deleteOrder());
  }
  function add(id) {
    const item = items.filter((item) => item.productId === id);
    dispatch(increment(item[0]));

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
    {shipment&&<div className="shipment">
      <form onSubmit={sendShipment}>
        
      <h1>consignee</h1>
      <div className="form-group">
        <label htmlFor="">name</label>
        <input type="text" name="name" onChange={(e)=>handlechangeInput(e)}/>
      </div>
      <div className="form-group">
        <label htmlFor="">mobileNumber</label>
        <input type="text" name="mobileNumber" onChange={(e)=>handlechangeInput(e)}/>
      </div>
      <div className="form-group">
        <label htmlFor="">phoneNumber</label>
        <input type="text" name="phoneNumber" onChange={(e)=>handlechangeInput(e)}/>
      </div>
      <div className="form-group">
        <label htmlFor="">email</label>
        <input type="text" name="emailAddress" onChange={(e)=>handlechangeInput(e)}/>
      </div>
      <div className="form-group">
        <label htmlFor="">country Name</label>
        <select onChange={handleCountryChange} value={countryId}>
          {
            countryList.length>0&&countryList.map((item,index)=>(
              <option key={index} value={index}>{item.name}</option>
            ))
          }
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="">state Name</label>
        <select onChange={handleStateChange} value={stateId}>
          {
            stateList.length>0&&stateList.map((item,index)=>(
              <option key={index} value={index}>{item.name}</option>
            ))
          }
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="">city Name</label>
        <select onChange={handleCityChange} value={cityId}>
          {
            cityList.length>0&&cityList.map((item,index)=>(
              <option key={index} value={index}>{item.name}</option>
            ))
          }
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="">country code</label>
        <input type="text" name="countryCode" onChange={(e)=>handlechangeInput(e)}/>
      </div>
      <div className="form-group">
        <label htmlFor="">zipCode</label>
        <input type="text" name="zipCode" onChange={(e)=>handlechangeInput(e)}/>
      </div>
      <div className="form-group">
        <label htmlFor="">address line1 streat number</label>
        <input type="text" name="line1" onChange={(e)=>handlechangeInput(e)}/>
      </div>
      <button type="submit">send data</button>
      </form>
    </div>}
      {productorder &&
        productorder.map((item,index) => (
          <div key={index}>
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
        <form>
            <div className="form-group">
              
            <label htmlFor="">add copon</label>
              <input type="text" onChange={(e)=>{setCopon(e.target.value)}}/>
            </div>
            </form>
          {items.length>0 ? (
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
