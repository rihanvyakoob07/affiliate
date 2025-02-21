"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 300 },
  { name: "Mar", sales: 500 },
  { name: "Apr", sales: 700 },
  { name: "May", sales: 600 },
   { name: "nov", sales: 700 },
  { name: "dec", sales: 600 },
];

const Graph = () => {
  return (
    <div className="w-full h-full ">
      {/* <h2 className="text-lg font-bold mb-4">Monthly Sales</h2> */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          {/* <XAxis dataKey="name" /> */}
          {/* <YAxis /> */}
          {/* <Tooltip /> */}
          <Bar dataKey="sales" fill="rgba(59,130,246,1)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
