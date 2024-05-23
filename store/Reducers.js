
let state = {
  items: [

  ],
};
export default function Reducers(initialState = state, action) {
  const newitem = action.data;
  if (action.type == "ADD") {
    if (state.items.some(item=>item.productId===newitem.productId) == []) {
      state.items.push(newitem);
    } else {
      const id = state.items.findIndex(item=>item.productId===newitem.productId);
      state.items[id].quentity++;
    }
    console.log(state)
  }
  if (action.type == "REMOVE") {
    if (state.items.some(item=>item.productId===newitem.productId) == []) {
      console.log("not found");
    } else {
        
      const id = state.items.findIndex(item=>item.productId===newitem.productId);
      const count = state.items[id].quentity;
      if (count > 1) {
        state.items[id].quentity--;
      }
      if(count==1){
       state= state.items.filter(item=>item.productId!==newitem.productId)
      }
    }
  }
  console.log(state)
}