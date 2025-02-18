function ProductDisplayCard({text}) {
    return (
        <div className="bg-[rgba(255,255,255,1)]  text-[rgba(95,95,95,1)] h-[346.67px] w-[226.67px] rounded-[7px]  ">
            <div className="h-[226.66px] rounded-t-[7px] bg-pink-600">

            </div>
            <div className="p-5 ">
                <p className="text-[rgba(30,41,57,1)] font-[700] text-[15px] leading-[25px] ">{text}</p>
            </div>
        </div>
    )
}

export default ProductDisplayCard