import Image from 'next/image';
import logo from '../../../../public/logo.png'
import { IoMenu } from "react-icons/io5";
import Link from 'next/link';
function Nav() {
    return (
        <nav className=" bg-white h-[110px] flex-center ">
            <div className="max-w-[960px] h-[75px]  text-[rgba(68,68,68,1)] flex justify-between items-center w-[90%] xl:w-[100%]">
                 <div>
                    <Image src={logo} alt='logo' width={100} height={75}  />
                 </div>
                 <div className=' hidden sm:block'>
                    <ul className="flex items-center gap-5">
                        <Link href='/productListing'>
                        <li className="font-[700] text-[15px] cursor-pointer leading-[20px] text-center ">gift idea lists</li>
                        </Link>
                        <li className="font-[700] text-[15px] cursor-pointer leading-[20px] text-center ">Home page</li>
                    </ul>
                 </div>
                 <div className='block text-[30px] sm:hidden'>
                    <IoMenu />
                 </div>
            </div>
          
        </nav>
    )
}

export default Nav;