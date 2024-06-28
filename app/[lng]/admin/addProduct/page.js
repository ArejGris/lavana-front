"use client";
import { useEffect, useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/fiebaseStore";
import { useSession } from "next-auth/react";
import { useTranslation } from "@/app/i18n/client";
import { Footer } from "../../components/Footer/client";
import classes from "./createproducte.module.css";
import SnapProduct from "../../components/products/snapProduct";
const AddProduct = ({ params: { lng } }) => {
  const { t } = useTranslation(lng, "addProduct");
  const [data, setData] = useState({});
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [progress, setProgress] = useState(0);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(null);
  async function getCat() {
    const data = await fetch("http://localhost:5000/admin/get-categorys", {
      mode: "cors",
    });
    const res = await data.json();
    setCategory(res.categories);
    console.log(res);
  }
  function handleChangeData(e) {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  useEffect(() => {
    getCat();
  }, []);
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
              setImages((prev) => [...prev, downloadURl]);
              console.log(images);
            });
          }
        );
      }
    });
    console.log(images);
  }

  async function send(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/admin/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, categories: selectedCategory, images }),
        mode: "cors",
      });
      const data2 = await res.json();
      console.log(data2,"data2");
      if (data2.product) {
       
        setAlert(true);
        setError(null)
      }else{
        setError("error occured")
      }
      const form = e.target;
      setSelectedCategory([]);
      setImages([]);
      setProgress(0);
      form.reset();
      const f=document.getElementById("form")
      const checkboxs=f.querySelectorAll('input[type="checkbox"]')
      checkboxs.forEach(checkbox=>{
          checkbox.checked=false
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className={classes.container}>
       <div className={classes.snap}>
        {error&&<div className={classes.error}>{error}</div>}
       <SnapProduct
            lng={lng}
            product={{ ...data, images, selectedCategory }}
            setData={setData}
          />

       </div>
           
        
        
        <form onSubmit={send} className={classes.AddProduct} id="form">
          <h1>ADD Product</h1>{" "}
          <button
            onClick={() => setData({})}
            className={classes.btnclose}
          >
            <i
              className="bi bi-x-lg"
              style={{ color: "white", fontWeight: "700" }}
            ></i>
          </button>
          <div className={classes.formGroup}>
            <label htmlFor="">{t("price")}</label>
            <input
              type="number"
              name="price"
              onChange={(e) => handleChangeData(e)}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="">{t("size")}</label>
            <select  onChange={(e) => handleChangeData(e)} name="size">
              <option value="size">size</option>
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
            <label htmlFor="">{t("title")}</label>
            <input
              name="keyWord"
              type="text"
              onChange={(e) => handleChangeData(e)}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="">{t("title2")}</label>
            <input
              type="text"
              name="keyWord2"
              onChange={(e) => handleChangeData(e)}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="">{t("description")}</label>
            <input
              type="text"
              name="description"
              onChange={(e) => handleChangeData(e)}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="">{t("description2")}</label>
            <input
              type="text"
              name="description2"
              onChange={(e) => handleChangeData(e)}
            />
          </div>
          <div className={classes.formGroup2} id="images" >
            <label htmlFor="">{t("images")}</label>
            <input
              type="file"
              id="fileInput"
              name="files"
              accept="image/*"
              onChange={(e) => handleChange(e)}
              multiple
            />
            <progress value={progress} max="100"></progress>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="">{t("categories")}</label>
            <div className={classes.cats}>
              {category &&
                category.map((cat) => (
                  <div className={classes.cat}>
                    <input
                      type="checkbox"
                      value={cat.id}
                      onChange={(e) => changeSelect(cat.id, e.target.checked)}
                    />
                    <label>{cat.title}</label>
                  </div>
                ))}
            </div>
          </div>
          <div className={classes.actions}>
            <button type="submit" className={classes.btnsend}>
              {t("send")}
            </button>
            <button className={classes.btn2} onClick={() => setData({})}>
              cancel
            </button>
          </div>
        </form>
        {alert && (
          <div className={classes.note}>
            <label htmlFor="">you have added the product</label>
            <button onClick={() => setAlert(false)}>ok</button>
          </div>
        )}
      </div>
      <Footer lng={lng} path="/admin/addProduct" />
    </>
  );
};

export default AddProduct;
