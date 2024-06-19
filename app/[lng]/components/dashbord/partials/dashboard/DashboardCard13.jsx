'use client'
import React, { useEffect, useState } from 'react';

function DashboardCard13({lng}) {
 const [products,setProducts]= useState([])
 async function getProducts(){
const res=await fetch('http://localhost:5000/admin/get-products')
const data=await res.json()
setProducts(data.products)
 }
  useEffect(()=>{
  getProducts()
  },[])
  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">All Products</h2>
      </header>
      <div className="p-3">
        {/* Card content */}
        {/* "Today" group */}
        <div>
          <header className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
            Today
          </header>
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">product</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">description</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Customers</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">price</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">top review</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {/* Row */}
              {products.length>0&&products.map(product=><tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <img src={product.image} alt="img" />
                    <div className="text-slate-800 dark:text-slate-100">{lng==='en'?product.keyWord:product.keyWord2}</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">{lng==='en'?product.description:product.description2}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">0</div>
                </td>
                <td className="p-2">
                  <div className="text-center">{product.price}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">4.7%</div>
                </td>
              </tr>)}
              {/* Row */}
          
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard13;
