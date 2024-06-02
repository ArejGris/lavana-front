"use client";
import "./style.css";
import OneProduct from "./oneProduct";
import Link from "next/link";

const Products = ({ products,lng }) => {
  return (
    <div className="products">
      {products &&
        products.map((product) => (
          <>
            <OneProduct key={product.id} product={product} />
            <Link href={`/${lng}/user/allProducts/${product.id}`}>visit page</Link>
            <Link href={`/${lng}/admin/updateProduct/${product.id}`}>update product</Link>
          </>
        ))}
    </div>
  );
};

export default Products;
