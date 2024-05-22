import { createSlice, current} from "@reduxjs/toolkit";

export const orderSlice=createSlice({
    name:"order",
    initialState:{
        items:[],
        counter:0
    },
    reducers:{

           increment:(state,action)=>{ 
            
        console.log(current(state.items))
            const newitem=action.payload
            state.counter++
            if (state.items.some(item=>item.productId===newitem.productId) == []) {
              state.items.push(newitem);
            } else {
              const id = state.items.findIndex(item=>item.productId===newitem.productId);
              state.items[id].quantity++;
            }},
            decrement:(state=initialState,newitem)=>{
                if (state.items.some(item=>item.productId===newitem.productId) == []) {
                    console.log("not found");
                  } else {
                      
                    const id = state.items.findIndex(item=>item.productId===newitem.productId);
                    const count = state.items[id].quantity;
                    if (count > 1) {
                      state.items[id].quantity--;
                    }
                    if(count==1){
                     state= state.items.filter(item=>item.productId!==newitem.productId)
                    }
                  }
            }
          
    }
})
export const {increment,decrement}=orderSlice.actions
export const orderItems=(state)=>state.items
export default orderSlice.reducer