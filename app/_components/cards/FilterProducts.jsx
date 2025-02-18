function FilterProducts({text,icon}) {
    return (
        <div className="flex flex-col gap-2">
<div className="flex-center text-[rgba(79,70,229,1)] bg-[rgba(224,231,255,1)] h-[56px] w-[56px] rounded-full border-[1px] border-[rgba(229,231,235,1)] ">
    {icon}
</div>
<p className="text-[14px] text-[rgba(75,85,99,1)] font-[400] leading-[14px] text-center   ">{text}</p>
        </div>
    )
}

export default FilterProducts