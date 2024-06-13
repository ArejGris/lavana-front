'use client'
import { useRef } from "react";
const Copon = ({sendParams}) => {
const discount=useRef()
const number=useRef()
function send(){
    const discount1=discount.current.value
    const number1=number.current.value
    sendParams(discount1,number1)
}
    return ( <>
        <form onSubmit={send}>
        <div className="form-group">
            <label htmlFor="">discount amount</label>
             <input type="text" ref={discount}/>
        </div>
        <div className="form-group">
        <label htmlFor="">number of copons</label>
             <input type="text" ref={number}/>
        </div>
        <button>send</button>
    </form>
    </> );
}
 
export default Copon;