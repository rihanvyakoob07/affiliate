"use client";
import { IoPhonePortrait } from "react-icons/io5";
import { MdComputer } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { MdHeadset } from "react-icons/md";
import { FaGamepad } from "react-icons/fa6";
import { CiCircleQuestion } from "react-icons/ci";

// import data from "@/app/lib/data";
import { useContext, useState } from "react";
import { GlobalContext } from "@/app/context/GobalContext";
import FilterProducts from "../cards/FilterProducts";
import AddProducts from "../cards/AddProducts";


function ProductsHeaderSection() {
const {data,setdata}=useContext(GlobalContext)

const [visibleCount, setVisibleCount] = useState(20); // Start with 20 products

    // Slice the data to show only the required number of products
    const visibleProducts = data?.slice(0, visibleCount);

    // Function to load more products
    const loadMoreProducts = () => {
        setVisibleCount((prevCount) => prevCount + 20);
    };


    return (
        <div className="bg-white w-full flex-col flex-center py-5">



    <div className="border-[rgba(229, 231, 235, 1)] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]  border flex items-center justify-around border-[1px] border-[rgba(229,231,235,1)] max-w-[1280px] h-[132px] w-[100%] md:w-[90%] xl:w-[100%]">
    <FilterProducts text='Phones' icon={<IoPhonePortrait />} />
    <FilterProducts text='Gadgets' icon={<MdComputer />} />
    <FilterProducts text='Clothing' icon={<GiClothes />} />
    <FilterProducts text='Audio' icon={<MdHeadset />} />
    <FilterProducts text='Gaming' icon={<FaGamepad />} />
    <FilterProducts text='Watches' icon={<CiCircleQuestion />} />
    </div>

    <div className="grid py-5 grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-4 ">
        {visibleProducts?.map((items,index)=>(
            // <Link  href={} >
            <AddProducts key={index} linkUrl={`/individualproducts/${items.productId}`} price={items.price} text={items.text} imageUrl={items.image} />
            // </Link>
        ))}
    </div>

    {/* <button className="bg-[rgba(37,99,235,1)] inter text-[rgba(255,255,255,1)] text-center font-[400] text-[16px] leading-[19.36px] w-[217.2px] rounded-[8px] border-[1px] h-[48px] border-[rgba(229,231,235,1)] ">Load More Products</button> */}
    {visibleCount < data?.length && (
                <button
                    onClick={loadMoreProducts}
                    className="bg-[rgba(37,99,235,1)] inter text-white text-center font-medium text-lg w-[217.2px] rounded-lg border border-gray-300 h-[48px] hover:bg-blue-700 transition duration-300"
                >
                    Load More Products
                </button>
            )}
</div>
    )
}

export default ProductsHeaderSection