"use client";
import { useEffect, useState } from "react";
import classes from "./allcat.module.css";
import Cat from "../../components/admin/catModel/cat";
import AddCategoryModel from "../../components/admin/catModel/addCat/addCatModel";
import Link from "next/link";
const AllCategories = ({ params: { lng } }) => {
  const [cats, setCats] = useState();
  const [addcat, setAddcat] = useState(false);
  async function getCats() {
    const res = await fetch("http://localhost:5000/admin/get-categorys");
    const data = await res.json();
    console.log(data);
    setCats(data.categories);
  }
  useEffect(() => {
    getCats();
  }, []);
  return (
    <>
   {addcat&& <AddCategoryModel lng={lng} setAddcat={setAddcat} getData={getCats}/>}
     <div className={classes.header}><button className={classes.btn} onClick={()=>setAddcat(true)}>add category</button></div>
        
      <div className={classes.container}>
       <div className={classes.allcat}>
          {cats &&
            cats.map((cat) => <Link href={`/${lng}/admin/allCategories/${cat.id}`}>
            
            <Cat cat={cat} lng={lng} getData={getCats}/>
            </Link>
            )}
        </div>
      </div>
    </>
  );
};

export default AllCategories;
