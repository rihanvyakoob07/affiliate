"use client";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Dropdown = ({ onSelect }) => {
  const options = ["Select category", "Phone", "Laptop", "Gadgets","Clothes","Audio","Gaming","Watches",];
  const [selected, setSelected] = useState(options[0]);
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option); // Pass selected category to parent
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="inter font-[500] text-[14px] text-[rgba(55,65,81,1)]">
        Category
      </label>
      <div className="w-full flex items-center justify-between border rounded-[8px] h-[42px] px-2 border-gray-300 text-[16px] leading-[24px]">
        <div className="relative inline-block w-full">
          <button
            onClick={() => setOpen(!open)}
            className="w-full text-left"
          >
            {selected}
          </button>
          {open && (
            <ul className="absolute mt-2 bg-white border rounded-md shadow-lg w-full">
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
        <div className="h-[20px] w-[20px]">
          {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
