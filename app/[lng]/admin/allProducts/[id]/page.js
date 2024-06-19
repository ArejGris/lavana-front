import SingleProduct from "@/app/[lng]/components/admin/singleproduct/SingleProduct";

const Product = (context) => {
    const {id}=context.params
    return ( <SingleProduct id={id}/> );
}
 
export default Product;