"use client";
import Image from 'next/image';
import logo from '../../../../public/logo.png'
import { IoMenu } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import Link from 'next/link';
import { useContext, useState ,useEffect} from 'react';
import { GlobalContext } from '@/app/context/GobalContext';
function Nav() {
 const { data, setdata } = useContext(GlobalContext);
    const [filterdata, setFilterdata] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const [originalData, setOriginalData] = useState(data); // Store original data

    useEffect(() => {
        if (!filterdata) {
            setdata(originalData); // Restore original data when input is empty
            setErrorMessage(false);
            return;
        }

        const filteredData = originalData?.filter((item) =>
            item.text.toLowerCase().includes(filterdata.toLowerCase())
        );

        if (filteredData.length > 0) {
            setdata(filteredData);
            setErrorMessage(false);
        } else {
            setErrorMessage(true);

            // Restore original data after 1 second
            const timeout = setTimeout(() => {
                setErrorMessage(false);
                setFilterdata(""); // Clear the input field
                setdata(originalData); // Restore original data
            }, 1000);

            return () => clearTimeout(timeout); // Cleanup timeout
        }
    }, [filterdata]);



    return (
       <div className="bg-white w-full flex my-5 items-center justify-around text-[rgb(89,90,92)]"> 
    
    <Link href='/'><div className="h-[32px] w-[32px] bg-black">1</div></Link>

    <div className="max-w-[768px] px-3  flex items-center justify-between h-[44px] border-[1px] rounded-[10px] border-[rgba(229,231,235,1)] sm:w-[80%] xl:w-[100%] ">
        <input    value={filterdata}
                    onChange={(e) => setFilterdata(e.target.value)}  type="text" placeholder="Search for products, brands, and more..." className="w-[80%] outline-none" />

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
    {/* Error Message with Animation */}
            {errorMessage && (
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-[16px] px-4 py-2 rounded-lg shadow-md animate-slide-in">
                    No data found
                </div>
            )}

            {/* Tailwind animation */}
            <style jsx>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-slide-in {
                    animation: slideIn 0.3s ease-in-out;
                }
            `}</style>


     
</div>
    )
}

export default Nav;