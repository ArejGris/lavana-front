import SingleProduct from "@/app/[lng]/components/admin/singleproduct/SingleProduct";

const Product = ({params:{lng,id}}) => {

    return ( <SingleProduct id={id} lng={lng}/> );
}
 
export default Product;