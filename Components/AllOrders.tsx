import React, { FC } from "react";
import Moment from 'react-moment'

interface AllOrdersProps {
    orders:any
}
 
const AllOrders: FC<AllOrdersProps> = ({orders}) => {
    return ( 
        <div className="w-full bg-slate-600 h-72 rounded p-5">
            <div className="w-full text-3xl font-bold mb-3">All orders</div>
            <div className="flex justify-between w-full h-48 my-5">
                <div className="w-[47%] h-full text-white">
                    <div className="flex items-center w-full h-8 bg-red-500 font-bold text-xl px-2">Buy</div>
                    <div className="flex items-center w-full h-8 bg-black font-bold px-2">
                        <div className="w-1/3">Amount</div>    
                        <div className="w-1/3">Price</div>    
                        <div className="w-1/3">Date</div>
                    </div>
                    { orders && orders.buy.map((buyOrder:any, i:number) => 
                    <div key={i} className={`flex w-full h-6 bg-gray-500 ${i % 2 == 0 && 'bg-gray-400'}`}>
                        <div className="w-1/3">{buyOrder.amount}</div>    
                        <div className="w-1/3">{buyOrder.price}</div>    
                        <Moment className="w-1/3" fromNow>{parseInt(buyOrder.date) * 1000}</Moment>    
                    </div>
                    )}
                </div>
                <div className="w-[47%] h-full text-white">
                    <div className="flex items-center w-full h-8 bg-green-500 font-bold text-xl px-2">Sell</div>
                    <div className="flex items-center w-full h-8 bg-black font-bold px-2">
                        <div className="w-1/3">Amount</div>    
                        <div className="w-1/3">Price</div>    
                        <div className="w-1/3">Date</div>
                    </div>
                    { orders && orders.sell.map((sellOrder:any, i:number) => 
                    <div key={i} className={`flex w-full h-6 bg-gray-500 ${i % 2 == 0 && 'bg-gray-400'}`}>
                        <div className="w-1/3">{sellOrder.amount}</div>    
                        <div className="w-1/3">{sellOrder.price}</div>    
                        <Moment className="w-1/3" fromNow>{parseInt(sellOrder.date) * 1000}</Moment>    
                    </div>
                    )}
                </div>
            </div>
        </div>
     );
}
 
export default AllOrders;