import React, { FC } from "react";
import Moment from 'react-moment'

interface AllOrdersProps {
    orders:any
    contracts:object
}
 
const AllOrders: FC<AllOrdersProps> = ({orders, contracts}) => {

    async function faucetMe() {
        await contracts.AVAX.methods.faucet('0xd297cE8dEb8507485aC353078a2035EAE3e1820B', '100000').send({from: '0xd297cE8dEb8507485aC353078a2035EAE3e1820B'})
        console.log(await contracts.AVAX.methods.balanceOf('0xd297cE8dEb8507485aC353078a2035EAE3e1820B').call())
        console.log(await contracts.AVAX.methods.totalSupply().call())
    }

    return ( 
        <div className="w-full bg-slate-900 h-[25rem] sm:h-72 rounded p-5">
            <div className="w-full text-3xl font-bold mb-3 text-white">All orders</div>
            <div className="flex flex-col sm:flex-row justify-between w-full h-80 sm:h-48 my-5">
                <div className="w-full sm:w-[48%] h-full text-white">
                    <div className="flex items-center w-full h-8 bg-red-500 font-bold text-xl px-2 rounded-t">Buy</div>
                    <div className="flex items-center w-full h-8 bg-black font-bold px-2">
                        <div className="w-1/4">Amount</div>    
                        <div className="w-1/4">Price</div>    
                        <div className="w-2/4">Date</div>
                    </div>
                    { orders.buy != false ? orders.buy.map((buyOrder:any, i:number) => 
                    <div key={i} className={`flex w-full h-6 bg-gray-800 px-2 font-semibold ${i % 2 == 0 && 'bg-gray-700'} ${i + 1 === orders.buy.length && 'rounded-b'}`}>
                        <div className="w-1/4">{buyOrder.price}</div>    
                        <div className="w-1/4">{buyOrder.amount}</div>    
                        <Moment className="w-2/4" fromNow>{parseInt(buyOrder.date) * 1000}</Moment>    
                    </div>
                    ) 
                    : 
                    <div className={`flex  w-full h-6 bg-gray-800 text-white px-1 rounded-b`}>
                    <div className="w-full text-center text-gray-400 font-semibold">No trades to display</div>    
                    </div>
                    }
                </div>
                <div className="w-full sm:w-[48%] h-full text-white">
                    <div 
                    className="flex items-center w-full h-8 bg-green-500 font-bold text-xl px-2  rounded-t"
                    onClick={() => faucetMe()}
                    >Sell</div>
                    <div className="flex items-center w-full h-8 bg-black font-bold px-2">
                        <div className="w-1/4">Amount</div>    
                        <div className="w-1/4">Price</div>    
                        <div className="w-2/4">Date</div>
                    </div>
                    { orders.sell != false ? orders.sell.map((sellOrder:any, i:number) => 
                    <div key={i} className={`flex w-full h-6 bg-gray-800 px-2 font-semibold ${i % 2 == 0 && 'bg-gray-700'} ${i + 1 == orders.sell.lenth && 'rounded-b'} ${i + 1 === orders.sell.length && 'rounded-b'}`}>
                        <div className="w-1/4">{sellOrder.price}</div>    
                        <div className="w-1/4">{sellOrder.amount}</div>    
                        <Moment className="w-2/4" fromNow>{parseInt(sellOrder.date) * 1000}</Moment>    
                    </div>
                    ) 
                    : 
                    <div className={`flex  w-full h-6 bg-gray-800 text-white px-1 rounded-b`}>
                    <div className="w-full text-center text-gray-400 font-semibold">No trades to display</div>    
                    </div>
                    }
                </div>
            </div>
        </div>
     );
}
 
export default AllOrders;