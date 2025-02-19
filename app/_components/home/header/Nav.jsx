import Image from 'next/image';
import logo from '../../../../public/logo.png'
import { IoMenu } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import Link from 'next/link';
function Nav() {
    return (
       <div className="bg-white w-full flex my-5 items-center justify-around text-[rgb(89,90,92)]"> 
    
    <Link href='/'><div className="h-[32px] w-[32px] bg-black">1</div></Link>

    <div className="max-w-[768px] px-3  flex items-center justify-between h-[44px] border-[1px] rounded-[10px] border-[rgba(229,231,235,1)] sm:w-[80%] xl:w-[100%] ">
        <input  type="text" placeholder="Search for products, brands, and more..." className="w-[80%] outline-none" />

        <CiSearch />
    </div>

    <div className="flex items-center gap-2">
        <div className="relative text-[20px] "> 
            <CiHeart />
        <div className="absolute w-[16px] rounded-full h-[16px] border-[rgba(229,231,235,1)] border-[1px] bg-[rgba(239,68,68,1)] right-[-7px] top-[-5px] flex-center ">
            <p className="inter text-[rgba(255,255,255,1)] font-[400] text-[12px] leading-[14.52px] ">3</p>
        </div>
        </div>
       
        <BsPerson />
    </div>
</div>
    )
}

export default Nav;