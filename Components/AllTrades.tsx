import React, { FC } from "react";

interface AllTradesProps {
    
}
 
const AllTrades: FC<AllTradesProps> = () => {
    return ( 
        <div className="w-full bg-slate-600 h-[30rem] rounded p-7">
            <div className="w-full text-3xl font-bold mb-3">All trades</div>
                <div className="w-full h-56 bg-black my-5"></div>
                <div className="w-full h-32 bg-white"></div>
        </div>
     );
}
 
export default AllTrades;