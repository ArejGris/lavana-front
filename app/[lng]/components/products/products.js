"use client";
import "./style.css";
import OneProduct from "./oneProduct";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Products = ({ products, lng }) => {
  const { data: session } = useSession();
  useEffect(()=>{
 console.log(session?.role,"session role")
  },[])
  return (
    <div className="products">
      {products &&
        products.map((product) => (
          <>
            <OneProduct key={product.id} product={product} />
            <Link href={`/${lng}/user/allProducts/${product.id}`}>
              visit page
            </Link>
            {session?.role === "admin" && (
              <Link href={`/${lng}/admin/updateProduct/${product.id}`}>
                update product
              </Link>
            )}
          </>
        ))}
    </div>
  );
};

export default Products;
