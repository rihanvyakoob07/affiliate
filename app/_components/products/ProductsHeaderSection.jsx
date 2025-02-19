
import { IoPhonePortrait } from "react-icons/io5";
import { MdComputer } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { MdHeadset } from "react-icons/md";
import { FaGamepad } from "react-icons/fa6";
import { CiCircleQuestion } from "react-icons/ci";
import Link from "next/link";
import FilterProducts from "../cards/FilterProducts";
import AddProducts from "../cards/AddProducts";
import data from "@/app/lib/data";


function ProductsHeaderSection() {



    return (
        <div className="bg-white w-full flex-col flex-center py-5">



    <div className="bg-[rgba(229,231,235,1)] flex items-center justify-around border-[1px] border-[rgba(229,231,235,1)] max-w-[1280px] h-[132px] w-[100%] md:w-[90%] xl:w-[100%]">
    <FilterProducts text='Phones' icon={<IoPhonePortrait />} />
    <FilterProducts text='Gadgets' icon={<MdComputer />} />
    <FilterProducts text='Clothing' icon={<GiClothes />} />
    <FilterProducts text='Audio' icon={<MdHeadset />} />
    <FilterProducts text='Gaming' icon={<FaGamepad />} />
    <FilterProducts text='Watches' icon={<CiCircleQuestion />} />
    </div>

    <div className="grid py-5 grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-4 ">
        {data.map((items,index)=>(
            <Link  href={`/individualproducts/${items.productId}`} >
            <AddProducts key={index} price={items.price} text={items.text} imageUrl={items.image} />
            </Link>
        ))}
    </div>

    <button className="bg-[rgba(37,99,235,1)] inter text-[rgba(255,255,255,1)] text-center font-[400] text-[16px] leading-[19.36px] w-[217.2px] rounded-[8px] border-[1px] h-[48px] border-[rgba(229,231,235,1)] ">Load More Products</button>
</div>
    )
}

export default ProductsHeaderSection