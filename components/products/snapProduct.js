const SnapProduct = ({product}) => {
    return (<>
<div className="countainer">
    <h1>{product.keyWord}</h1>
    <p>{product.description}</p>
    <h5>{product.price}</h5>
    <h5>{product.size}</h5>
<div className="images">
    <ul>
      {product.images.map(img=> <li><img src={img} alt="" style={{width:"50px"}} /></li>) }
    </ul>
</div>
</div>
    </>  );
}
 
export default SnapProduct;