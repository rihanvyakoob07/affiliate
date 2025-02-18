function ProductDisplayCard({text,imageUrl}) {
    return (
        <div className="bg-[rgba(255,255,255,1)] shadow-[0px_10px_20px_-14px_rgba(95,95,95,1)]  text-[rgba(95,95,95,1)] h-[346.67px] w-[226.67px] rounded-[7px]  ">
            <div style={{ backgroundImage: `url(${imageUrl})` }} className="h-[226.66px] bg-cover  bg-no-repeat bg-center  rounded-t-[7px] ">

            </div>
            <div className="p-5 ">
                <p className="text-[rgba(30,41,57,1)] font-[700] text-[15px] leading-[25px] ">{text}</p>
            </div>
        </div>
    )
}

export default ProductDisplayCard