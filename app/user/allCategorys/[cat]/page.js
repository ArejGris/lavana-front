async function getData(cat) {
  const res = await fetch('http://localhost:5000/admin/get-category/'+cat,{mode:"no-cors"});
  
  if (!res.ok) {
    return("internal server error");
  } else {
    const data= await res.json();
    console.log(data)
    return data
  }
}
const OneCat = async (context) => {
  const { cat } = context.params;
  console.log(cat);
  const data = await getData(cat);
  const products=data.products
  console.log(products)
  return (
    <>
      {products&&products.map((product) => (
        <>
          <h1>{product.keyWord}</h1>
          <p>{product.description}</p>
          <h5>{product.size}</h5>
        </>
      ))}
    </>
  );
};

export default OneCat;
