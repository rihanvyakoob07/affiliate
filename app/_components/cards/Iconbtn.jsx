function Iconbtn({icon}) {
return (
    <div className="flex-center cursor-pointer transition-all ease-in duration-5000 hover:bg-[rgb(234,231,231)] gap-2 bg-[rgba(233,233,233,1)] h-[40px] w-[80px] rounded-[5px] sm:w-[135px] sm:gap-5 ">
        <div>{icon}</div>
        <p className="inter font-[500] text-[11.81px] leading-[40px] text-center text-[rgba(30,41,57,1)]  ">Share</p>
    </div>
)
}

export default Iconbtn