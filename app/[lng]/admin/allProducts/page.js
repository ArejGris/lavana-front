'use client'
import AllProducts from "../../components/admin/allproducts/AllProducts"

const allProducts =({params: {
    lng
  }}) => {
    
    return ( <>
   <AllProducts lng={lng}/>
    </> );
}
 
export default allProducts;