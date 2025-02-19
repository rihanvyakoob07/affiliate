import Products from "./_components/Products";

export default function ProductPage({ params }) {
    const { productId } = params; 

    return <Products id={productId} />;
}
