import Iconbtn from "../../cards/Iconbtn"
import { IoMdShare } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

function Footer() {
    return (
        <div className="bg-[rgba(255,255,255,1)] pt-5 pb-5 text-black h-fit w-full flex-center flex-col gap-5   ">
            <p className="text-[rgba(0,0,0,1)] font-[700] text-[13px] leading-[18px] text-center ">AS AN AMAZON ASSOCIATE I EARN FROM QUALIFYING PURCHASES.</p>

            <div className="flex gap-2 sm:gap-5 items-center">
                  <Iconbtn icon={<IoMdShare />} />
                  <Iconbtn icon={<FaMessage />} />
                  <Iconbtn icon={<FaFacebookMessenger />} />
                  <Iconbtn icon={<FaWhatsapp />} />
            </div>

            <p className="text-[rgba(0,42,71,1)] font-[700] text-[14px] leding-[20px] text-center cursor-pointer  ">GO TO HOME PAGE</p>

            <div>
              {['CONTACT US','EMAIL','INSTAGRAM','TIKTOK'].map((items,index)=>(
                <p className="text-[rgba(0,42,71,1)] cursor-pointer font-[700] text-[14px] leding-[20px] text-center  " key={index}>{items}</p>
              ))}
            </div>

            <p className="text-[rgba(45,62,79,1)] font-[600] text-[10px] leading-[18px] text-center ">Design one yourself using <span className="text-[rgba(18,159,255,1)]">THE WEBFLOW PLATFORM</span>  JUST LIKE US  </p>
         
            <div>

            <p className="text-[rgba(0,42,71,1)] font-[700] text-[14px] leding-[20px] text-center  ">Privacy Policy</p>

            <p className="text-[rgba(0,42,71,1)] font-[700] text-[14px] leding-[20px] text-center  ">Terms and Conditions</p>
            </div>
        </div>
    )
}

export default Footer