'use client'
import './style.css'
import OneProduct from "./oneProduct";
import Link from 'next/link';

const Products = ({products}) => {

    return (
<div className="products">
             {
               products&&products.map(product=><OneProduct key={product.id} product={product}/>)
             }
             <Link href='/user/make-order'>to order</Link>
    </div> );
}
 
export default Products;
