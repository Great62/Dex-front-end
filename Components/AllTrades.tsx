import React, { FC } from "react";
import Moment from 'react-moment'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

interface AllTradesProps {
    trades:any
    user:any
}
 
const AllTrades: FC<AllTradesProps> = ({trades, user}) => {

    const renderChart = (trades:object[]) => {
        return (
          <ResponsiveContainer width="100%" height={200}>
          <LineChart data={trades}>
            <Line type="monotone" dataKey="price" stroke="#741cd7" />
            <CartesianGrid stroke="#505050" />
            <XAxis dataKey="date" tickFormatter={dateStr => {
              const date = new Date(parseInt(dateStr) * 1000); 
              return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            }} />
            <YAxis dataKey="price" />
          </LineChart>
          </ResponsiveContainer>
        );
      }

    return ( 
        <div className="w-full bg-gray-900 h-[30rem] rounded p-7">
            <div className="w-full text-3xl font-bold mb-3 text-white">All trades</div>
                <div className="flex items-center w-full h-56 my-5">
                {trades == false ? <div className="w-full text-center text-white"> Please log in to Metamask to see trades or select another token</div> : renderChart(trades)}
                </div>
                <div className="w-full h-32 overflow-auto scrollbar">
                    <div className="flex items-center w-full h-8 bg-black text-white font-bold px-2 rounded-t">
                            <div className="w-1/4">Amount</div>    
                            <div className="w-1/4">Price</div>    
                            <div className="w-2/4">Date</div>
                        </div>
                    { trades != false ? trades.map((trade:any, i:number) => 
                        <div key={i} className={`flex w-full h-6 bg-gray-800 text-white px-2 font-semibold ${i % 2 == 0 && 'bg-gray-700'}`}>
                            <div className="w-1/4">{trade.amount}</div>    
                            <div className="w-1/4">{trade.price}</div>    
                            <Moment className="w-2/4" fromNow>{parseInt(trade.date) * 1000}</Moment>    
                        </div>
                        ) 
                        : 
                        <div className={`flex  w-full h-6 bg-gray-800 text-white px-1 rounded-b`}>
                        <div className="w-full text-center text-gray-400 font-semibold">No trades to display</div>    
                    </div>}
                </div>
        </div>
     );
}
 
export default AllTrades;