"use client"
import { GlobalContext } from "@/app/context/GobalContext";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

function AddProducts({text,price,imageUrl,linkUrl,onclick}) {
  
    const [hover,setHover]=useState(false)
     const [isLiked, setIsLiked] = useState(false); 


    // Toggle the heart icon
    const toggleLike = () => {
        setIsLiked((prev) => !prev);
    };

     const baseUrl = "http://localhost:3001/uploads/";
const fixedImageUrl = imageUrl.replace(/^\/?uploads\//, "");
    return (
        <div className="shadow-[2px_0px_1px_0px_rgba(0,0,0,0.05)] bg-[rgba(255,255,255,1)]  text-[rgba(95,95,95,1)] h-[312.81px] border-[1px] border-[rgba(229,231,235,1)] w-[236.8px] rounded-[8px]  ">
           
            <div  onMouseEnter={() => setHover(true)}
                   onMouseLeave={() => setHover(false)}  
                
                    className={`h-[236.8px] w-full   relative rounded-t-[7px]    `}  >
                
                
             

                <div onClick={(e) => {
                        e.stopPropagation(); 
                        toggleLike();
                        if (onclick) {
                            onclick(); 
                        }
                    }} className="absolute transition duration-300 ease-in text-[rgba(75,85,99,1)] z-40 h-[13.66px] text-[16px] top-2 right-2">
                    {isLiked ? <FaHeart  /> : <CiHeart />}
                </div>
              <Link href={linkUrl}>
                 <div className={`h-full w-full absolute top-0 left-0 bg-[rgba(229,231,235,1)] ${ hover ? "opacity-50 transition duration-300 ease-in-out" : "opacity-0" }`  }> </div>
                <div  
           
                  className=' h-full flex-center overflow-hidden  w-full 
                '>
                   
                    <Image src={`${baseUrl}${fixedImageUrl}`} alt={text}  width={236}  height={10} className="w-full  object-cover" />
                   
                </div>
                 </Link>
            </div>
           



            <div className="p-5 flex flex-col gap-2 ">
                <p className="text-[rgba(0,0,0,1)] inter font-[500] text-[14px] leading-[14px] ">{text}</p>
                <p className="text-[rgba(107,114,128,1)] inter font-[400] text-[14px] leading-[14px] ">${price}</p>

            </div>
        </div>
    )
}

export default AddProducts