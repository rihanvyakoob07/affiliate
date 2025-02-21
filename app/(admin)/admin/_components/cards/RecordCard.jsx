import { IoIosArrowRoundUp } from "react-icons/io";
function RecordCard({propose,total,icon,time,width,color}) {
    return (
        <div className="w-full   h-[132px] p-[24px] border flex justify-center flex-col border-[rgba(229,231,235,1)] bg-[rgba(255,255,255,1)] rounded-[8px] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]  ">
             <div className="flex items-center mb-2 w-full justify-between ">
               <p className="text-[rgba(107,114,128,1)] inter font-[400] text-[16px] leading-[16px] ">{propose}</p>
               <div className={`${width} ${color}  `}>
                {icon}
               </div>
             </div>

             <p className="inter text-[rgba(0,0,0,1)] font-[700] leading-[29.05px] text-[24px]  ">{total}</p>
             <p className="inter font-[400] text-[14px] leading-[16.94px] text-[rgba(34,197,94,1)] flex items-center "><IoIosArrowRoundUp />{time}</p>


        </div>
    )
}

export default RecordCard