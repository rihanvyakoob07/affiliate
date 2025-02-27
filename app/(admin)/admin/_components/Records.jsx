"use client";
import axios from "axios";
import RecordCard from "./cards/RecordCard"
import { IoMdContacts } from "react-icons/io";
import { FaChartSimple } from "react-icons/fa6";
import { FaLink } from "react-icons/fa6";
import { FaBox } from "react-icons/fa";
import Input from "./Input";
import Dropdown from "./cards/DropDown";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FiImage } from "react-icons/fi";
import { LuUpload } from "react-icons/lu";
import Graph from "./Graph";
import { useEffect, useState } from "react";
import Image from "next/image";



const baseUrl = "http://localhost:3001";
function Records() {
const Recordvalue =[{
    purpose :'Total Visitors',
    total:'2,847',
    icon:<IoMdContacts />,
    time:'12% from yesterday',
    width:'w-[20px]',
    color:'text-[rgba(59,130,246,1)]'

},
{
    purpose :'Total Visitors',
    total:'2,847',
    icon:<FaBox />,
    time:'12% from yesterday',
    width:'w-[20px]',
    color:'text-[rgba(168,85,247,1)]'
    
},
{
    purpose :'Total Products',
    total:'156',
    icon:<FaLink  />,
    time:'3 new today',
    width:'w-[18.89px]',
    color:'text-[rgba(234,179,8,1)]'
    
},
{
    purpose :'Active Links',
    total:'43',
    icon:<FaChartSimple />,
    time:'Total active links',
    width:'w-[20px]',
    color:'text-[rgba(34,197,94,1)]'
    
},
]


// axios


 const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState("");

  // const [image, setImage] = useState(null); 

  


   const [image, setImage] = useState(null);

  

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("price", price);
      formData.append("url", url);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("image", image); // Image upload

      const response = await axios.post("http://localhost:3001/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPreview(false)
      // productName('')
      // setPrice('')
      //  setUrl('')
      //  setCategory('')
      //  setDescription('')
      console.log("Product added successfully:", response.data);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Only image files (jpg, jpeg, png, gif) are allowed or url cant be empty");
    }
  };

 const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);
    return (
        <div className="w-full ">
        <div className="my-5 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4 max-w-[1120px]  ">
            {Recordvalue.map((records,index)=>(
          <RecordCard key={index} icon={records.icon} propose={records.purpose} width={records.width} color={records.color} total={records.total} time={records.time}  />
            ))}
    
        </div>

        {/* uploads */}

        <div className="bg-[rgba(255,255,255,1)] h-fit sm:h-[604px] p-5 max-w-[1128px] rounded-[8px] border border-[rgba(229,231,235,1)] my-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]  grid grid-cols-1 sm:grid-cols-2 gap-9 sm:gap-10  ">
         <div className="flex flex-col gap-2">
            <p className="text-[rgba(0,0,0,1)] inter font-[600] text-[18px] leading-[21.78px] ">Add New Product</p>
            <div className="flex flex-col  gap-2">
                <Input onchange={(e)=>setProductName(e.target.value)} label='Product Name' placeholder='Enter product name' />
                 <Input onchange={(e)=>setPrice(e.target.value)} label='Price' placeholder='Enter price' />
                  <Dropdown onSelect={setCategory} />
                  <Input onchange={(e)=>setUrl(e.target.value)} label='URL' placeholder='Enter URL' />
                  <div>
                    
                    <div className="flex flex-col gap-1">
                    <label className="inter font-[500] text-[14px] text-[16.94px] text-[rgba(55,65,81,1)] ">
                           Description
                    </label>
                    <textarea onChange={(e)=> setDescription(e.target.value)} className="font-[400] inter placeholder-[rgba(173,174,188,1)] border rounded-[8px] h-[90px] px-2 border-[rgba(209,213,219,1)] text-[16px] leading-[24px] " placeholder='Enter product description'>

                    </textarea>
                </div>
                </div>

            </div>
         </div>

   {/* 2 */}


          <div className="flex flex-col gap-8 sm:gap-0 h-full justify-between ">
           <div className="flex flex-col gap-6">
          <div className="w-full h-[330px] bg-[rgba(217,217,217,1)] flex justify-center items-center overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <LuUpload className="text-4xl text-gray-500" />
                <p className="text-gray-500">Upload Image</p>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
        </div>


               <div className="flex items-center gap-4">
                <div className="h-[80px] sm:h-[133px] w-full bg-[rgba(217,217,217,1)] flex-center ">
                     {/* <input onchange={(e)=> setimagetwo(e.target.value)} type='file' /> */}
                     <FiImage  /></div>
                <div className="h-[80px] sm:h-[133px] w-full bg-[rgba(217,217,217,1)] flex-center ">
                     {/* <input onchange={(e)=> setimagethree(e.target.value)} type='file' /> */}
                     <FiImage  /></div>
                <div className="h-[80px] sm:h-[133px] w-full bg-[rgba(217,217,217,1)] flex-center ">
                     {/* <input onchange={(e)=> setimagefour(e.target.value)} type='file' /> */}
                     <FiImage  /></div>
               </div>
            
          </div>


          {/* 3 */}

          <div className="w-full  sm:col-span-2 flex-center ">

            <div onClick={handleSubmit} className="bg-[rgba(147,51,234,1)] active:bg-[rgb(186,130,239)] text-[rgba(255,255,255,1)] inter text-center leading-[19.36px] text-[16px] font-[400] flex-center rounded-[8px] h-[40px] w-[506px] ">Add Link</div>

          </div>

        </div>


        {/* graps */}

        <div className='max-w-[1120px] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]  flex flex-col justify-between p-8 h-[512px]  h-[512px] xl:w-[100%] rounded-[8px] border border-[rgba(229,231,235,1)] bg-[rgba(255,255,255,1)]'>
            
            <div className="w-full h-fit gap-2 sm:gap-0 sm:h-[40px] flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p className=" leading-[18px] text-[rgba(0,0,0,1)] inter text-[18px] font-[700] ">Visitor Analytics</p>
                <div className="flex text-[rgba(0,0,0,1)] font-[400] inter leading-[19.36px] text-[16px] items-center gap-1 border border-[rgba(229,231,235,1)] p-3 ">
                   <p>Last 7 days</p>
                   <IoIosArrowDown />
                </div>
            </div>

            <div className="w-full h-[400px] rounded-[4px] bg-[rgba(249,250,251,1)] border border-[rgba(229,231,235,1)]  ">
                <Graph />
            </div>

        </div>
        
        </div>
    )
}

export default Records