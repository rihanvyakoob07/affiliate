import { IoIosNotificationsOutline } from "react-icons/io"
function AdminNavBar() {
    return (
        <div className="max-w-[1120px]  flex items-center justify-between h-[56px] ">
            <div>
                <p className="text-[rgba(0,0,0,1)] inter font-[700] text-[11px] sm:text-[24px] sm:leading-[24px] ">Welcome Back, Admin</p>
                <p className="inter font-[400] text-[10px] sm:text-[16px] sm:leading-[16px] text-[rgba(75,85,99,1)] ">Here's what's happening today</p>
            </div>

            <div className="flex items-center gap-2">
                <div className="w-[30px] h-[32px] flex-center text-[16px] rounded-full bg-[rgba(255,255,255,1)] border border-[rgba(229,231,235,1)] ">
                    <IoIosNotificationsOutline />
                </div>
                 <div className="w-[40px] h-[40px] bg-black  rounded-full bg-[rgba(255,255,255,1)] border border-[rgba(229,231,235,1)] ">
                    
                </div>
            </div>
        </div>
    )
}
export default AdminNavBar;