
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Sidebar from "./admin/_components/Sidebar";
import AdminGlobalContextprovider from "./AdminGlobalContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AdminGlobalContextprovider>
        <div className="flex">
            <div className="w-[220px] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]  sm:w-[256px] h-screen border border-[rgba(229,231,235,1)] bg-[rgba(255,255,255,1)] ">
               <Sidebar  />
            </div>
       
           <div className="w-full p-3 sm:p-8 bg-[rgba(229,231,235,1)] h-screen overflow-y-scroll"> 
              
               <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
               {children}
               </div>
          </div>
        
      
        </div>


        
     </AdminGlobalContextprovider>
      </body>
    </html>
  );
}
