const SnapProduct = ({product}) => {
    return (<>
<div className="countainer">
    <h1>{product.keyWord}</h1>
    <p>{product.description}</p>
    <h5>{product.price}</h5>
    <h5>{product.size}</h5>
<div className="images">
    <ul>
        <li><img src={product.image1} alt="" style={{width:"50px"}} /></li>
        <li><img src={product.image2} alt="" style={{width:"50px"}} /></li>
        <li><img src={product.image3} alt="" style={{width:"50px"}} /></li>
        <li><img src={product.image4} alt="" style={{width:"50px"}} /></li>
        <li><img src={product.image5} alt="" style={{width:"50px"}} /></li>
    </ul>
</div>
</div>
    </>  );
}
 
export default SnapProduct;