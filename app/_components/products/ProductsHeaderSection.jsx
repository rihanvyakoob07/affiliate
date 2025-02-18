import { CiHeart } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { IoPhonePortrait } from "react-icons/io5";
import { MdComputer } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { MdHeadset } from "react-icons/md";
import { FaGamepad } from "react-icons/fa6";
import { CiCircleQuestion } from "react-icons/ci";
import Link from "next/link";
import FilterProducts from "../cards/FilterProducts";
import AddProducts from "../cards/AddProducts";


function ProductsHeaderSection() {

    const data =[{
    image:'https://s.alicdn.com/@sc04/kf/Hbb4eb8a0be1542d58b72e6a37310b0c7r.jpg_300x300.jpg',
    text:"Smartphone Pro Max",
    price:200
},
{
    image:'https://i5.walmartimages.com/seo/HP-15-6-Screen-FHD-Laptop-Computer-AMD-Ryzen-5-5500U-8GB-RAM-256GB-SSD-Spruce-Blue-Windows-11-Home-15-ef2729wm_8dee5689-db47-45ac-9a0d-5399c95a8ee0.ad15a381ad98aa369a68bfb1527d66a9.jpeg',
    text:"Wireless Earbuds",
     price:200
},
{
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXGanr6OV8rDDJbSY3vVD23SAQu8untqkfag&s',
    text:"Smart Watch Elite",
     price:200
},
{
    image:'https://i0.wp.com/www.afrocritik.com/wp-content/uploads/2024/02/Thrifts.jpg?fit=723%2C424&ssl=1',
    text:"Denim Jacket",
     price:200
},
{
    image:'https://ik.imagekit.io/anscommerce/image/tr:e-usm-2-2-0.8-0.024,dpr-3,h-228,w-228,q-85,cm-pad_resize/data/philips/28jun2024/NA130.jpg',
    text:"Gaming Controller",
     price:200
},
{
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWMgOLyU-jzn26Yqvu6tzDkNlU2VXP9gIDZQ&s',
    text:"Multi Tool Pen Set",
     price:200
},
{
    image:'https://target.scene7.com/is/image/Target/GUEST_dc0de3dd-a305-4c49-9519-0ede9ff6d042',
    text:"Adjustable Measuring Cup",
     price:200
},
{
    image:'https://images.hindustantimes.com/img/2024/07/04/550x309/MixCollage-04-Jul-2024-03-45-PM-2214_1720088389294_1720088396476.jpg',
    text:"Funny Dog Toy",
     price:200
},
{
    image:'https://asset20.ckassets.com/blog/wp-content/uploads/sites/5/2021/12/How-to-Save-Money-on-Home-Appliances-in-India.jpg',
    text:"Two Nozzle Bath Tub Jet Spa",
     price:200
},
{
    image:'https://www.joegraham.co.uk/media/mageplaza/blog/post/e/n/energy-efficient-appliances.png',
    text:"Gaming Controller",
     price:200
},
{
    image:'https://s.alicdn.com/@sc04/kf/Hbb4eb8a0be1542d58b72e6a37310b0c7r.jpg_300x300.jpg',
    text:"Gaming Controller",
     price:200
},
{
    image:'https://i5.walmartimages.com/seo/Aursear-3-PCS-Pink-School-Backpacks-Set-for-Girls-Kids-School-Bookbag-Girls-School-Bags-Gifts_387bc0d6-cbed-4b4b-b10c-fc53cc5f9c57.6f4f04e9adb4b2d18ed46d4dd445e94d.jpeg',
    text:"Automatic Soap Dispenser",
     price:200
},
{
    image:'https://www.livemint.com/lm-img/img/2024/12/06/600x338/Kitchen_Appliances_1733468549152_1733468558787.jpeg',
    text:"Gaming Controller",
     price:200
},
{
    image:'https://static.wixstatic.com/media/81c1ae_d394c9f2f9c74d25a12d28d64d13b920~mv2.jpg/v1/fill/w_640,h_1142,al_c,q_85,usm_1.20_1.00_0.01,enc_avif,quality_auto/81c1ae_d394c9f2f9c74d25a12d28d64d13b920~mv2.jpg',
    text:"Multi Tool Pen Set",
     price:200
},
{
    image:'https://www.sweetandsavorybyshinee.com/wp-content/uploads/2020/10/Favorite-Small-Kitchen-Appliances-2.jpg',
    text:"Adjustable Measuring Cup",
     price:200
},
{
    image:'https://vsonic.ng/wp-content/uploads/2024/06/tim-welsh-vkk7WYPloDY-unsplash-1067x800.jpg',
    text:"Funny Dog Toy",
     price:200
},
{
    image:'https://s3.eu-west-2.amazonaws.com/selloffng/uploads/blog/202308/img_64e785a798a037-26280158-15565490.jpg',
    text:"Oscillating ",
     price:200
},
{
    image:'https://www.howardselectrical.co.uk/media/mageplaza/blog/post/k/i/kitchen-appliances-history-evolution.jpg',
    text:"Gaming Controller",
     price:200
},]

    return (
        <div className="bg-white w-full flex-col flex-center py-5">
<div className="bg-white w-full flex my-5 items-center justify-around text-[rgb(89,90,92)]"> 
    
    <Link href='/'><div className="h-[32px] w-[32px] bg-black">1</div></Link>

    <div className="max-w-[768px] px-3  flex items-center justify-between h-[44px] border-[1px] rounded-[10px] border-[rgba(229,231,235,1)] sm:w-[80%] xl:w-[100%] ">
        <input  type="text" placeholder="Search for products, brands, and more..." className="w-[80%] outline-none" />

        <CiSearch />
    </div>

    <div className="flex items-center gap-2">
        <div className="relative text-[20px] "> 
            <CiHeart />
        <div className="absolute w-[16px] rounded-full h-[16px] border-[rgba(229,231,235,1)] border-[1px] bg-[rgba(239,68,68,1)] right-[-7px] top-[-5px] flex-center ">
            <p className="inter text-[rgba(255,255,255,1)] font-[400] text-[12px] leading-[14.52px] ">3</p>
        </div>
        </div>
       
        <BsPerson />
    </div>
</div>


    <div className="bg-[rgba(229,231,235,1)] flex items-center justify-around border-[1px] border-[rgba(229,231,235,1)] max-w-[1280px] h-[132px] md:w-[90%] xl:w-[100%]">
    <FilterProducts text='Phones' icon={<IoPhonePortrait />} />
    <FilterProducts text='Gadgets' icon={<MdComputer />} />
    <FilterProducts text='Clothing' icon={<GiClothes />} />
    <FilterProducts text='Audio' icon={<MdHeadset />} />
    <FilterProducts text='Gaming' icon={<FaGamepad />} />
    <FilterProducts text='Watches' icon={<CiCircleQuestion />} />
    </div>

    <div className="grid py-5 grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-4 ">
        {data.map((items,index)=>(
            <AddProducts key={index} price={items.price} text={items.text} imageUrl={items.image} />
        ))}
    </div>

    <button className="bg-[rgba(37,99,235,1)] inter text-[rgba(255,255,255,1)] text-center font-[400] text-[16px] leading-[19.36px] w-[217.2px] rounded-[8px] border-[1px] h-[48px] border-[rgba(229,231,235,1)] ">Load More Products</button>
</div>
    )
}

export default ProductsHeaderSection