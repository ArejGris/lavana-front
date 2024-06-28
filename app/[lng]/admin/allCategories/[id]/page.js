'use client'
import { useEffect, useState } from "react";
import classes from "./onecat.module.css";
import AllProducts from "@/app/[lng]/components/admin/allproducts/AllProducts";
import OneProduct from "@/app/[lng]/components/admin/allproducts/OneProduct";
import Cat from "@/app/[lng]/components/admin/catModel/cat";
import DashboardCard13 from "@/app/[lng]/components/dashbord/partials/dashboard/DashboardCard13";
const OneCategory = ({ params: { id ,lng} }) => {
  const [products, setProducts] = useState([]);
  const [cat, setCat] = useState(null);
  const [grid,setGrid]=useState(false)
  async function fetchCat() {
    const res = await fetch("http://localhost:5000/admin/get-category/" + id);
    const data = await res.json();
    console.log(data);
    setProducts(data.products)
    setCat(data.cat)

  }
  
  useEffect(() => {
    fetchCat();
  }, []);
  return (<div className={classes.OneCategory}>
    <div className={classes.category}>

    {cat&& <Cat cat={cat} lng={lng} />}
    </div>
    <div className={classes.products}>
      {products.length>0&&<DashboardCard13 lng={lng} catproducts={products}/>}
   

    </div>
  </div>);
};

export default OneCategory;
