"use client";
import { useState } from "react";
import ProductDisplayCard from "../../cards/ProductDisplayCard"
import { IoIosArrowForward } from "react-icons/io";

const data =[{
    image:'https://images.woodbridgebath.com/Data/upload/20221020/20221020115625W5OMVZV1.jpg',
    text:"Two Nozzle Bath Tub Jet Spa"
},
{
    image:'https://media.e-valy.com/cms/products/images/3bfb0e39-447c-417c-ab63-161e2afc4d2f',
    text:"Wall Dispenser for Shower (Soap, Shampoo, Conditioner)"
},
{
    image:'https://i5.walmartimages.com/seo/CoCopeaunts-new-Embroidered-Messenger-Bags-Women-Leather-Handbags-Hand-Bags-for-Women-Sac-a-Main-Ladies-Hand-Bag-Female-bag-sac-femme_934c9131-d115-4666-b416-8655d70b1198.4e27af0d08f935fc1148430cec95659a.jpeg',
    text:"Self Inflating Bed with Bedframe"
},
{
    image:'https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-16-Pro/Desert-Titanium/Apple-iPhone-16-Pro-Desert-Titanium-thumbnail.png',
    text:"Automatic Soap Dispenser"
},
{
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL6g9z8_d7xPbNa-SU5tF82hLJZFHJ6Wyyqw&s',
    text:"Novelty Chopsticks (Light Sabre, Fork Combo, Dinosaur)"
},
{
    image:'https://i5.walmartimages.com/seo/Owlet-Dream-Duo-Smart-Portable-Video-Baby-Monitor-HD-Video-Camera-Sock-With-Heart-Rate-AVG-Oxygen-Tracker-Dusty-Rose_779a87bd-6051-4327-83ca-5c2783354a0d.4961f3af62007d6901538da85fe0ce70.png',
    text:"Multi Tool Pen Set"
},
{
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwUmgrrAZGFX6s6rUdnRzGRJw7VsmwXxqiWg&s',
    text:"Adjustable Measuring Cup"
},
{
    image:'https://fil.com.ng/wp-content/uploads/2024/10/gfdsdf.jpg',
    text:"Funny Dog Toy"
},
{
    image:'https://media-cdn.tripadvisor.com/media/photo-s/27/3c/ef/6f/the-authentic-venetian.jpg',
    text:"Two Nozzle Bath Tub Jet Spa"
},
{
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHVr8mBaqdaSryJgeUuiylnqkikbMG7pfvJQ&s',
    text:"Wall Dispenser for Shower (Soap, Shampoo, Conditioner)"
},
{
    image:'https://cartnear.s3.us-east-2.amazonaws.com/ng/897d804aebfa7cce4a9ae94713cbd73b.jpg',
    text:"Self Inflating Bed with Bedframe"
},
{
    image:'https://m.media-amazon.com/images/I/61uaZ1o2teL._AC_UY350_.jpg',
    text:"Automatic Soap Dispenser"
},
{
    image:'https://i0.wp.com/nextcashandcarry.com.ng/wp-content/uploads/2022/04/305708202_5641052719293758_1685287744922332558_n.jpg?fit=450%2C450&ssl=1',
    text:"Novelty Chopsticks (Light Sabre, Fork Combo, Dinosaur)"
},
{
    image:'https://mengotticouture.com/wp-content/uploads/2023/03/sdm-wd3320tg-01.jpg',
    text:"Multi Tool Pen Set"
},
{
    image:'https://assets.easycallsales.com.ng/products/hisense-showcase-fri1726829375.png',
    text:"Adjustable Measuring Cup"
},
{
    image:'https://oshilolo.com/wp-content/uploads/2022/07/Bosch-250-liter-Double-Door-Fride-with-Top-Mount-Freezer-KDN25NL2N5-1.png',
    text:"Funny Dog Toy"
},
{
    image:'https://images.newscientist.com/wp-content/uploads/2022/04/12175635/sei90094132.jpg?crop=16:9,smart&width=1200&height=675&upscale=true',
    text:"Oscillating Long-Handle Massager"
},
{
    image:'https://images.woodbridgebath.com/Data/upload/20230221/20230221154953W5OMVZV1.jpg',
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
            <div className="grid  max-w-[700px] gap-4 xl:w-[100%] grid-cols-1 sm:grid-cols-3 xl:grid-cols-3 ">
               
            {paginatedData.map((items,index)=>(
                  <ProductDisplayCard key={index} imageUrl={items.image} text={items.text} />
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
               <p className="text-[rgba(255, 255, 255, 1)] font-[700] text-[30px] sm:text-[40px] leading-[30px] mt-[104px] pb-[34px]    ">More about GiftGenius</p>
   <div className="max-w-[699.93px] flex flex-col gap-5 mb-[200px] p-5">
                  

                

                

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