"use client"
import axios from 'axios';
import { createContext, useEffect, useState } from "react";
import dataoutput from "../lib/data";
export const GlobalContext = createContext()

function GlobalContextprovider({children}) {
    const [data,setdata] = useState([]); 
    const [cart,setCart]=useState([])
    const [clicked,setclicked]=useState(false)
  const [cartItems,setCartitems] =useState(false)
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products");
    setdata(response.data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
    return (
        <GlobalContext.Provider value={{data,setdata,cart,setCart,cartItems,setCartitems}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextprovider