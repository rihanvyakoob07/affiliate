"use client"
import Link from "next/link";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

function AddProducts({text,price,imageUrl,linkUrl}) {
    const [hover,setHover]=useState(false)
    const [clicked,setclicked]=useState(false)

     


    return (
        <div className="shadow-[2px_0px_1px_0px_rgba(0,0,0,0.05)] bg-[rgba(255,255,255,1)]  text-[rgba(95,95,95,1)] h-[312.81px] border-[1px] border-[rgba(229,231,235,1)] w-[236.8px] rounded-[8px]  ">
            <Link href={linkUrl}>
            <div  onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}  style={{ backgroundImage: `url(${imageUrl})` }} className={`h-[236.8px] bg-cover  bg-no-repeat bg-center relative rounded-t-[7px]    `}  >
                
                
                <div className={`h-full w-full absolute top-0 left-0 bg-[rgba(229,231,235,1)] ${ hover ? "opacity-50 transition duration-300 ease-in-out" : "opacity-0" }`  }> </div>
                <div onClick={()=>setclicked(true)} className="absolute transition duration-300 ease-in text-[rgba(75,85,99,1)] z-50 h-[13.66px] text-[16px] top-2 right-2">
                     {clicked ? <FaHeart /> : <CiHeart /> }
                </div>
            </div>
            </Link>



            <div className="p-5 flex flex-col gap-2 ">
                <p className="text-[rgba(0,0,0,1)] inter font-[500] text-[14px] leading-[14px] ">{text}</p>
                <p className="text-[rgba(107,114,128,1)] inter font-[400] text-[14px] leading-[14px] ">${price}</p>

            </div>
        </div>
    )
}

export default AddProducts