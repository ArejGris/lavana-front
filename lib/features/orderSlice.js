import { createSlice, current} from "@reduxjs/toolkit";

export const orderSlice=createSlice({
    name:"order",
    initialState:{
        items:[],
        counter:0,
        orderId:null
    },
    reducers:{

           increment:(state,action)=>{ 
            
        console.log(current(state.items))
            const newitem=action.payload
            if (state.items.some(item=>item.productId===newitem.productId) == []) {
              state.items.push(newitem);
            } else {
              const id = state.items.findIndex(item=>item.productId===newitem.productId);
              state.items[id].quentity++;
            }},
            decrement:(state=initialState,action)=>{
              const newitem=action.payload
                if (state.items.some(item=>item.productId===newitem.productId) == []) {
                    console.log("not found");
                  } else {
                      
                    const id = state.items.findIndex(item=>item.productId===newitem.productId);
                    const count = state.items[id].quentity;
                    if (count > 1) {
                      state.items[id].quentity--;
                    }
                    if(count==1){
                     state.items= state.items.filter(item=>item.productId!==newitem.productId)
                    }
                  }
            },
            deleteOrder:(state,action)=>{
              state.items=[]
            },
            remove:(state,action)=>{
             const newitem=action.payload
              state.items= state.items.filter(item=>item.productId!==newitem.productId)
            },
            setOrderId:(state,action)=>{
              state.orderId=action.payload
            }
    }
})
export const {increment,decrement,deleteOrder,setOrderId,remove}=orderSlice.actions
export const orderItems=(state)=>state.items
export default orderSlice.reducer