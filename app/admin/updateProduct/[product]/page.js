"use client";
import { useEffect, useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import  {storage}  from "@/fiebaseStore";
import SnapProduct from "@/components/products/snapProduct";
const UpdatPage = (context) => {
  const [data, setData] = useState({
    keyWord: "",
    description: "",
    size: "",
    price: "",
  });

  const [images, setImages] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [oldproduct, setOldproduct] = useState(null);
  const [mode,setMode]=useState("")
  const [show,setShow]=useState(true)
  const { product } = context.params;
  async function getCat() {
    const data = await fetch("http://localhost:5000/admin/get-categorys",{mode:"cors"});
    const res = await data.json();
    setCategory(res.categorys);
    console.log(res);
  }
  useEffect(() => {
    getCat();
  }, []);
  function handleAddImages(e) {
    setImages(oldproduct.images);
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
                setOldproduct((prev) => ({ ...prev, images: { ...images } }));
              
              console.log(images);
            });
          }
        );
      }
    });
  }
  function changeSelect(value, checked) {
    console.log(value, checked);
    if (checked) {
      setSelectedCategory((prev) => [...prev, value]);
    } else {
      setSelectedCategory(selectedCategory.filter((cat) => cat !== value));
    }
  }
  function handleChange(e) {
    e.preventDefault();
    const inputfiles = document.getElementById("fileInput");
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
            setProgress(progressAmount);
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
              setImages((prev) => ({
                ...prev,
                [`image${index + 1}`]: downloadURl,
              }));
              setOldproduct((prev) => ({
                ...prev,
                images: { ...images, [`image${index + 1}`]: downloadURl },
              }));
              console.log(`image${index + 1}`);
            });
          }
        );
      }
    });
    console.log(images);
  }
  function handleChangeDate(e) {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setOldproduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
          categories: selectedCategory,
          ...data,
        }),
        mode: "cors",
      });
      const data2 = await res.json();
      console.log(data2);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
   async function fetchData(){ console.log(product)
    const res = await fetch(
      `http://localhost:5000/admin/get-product/${product}`
    );
    const data = await res.json();
    console.log(data)
    setOldproduct(data.product);}
    fetchData()
  }
 , []);
  const handleProduct = () => {
    return (
      <>
        <form onSubmit={send}>
          <div className="form-group">
            <label htmlFor="">price</label>
            <input
              type="number"
              name="price"
              onChange={(e) => handleChangeDate(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">size</label>
            <select name="size" onChange={(e) => handleChangeDate(e)}>
              <option value="xx-small">xx-small</option>
              <option value="x-small">x-small</option>
              <option value="small">small</option>
              <option value="meduim">meduim</option>
              <option value="large">large</option>
              <option value="x-large">x-large</option>
              <option value="xx-large">xx-large</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="">title</label>
            <input
              type="text"
              name="keyWord"
              onChange={(e) => handleChangeDate(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">description</label>
            <input
              type="text"
              name="description"
              onChange={(e) => handleChangeDate(e)}
            />
          </div>
          <div className="form-group">
            {show&&<div className="actions">
            <label htmlFor="">you want change or add</label><button onClick={()=>{setMode("change");setShow(false)}}>change</button>
            <button  onClick={()=>{setMode("add") ;setShow(false)}}>add</button></div>}
          </div>
         {mode=="change"&& <div className="form-group" id="images">
            <label htmlFor="">change images</label>
            <input
              type="file"
              id="fileInput"
              name="files"
              accept="image/*"
              onChange={(e) => handleChange(e)}
              multiple
            />
            <progress value={progress} max="100"></progress>
          </div>}
          {mode=="add"&&<div className="form-group" id="addimages">
            <label htmlFor="">add images</label>
            <input
              type="file"
              id="filenewInput"
              name="files"
              accept="image/*"
              onChange={(e)=>{handleAddImages(e)}}
              multiple
            />
            <progress value={progress2} max="100"></progress>
          </div>}
          <div className="form-group">
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
          <button type="submit">send</button>
        </form>
      </>
    );
  };
  return (
    <div style={{ display: "flex" }}>
      {oldproduct && <SnapProduct product={oldproduct} />}
      {handleProduct()}
    </div>
  );
};

export default UpdatPage;
