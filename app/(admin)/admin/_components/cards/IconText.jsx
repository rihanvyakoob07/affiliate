import Link from "next/link"

function Icontext({icon,text,onclick,link}) {
    return (
        <Link href={`${link}`}>
        <div onClick={onclick} className="flex  gap-3">
   <div className="text-[16px] text-black ">{icon}</div>
            <p className="inter font-[400] text-[16px] leading-[19.36px] text-[rgba(55,65,81,1)] ">{text}</p>
        </div>
        </Link>
    )
}

export default Icontext