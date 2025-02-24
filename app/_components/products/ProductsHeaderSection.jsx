"use client";
import axios from "axios";
import { IoPhonePortrait } from "react-icons/io5";
import { MdComputer } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { MdHeadset } from "react-icons/md";
import { FaGamepad } from "react-icons/fa6";
import { CiCircleQuestion } from "react-icons/ci";

import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/app/context/GobalContext";
import FilterProducts from "../cards/FilterProducts";
import AddProducts from "../cards/AddProducts";


function ProductsHeaderSection() {
  
const {data,setdata,cart,setCart}=useContext(GlobalContext)
const [selectedCategory, setSelectedCategory] = useState("all");

  const [visibleCount, setVisibleCount] = useState(10); // Start with 20 products

const filteredProducts =
    selectedCategory === "all"
      ? data
      : data.filter((el) => el.category.toLowerCase() === selectedCategory.toLowerCase());

  // Slice the data to show only the required number of products
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  // Function to load more products
  const loadMoreProducts = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };


  const addCart = (product) => {
  const check = cart.some((el) => el.id === product.id);
  console.log(cart);

  if (cart.length > 0 && check) {
    const result = cart.map((items) => {
      if (items.id === product.id) {
        return {
          ...items,
          quantity: (items.quantity || 1) + 1, // Ensure quantity is at least 1
          totalPrice: (items.price || 0) * ((items.quantity || 1) + 1), // Prevent NaN
        };
      }
      return items;
    });
    setCart(result);
  } else {
    setCart([
      ...cart,
      {
        ...product,
        quantity: 1, // Initialize quantity
        totalPrice: product.price || 0, // Ensure totalPrice is not NaN
      },
    ]);
  }
};

 


    


    return (
    <div className="bg-white w-full flex-col flex-center py-5">



    <div className="border-[rgba(229, 231, 235, 1)] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]  border flex items-center justify-around border-[1px] border-[rgba(229,231,235,1)] max-w-[1280px] h-[132px] w-[100%] md:w-[90%] xl:w-[100%]">
    <FilterProducts onclink={() => setSelectedCategory("Phone")} text='Phones' icon={<IoPhonePortrait />} />
    <FilterProducts onclink={() => setSelectedCategory("Laptop")} text='Gadgets' icon={<MdComputer />} />
    <FilterProducts onclink={() => setSelectedCategory("Clothes")} text='Clothing' icon={<GiClothes />} />
    <FilterProducts onclink={() => setSelectedCategory("Audio")} text='Audio' icon={<MdHeadset />} />
    <FilterProducts onclink={() => setSelectedCategory("Gaming")} text='Gaming' icon={<FaGamepad />} />
    <FilterProducts onclink={() => setSelectedCategory("Watches")} text='Watches' icon={<CiCircleQuestion />} />
    </div>

    <div className="grid py-5 grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-4 ">
      {visibleProducts.length > 0 ? (
          visibleProducts.map((item, index) => (
            <AddProducts
              key={index}
              linkUrl={`/individualproducts/${item.id}`}
              price={item.price}
              text={item.name}
              imageUrl={item.image}
              onclick={() => addCart(item)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        )}
    </div>

    
     {visibleCount < filteredProducts.length && (
        <button
          onClick={loadMoreProducts}
          className="bg-blue-600 text-white text-center font-medium text-lg w-[217.2px] rounded-lg border border-gray-300 h-[48px] hover:bg-blue-700 transition duration-300"
        >
          Load More Products
        </button>
      )}
</div>
    )
}

export default ProductsHeaderSection