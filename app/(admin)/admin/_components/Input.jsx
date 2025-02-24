function Input({label,placeholder,onchange}) {
    return (
        <div className="flex flex-col gap-1">
                    <label htmlFor={label} className="inter font-[500] text-[14px] text-[16.94px] text-[rgba(55,65,81,1)] ">
                           {label}
                    </label>
                    <input id={label} onChange={onchange} className="font-[400] inter placeholder-[rgba(173,174,188,1)] border rounded-[8px] h-[42px] px-2 border-[rgba(209,213,219,1)] text-[16px] leading-[24px] " placeholder={placeholder} />
                </div>
    )
}

export default Input