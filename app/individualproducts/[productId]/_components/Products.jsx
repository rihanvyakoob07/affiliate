import data from "@/app/lib/data";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { TbShape } from "react-icons/tb";
import { BsTagFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
function Products({ id }) {
  
  const res = data.find((el) => el.productId == id); 

  if (!res) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="flex-center bg-white h-fit   w-full">
    <div className="h-fit p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 ">
    <div className="p-5 max-w-[592px] h-fit flex-center gap-2 flex-col rounded-[8px] border-[1px] border-[rgba(229,231,235,1)] bg-[rgba(229,231,235,1)] w-[100%]  ">
        <div style={{backgroundImage:`url(${res.image})`}} className="h-[560px] w-full bg-cover rounded-[8px] bg-center  "></div>

        <div>

<div className="flex  items-center gap-1 xl:gap-2 w-full">
  {Object.values(res.subimage[0]).map((image, index) => (
    <div
      key={index}
      className="h-[70px] w-[70px] sm:w-[80px] sm:h-[80px] xl:w-[136px] xl:h-[136px] rounded-[8px] bg-[rgba(243,244,246,1)] flex justify-center items-center border border-[rgba(229,231,235,1)] "
    >
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="h-[60px] w-[60px] sm:w-[70px] sm:h-[70px] xl:w-[120px] xl:h-[120px] bg-cover bg-center rounded-[8px] border border-[rgba(229,231,235,1)] "
      />
    </div>
  ))}
</div>

            
        </div>
    </div>



    <div className="flex flex-col gap-4">
        <div className="h-[68px] flex flex-col justify-between ">
         <p className="text-[rgba(17,24,39,1)]  inter leading-[30px] text-[30px] font-[700] ">{res.text}</p>

<div className="flex  text-[16px] items-center gap-2">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
        //   size={20}
          className={index < 5 ? "text-[rgba(250,204,21,1)] " : "text-gray-300"}
        />
      ))}
      <p className="inter font-[400] text-[16px] leading-[16px] text-[rgba(107,114,128,1)] ">(245 reviews)</p>
    </div>
         </div> 

<     div className="w-full h-[85px] flex flex-col justify-between ">
<div className="relative w-[139px] h-[30px] flex gap-5"> 
    <p className="text-[rgba(17,24,39,1)]  inter text-[30px] leading-[30px] font-[700] ">${res.price}</p>
    <p className="text-[rgba(107,114,128,1)] inter font-[400] text-[18px] leading-[18px] absolute bottom-0 line-through right-0">$1,299.00</p>
    </div>
       
        <div className="h-[32px] text-[rgba(21,128,61,1)] flex items-center justify-around w-[200.84px] rounded-[9999px] bg-[rgba(220,252,231,1)] border-[1px] border-[rgba(229,231,235,1)] ">
            <BsTagFill />
<p className=" inter font-[400] text-[16px] leading-[19.36px] ">Save $100.00 (7.7%)</p>
        </div>

     </div>

     <div>
        <p className="text-[rgba(75,85,99,1)] inter font-[400] text-[16px] leading-[19.36px] ">Experience the ultimate in smartphone technology with the iPhone 15 Pro Max. Featuring:</p>
           <div className="ml-5">
             
                <p className="text-[rgba(75,85,99,1)] inter font-[400] text-[16px] leading-[19.36px] ">A17 Pro chip for unprecedented performance</p>
                <p className="text-[rgba(75,85,99,1)] inter font-[400] text-[16px] leading-[19.36px] ">A17 Pro chip for unprecedented performance</p>
                <p className="text-[rgba(75,85,99,1)] inter font-[400] text-[16px] leading-[19.36px] ">A17 Pro chip for unprecedented performance</p>
                <p className="text-[rgba(75,85,99,1)] inter font-[400] text-[16px] leading-[19.36px] ">A17 Pro chip for unprecedented performance</p>
                <p className="text-[rgba(75,85,99,1)] inter font-[400] text-[16px] leading-[19.36px] ">A17 Pro chip for unprecedented performance</p>
            </div>
     </div>

     <div className="flex items-center gap-4">
          <button  className="bg-[rgba(37,99,235,1)] flex-center gap-2 text-[rgba(255,255,255,1)] w-[430px] h-[48px] rounded-[8px] border-[1px] border-[rgba(229,231,235,1)] active:bg-[rgb(171,196,249)] transition duration-5000 ease-in-out">
            <div className="w-[18px] h-[16px] "><FaShoppingCart /></div>
            <p className="inter font-[400] text-[16px] leading-[19.36px] text-center  ">Buy Now</p>
          </button>
          <div className="border-[1px] rounded-[8px] text-[rgba(0,0,0,1)] flex-center text-[16px] border-[rgba(209,213,219,1)] h-[48px] w-[66px] "><TbShape /></div>
          <div className="border-[1px] rounded-[8px] text-[rgba(0,0,0,1)] flex-center text-[16px] border-[rgba(209,213,219,1)] h-[48px] w-[66px] "><IoMdShare /></div>
     </div>

    </div>



    </div>
    </div>
  );
}

export default Products;
