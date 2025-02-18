"use client";
import { useState } from "react";
import ProductDisplayCard from "../../cards/ProductDisplayCard"
import { IoIosArrowForward } from "react-icons/io";

const data =[{
    image:'',
    text:"Two Nozzle Bath Tub Jet Spa"
},
{
    image:'',
    text:"Wall Dispenser for Shower (Soap, Shampoo, Conditioner)"
},
{
    image:'',
    text:"Self Inflating Bed with Bedframe"
},
{
    image:'',
    text:"Automatic Soap Dispenser"
},
{
    image:'',
    text:"Novelty Chopsticks (Light Sabre, Fork Combo, Dinosaur)"
},
{
    image:'',
    text:"Multi Tool Pen Set"
},
{
    image:'',
    text:"Adjustable Measuring Cup"
},
{
    image:'',
    text:"Funny Dog Toy"
},
{
    image:'',
    text:"Two Nozzle Bath Tub Jet Spa"
},
{
    image:'',
    text:"Wall Dispenser for Shower (Soap, Shampoo, Conditioner)"
},
{
    image:'',
    text:"Self Inflating Bed with Bedframe"
},
{
    image:'',
    text:"Automatic Soap Dispenser"
},
{
    image:'',
    text:"Novelty Chopsticks (Light Sabre, Fork Combo, Dinosaur)"
},
{
    image:'',
    text:"Multi Tool Pen Set"
},
{
    image:'',
    text:"Adjustable Measuring Cup"
},
{
    image:'',
    text:"Funny Dog Toy"
},
{
    image:'',
    text:"Oscillating Long-Handle Massager"
},
{
    image:'',
    text:"Oscillating Long-Handle Massager"
},]
const ITEMS_PER_PAGE = 15;
function ProductDisplay() {

      const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

   // Get products for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);


    return (
        <div className="flex-center flex-col  pt-7 w-full">
             <div>
                    <p className="text-[rgba(255, 255, 255, 1)] text-[13px] leading-[18px] pt-[34px] text-center pb-[34px]">AS AN AMAZON ASSOCIATE I EARN FROM QUALIFYING PURCHASES.</p>
                </div>
            <div className="grid  max-w-[700px] gap-2 xl:w-[100%] grid-cols-1 sm:grid-cols-3 xl:grid-cols-3 ">
               
            {paginatedData.map((items,index)=>(
                  <ProductDisplayCard key={index} text={items.text} />
            ))}
           </div>
           <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`bg-[rgba(38,38,38,1)] flex-center gap-2  text-[rgba(243,243,243,1)] font-[700] text-[14px] leading-[20px] text-center h-[48px] mt-[20px] w-[150px] rounded-[7px] ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
          <IoIosArrowForward />
        </button>
            <p className="text-[rgba(255, 255, 255, 1)] text-[13px] leading-[18px] pt-[34px] text-center pb-[34px]">AS AN AMAZON ASSOCIATE I EARN FROM QUALIFYING PURCHASES.</p>
             <p className="text-[rgba(255, 255, 255, 0.74)] text-[10px] leading-[20px] pt-[34px] pb-[34px] font-[400] inter   ">ADVERTISEMENT</p>
               <p className="text-[rgba(255, 255, 255, 1)] font-[700] text-[40px] leading-[30px] mt-[104px] pb-[34px]    ">More about GiftGenius</p>
   <div className="max-w-[699.93px] flex flex-col gap-5 mb-[400px] p-5">
                  

                

                

                  <p className="text-[rgba(255, 255, 255, 1)] text-[17px] leading-[20px]  font-[400]  ">At GiftGenius, our mission is to help you find the perfect gift for your loved ones (or
              yourself) whether it's for a birthday, holiday, or special occasion.</p>

               <p className="text-[rgba(255, 255, 255, 1)] text-[17px] leading-[20px]  font-[400]  ">We scour the internet for the latest and greatest gadgets, and then provide
exclusive discount codes (when available) so you can get the best deal possible.</p>

               <p className="text-[rgba(255, 255, 255, 1)] text-[17px] leading-[20px]  font-[400]  ">Whether you're looking for the latest smart gadget, unique kitchen appliance, or
tools that can make life easier we've got you covered.</p>

               <p className="text-[rgba(255, 255, 255, 1)] text-[17px] leading-[20px]  font-[400]  ">So what are you waiting for? Start browsing our website today and find the
perfect gift for that special someone in your life.</p>
</div>
        </div>
    )
}

export default ProductDisplay