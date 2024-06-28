'use client'
import classes from './snap.module.css'
import Link from 'next/link'
const SnapProduct = ({product,lng,setData}) => {
product.images=[
    "/images/image-6-370x266.jpg",
    "/images/product2.jpg",
    "/images/image-19-321x333.jpg",
    "/images/image-21-727x804.jpg",
  ]
  function deleteData(){
    setData({})
  }
    return (
<div className={classes.snap}>

   <div className={classes.wrapper}>
    <div className={classes.img}>
        <img src={product.images[0]} alt="" />

    </div>
    <div className={classes.contents}>
    <h1>{product.keyWord}</h1>
    <p>{product.description}</p>
    <div>${product.price}<span className={classes.price}>${product.price}</span></div>
    <h5>{product.size}</h5>
    <div className={classes.actions}>
                <button><i className="bi bi-pencil-square"></i></button>
                <Link href={`/${lng}/admin/allProducts/${product.id}`}><i className="bi bi-bookmark-star"></i></Link>
                <button onClick={deleteData}><i className="bi bi-trash"></i></button>
                <button><i className="bi bi-download"></i></button>
                <button><i className="bi bi-upload"></i></button>
            </div>
            <div className={classes.review}>
                <li><i className="bi bi-star"></i></li>
                <li><i className="bi bi-star"></i></li>
                <li><i className="bi bi-star"></i></li>
                <li><i className="bi bi-star"></i></li>
                <li><i className="bi bi-star"></i></li>
            </div>
    </div>
   </div>
<div className={classes.imgs}>
    <ul>
      {product.images.length>0&&product.images.map(img=> <li><img src={img} alt="" style={{width:"50px"}} /></li>) }
    </ul>
</div>
</div>  );
}
 
export default SnapProduct;