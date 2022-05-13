import { FC } from "react";
import Moment from 'react-moment'

interface MyOrdersProps {
    orders:any
}
 
const MyOrders: FC<MyOrdersProps> = ({orders}) => {
    return ( 
        <div className="w-full bg-slate-600 h-72 rounded p-5">
            <div className="w-full text-3xl font-bold mb-3">My orders</div>
            <div className="flex justify-between w-full h-48 bg-slate-500 my-5">
            { orders && orders.buy.map((buyOrder:any, i:number) => 
                    <div key={i} className={`flex w-full h-6 bg-gray-500 ${i % 2 == 0 && 'bg-gray-400'}`}>
                        <div className="w-1/3">{buyOrder.amount}</div>    
                        <div className="w-1/3">{buyOrder.price}</div>    
                        <Moment className="w-1/3" fromNow>{parseInt(buyOrder.date) * 1000}</Moment>    
                    </div>
                    )}
            </div>
        </div>
     );
}
 
export default MyOrders;