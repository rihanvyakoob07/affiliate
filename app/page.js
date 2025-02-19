
import Footer from "./_components/home/footer/Footer";
import Nav from "./_components/home/header/Nav";
import ProductDisplay from "./_components/home/productsection/ProductDisplay";
import ProductsHeaderSection from "./_components/products/ProductsHeaderSection";
import Products from "./individualproducts/[productId]/_components/Products";


export default function Home() {
  return (
    <div className=" ">
    {/* <Nav />
    <ProductDisplay />
      <Footer /> */}
      <ProductsHeaderSection />
    </div>
  );
}
