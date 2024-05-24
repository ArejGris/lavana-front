'use client'
import { useRef } from "react";

const AddCategory = async() => {
    const title=useRef(null)
    async function send(e){
        e.preventDefault()
        const t=title.current.value
        try {
            const res= await fetch('http://localhost:5000/admin/add-category',{
                method:"POST",
                headers:{
                 'Content-Type':'application/json'
                },
                body:JSON.stringify({title:t}),
                mode: "cors"
               })
              const data=await res.json()
               console.log(data)
            
        } catch (error) {
            console.log(error)
        }
    
    }
    return ( <>
    <form onSubmit={send}>
        <div className="form-group">
            <label htmlFor="">category title</label>
            <input type="text" ref={title} />
        </div>
        <button type="submit">send</button>
    </form>
    </> );
}
 
export default AddCategory;