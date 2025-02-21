"use client";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const Dropdown = () => {
  const options = ["Select category", "phone", "Laptop", "Gagets"];
  const [selected, setSelected] = useState(options[0]);
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false); // Close dropdown after selecting an option
  };

  return (

    <div className="flex flex-col gap-1 ">
    <label className="inter font-[500] text-[14px] text-[16.94px] text-[rgba(55,65,81,1)] ">Category</label>
    <div className="w-full flex items-center justify-between font-[400] inter text-[rgba(0,0,0,1)] border rounded-[8px] h-[42px] px-2 border-[rgba(209,213,219,1)] text-[16px] leading-[24px]">

    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className=" "
      >
         {selected}
      </button>
      {open && (
        <ul className="absolute mt-2 bg-white border rounded-md shadow-lg w-40">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>

    <div className="h-[20px] w-[20px] ">
       
        {open ? <IoIosArrowUp /> :  <IoIosArrowDown /> }
    </div>

    </div>
    
</div>
  );
};

export default Dropdown;
