
import Footer from "./_components/home/footer/Footer";
import Nav from "./_components/home/header/Nav";
import ProductDisplay from "./_components/home/productsection/ProductDisplay";


export default function Home() {
  return (
    <div className=" ">
    <Nav />
    <ProductDisplay />
      <Footer />
    </div>
  );
}
