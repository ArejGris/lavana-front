"use client";
import { useEffect, useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import  {storage}  from "@/fiebaseStore";
import classes from './updateproduct.module.css'
import SnapProduct from "@/app/[lng]/components/products/snapProduct";
const UpdatPage = ({params:{lng,product}}) => {
  const [data, setData] = useState(null);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState([]);
 const [selectedCategory, setSelectedCategory] = useState([]);
 const [note,setNote]=useState(false)
  const [progress2, setProgress2] = useState(0);
  const [mode,setMode]=useState("")
  const [show,setShow]=useState(true)
  async function getCat() {
    const data = await fetch("http://localhost:5000/admin/get-categorys",{mode:"cors"});
    const res = await data.json();
    setCategory(res.categorys);
   
  }
  useEffect(() => {
    getCat();
  }, []);
  function handleAddImages(e) {
    const inputfiles = document.getElementById("filenewInput");
    const files = inputfiles.files;
    console.log(files);
    Array.from(files).forEach((file, index) => {
      if (file) {
        const storageRef = ref(storage, `images/${file.name}`);
        const upload = uploadBytesResumable(storageRef, file);
        upload.on(
          "state_changed",
          (snapchat) => {
            const progressAmount = Math.round(
              (snapchat.bytesTransferred / snapchat.totalBytes) * 100
            );
            setProgress2(progressAmount);
          },
          (error) => {
            console.error(error);
          },
          () => {
            getDownloadURL(upload.snapshot.ref).then((downloadURl) => {
              console.log(downloadURl);
              const imagesdiv = document.getElementById("images");
              const snap = document.createElement("img");
              snap.setAttribute("src", downloadURl);
              snap.style.width = "50px";
              snap.style.height = "50px";
              imagesdiv.appendChild(snap);
                setImages((prev) => [...prev,downloadURl]);
                //setData((prev) => ({ ...prev, images:[...prev.images,downloadURl]}));
              
              console.log(data);
            });
          }
        );
      }
    });
  }
  function changeSelect(value, checked) {
    if (checked) {
      setSelectedCategory((prev) => [...prev, value]);
    } else {
      setSelectedCategory(selectedCategory.filter((cat) => cat !== value));
    }
  
  }
 
  function handleChangeData(e) {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function send(e) {
    e.preventDefault();
    console.log(data)
    try {
      const res = await fetch("http://localhost:5000/admin/update-product/"+product, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          categories: selectedCategory,
          images
        }),
        mode: "cors",
      });
      const data2 = await res.json();
      console.log(data2,"data2")
      if(res.status===200){
        setNote(true)
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchData(){ 
    const res = await fetch(
      `http://localhost:5000/admin/get-product/${product}`
    );
    const data = await res.json();
    setData(data.product)
    if(data.product){
    setImages(data.product.images)}

  }
  useEffect(() => {
 
    fetchData()
  }
 , []);
  const handleProduct = () => {
    return (
        <form onSubmit={send} className={classes.form}>
          <div className={classes.formGroup}>
            <label htmlFor="">price</label>
            <input
              type="number"
              name="price"
              placeholder={data?data.price:""}
              onChange={(e) => handleChangeData(e)}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="">size</label>
            <select name="size" value={data?data.size:'small'} onChange={(e) => handleChangeData(e)}>
              <option value="xx-small">xx-small</option>
              <option value="x-small">x-small</option>
              <option value="small">small</option>
              <option value="meduim">meduim</option>
              <option value="large">large</option>
              <option value="x-large">x-large</option>
              <option value="xx-large">xx-large</option>
            </select>
          </div>

          <div className={classes.formGroup}>
            <label htmlFor="">title</label>
            <input
              type="text"
              name="keyWord"
              placeholder={data?data.keyWord:""}
              onChange={(e) => handleChangeData(e)}
            />
          </div>
            <div className={classes.formGroup}>
            <label htmlFor="">title in arabic</label>
            <input
              type="text"
              name="keyWord2"
              placeholder={data?data.keyWord2:''}
              onChange={(e) => handleChangeData(e)}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="">description</label>
            <input
              type="text"
              name="description"
              placeholder={data?data.description:""}
              onChange={(e) => handleChangeData(e)}
            />
          </div>
            <div className={classes.formGroup}>
            <label htmlFor="">description in arabic</label>
            <input
              type="text"
              name="description2"
              placeholder={data?data.description2:""}
              onChange={(e) => handleChangeData(e)}
            />
          </div>
          <div className={classes.formGroup}>
            {show&&<div className="actions">
            <label htmlFor="">you want change or add</label><button onClick={()=>{setMode("change");setImages([]);setShow(false)}}>change</button>
            <button  onClick={()=>{setMode("add");setShow(false)}}>add</button></div>}
          </div>
          <div className="images" id="images"></div>
       
          <div className={classes.formGroup} id="addimages">
            <label htmlFor="">{mode=="add"?"add images":"change images"}</label>
            <input
              type="file"
              id="filenewInput"
              name="files"
              accept="image/*"
              onChange={(e)=>{handleAddImages(e)}}
              multiple
            />
            <progress value={progress2} max="100"></progress>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="">categories</label>
            <div type="text">
              {category &&
                category.map((cat) => (
                  <>
                    <label>{cat.title}</label>
                    <input
                      type="checkbox"
                      value={cat.id}
                      onChange={(e) => changeSelect(cat.id, e.target.checked)}
                    />
                  </>
                ))}
            </div>
          </div>
          <button type="submit" className={classes.btn}>send</button>
        </form>
      
    );
  };
  return (
    <div className={classes.container}>
     {note&& <div className={classes.note}><p>successfully updated the product</p><button onClick={()=>setNote(false)}>ok</button></div>}
      {data && <SnapProduct product={data} lng={lng} setData={setData}/>}
      {handleProduct()}
    </div>
  );
};

export default UpdatPage;
