import Icontext from "./cards/IconText"
import { RiLinksLine } from "react-icons/ri";
import { BsGraphDown } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { FaBox } from "react-icons/fa";
import { RiDashboard3Fill } from "react-icons/ri";

function Sidebar() {
    return (
        <div>
            <div className="h-[61px] flex items-center pl-4 w-full border-b-[1px] border-[rgba(229,231,235,1)]">
                <p className="inter text-[13px] sm:text-[20px] leading-[20px] text-[rgba(0,0,0,1)] font-[700] ">Admin Dashboard</p>
            </div>
            <div className="flex flex-col pl-5 justify-around h-[264px]">
<Icontext icon={<RiDashboard3Fill />} text='Dashboard' />
<Icontext icon={<FaBox  />} text='Products' />
<Icontext icon={<RiLinksLine />} text='Links' />
<Icontext icon={<BsGraphDown  />} text='Analytics' />
<Icontext icon={<IoMdSettings />} text='Settings' />
            </div>
        </div>
    )
}

export default Sidebar