import { FC } from "react";
import Moment from 'react-moment'

interface MyOrdersProps {
    orders:any
}
 
const MyOrders: FC<MyOrdersProps> = ({orders}) => {
    return ( 
        <div className="w-full bg-slate-900 h-72 rounded p-5">
            <div className="w-full text-3xl font-bold mb-3 text-white">My orders</div>
            <div className="flex flex-col w-full h-48  overflow-auto my-5">
            <div className="flex items-center w-full h-8 bg-black font-bold px-2 rounded-t">
                        <div className="w-1/4 text-white">Amount</div>    
                        <div className="w-1/4 text-white">Price</div>    
                        <div className="w-2/4 text-white">Date</div>
                    </div>
            { orders.buy != false ? orders.buy.map((buyOrder:any, i:number) => 
                    <div key={i} className={`flex w-full h-6 bg-gray-800 text-white px-2 font-semibold ${i % 2 == 0 && 'bg-gray-700'}`}>
                        <div className="w-1/4">{buyOrder.amount}</div>    
                        <div className="w-1/4">{buyOrder.price}</div>    
                        <Moment className="w-2/4" fromNow>{parseInt(buyOrder.date) * 1000}</Moment>    
                    </div>
                    ) 
                    : 
                    <div className={`flex  w-full h-6 bg-gray-800 text-white px-1 rounded-b`}>
                    <div className="w-full text-center text-gray-400 font-semibold">No trades to display</div>    
                    </div>
                    }
            </div>
        </div>
     );
}
 
export default MyOrders;