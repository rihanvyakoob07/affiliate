"use client"
import { createContext, useState } from "react";
import dataoutput from "../lib/data";
export const GlobalContext = createContext()

function GlobalContextprovider({children}) {
    const [data,setdata]=useState(dataoutput)
    return (
        <GlobalContext.Provider value={{data,setdata}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextprovider