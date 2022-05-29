import React, { FC, useState } from "react";

interface NewOrderProps {
  user:any
  createMarketOrder:any
  createLimitOrder:any
}

const SIDE = {
  BUY: 0,
  SELL: 1
};

const NewOrder: FC <NewOrderProps> = ({createMarketOrder, createLimitOrder, user}) => {

    const [amount, setAmount] = useState('')
    const [price, setPrice] = useState('')
    const [orderType, setOrderType] = useState('LIMIT')
    const [side, setSide] = useState(SIDE.BUY)
    const [order, setOrder] = useState({
      type: orderType,
      side: side,
      amount: '',
      price: ''
    });

    const onSubmit = (e:any) => {
      orderType != 'MARKET' && document.getElementById('price').setAttribute('required', 'required')
      e.preventDefault();
      setOrder({
        type: orderType,
        side: side,
        amount: amount,
        price: price
      })
      if(orderType === 'MARKET') {
        createMarketOrder(order.amount, order.side);
      } else {
        createLimitOrder(order.amount, order.price, order.side);
      }
    }

    return ( 
        <div className="w-full bg-slate-900 h-[27rem] p-6 rounded text-white">
      <div className="w-full text-3xl font-bold my-3">New Order</div>
        <div className="flex items-center justify-between w-full my-3 mt-10">
          <div className="w-1/4 font-bold text-gray-400">TYPE:</div>
          <div className="flex w-2/4 h-10 bg-slate-700 rounded p-[0.15rem]">
            <button className={`${'flex w-1/2 items-center justify-center rounded duration-300 text-white font-semibold'} ${orderType === 'LIMIT' && 'bg-slate-500 duration-300'} `} onClick={() => setOrderType('LIMIT')} >Limit</button>
            <button className={`${'flex w-1/2 items-center justify-center rounded duration-300 text-white font-semibold'} ${orderType === 'MARKET' && 'bg-slate-500 duration-300'} `} onClick={() => setOrderType('MARKET')} >Market</button>
          </div>
        </div>
        <div className="flex items-center justify-between w-full my-3">
          <div className="w-1/4 font-bold text-gray-400">SIDE:</div>
          <div className="flex w-2/4 h-10 bg-slate-700 rounded p-[0.15rem]">
              <button className={`${'flex w-1/2 items-center justify-center rounded duration-300 text-white font-semibold'} ${side == SIDE.BUY && 'bg-slate-500 duration-300'} `} onClick={() => setSide(SIDE.BUY)}>Buy</button>
              <button className={`${'flex w-1/2 items-center justify-center rounded duration-300 text-white font-semibold'} ${side == SIDE.SELL && 'bg-slate-500 duration-300'} `} onClick={() => setSide(SIDE.SELL)}>Sell</button>
          </div>
        </div>
        <form
        onSubmit={(e) => onSubmit(e)}
        >
          <div className="flex items-center justify-between w-full my-3">
            <div className="w-1/4 font-bold text-gray-400">AMOUNT:</div>
            <input 
            required
            type='text'
            className="w-2/4 h-10 bg-slate-700 rounded p-2 text-white font-semibold focus:outline-none"
            onChange={(e) => setAmount(e.target.value)}
            ></input>
          </div>
          <div className="flex items-center justify-between w-full my-3">
            <div className="w-1/4 font-bold text-gray-400">PRICE:</div>
            <input
            id='price'
            type='text'
            className="w-2/4 h-10 bg-slate-700 rounded p-2 text-white font-semibold focus:outline-none"
            onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>
          <div className="relative w-full my-10">
            <button 
            type='submit' 
            className='bg-slate-800 h-12 w-24 text-white rounded absolute right-0 hover:bg-slate-700 duration-200 font-bold'
            onClick={() => orderType == 'MARKET' && document.getElementById('price').removeAttribute('required')}
            >SUBMIT
            </button>
          </div>
        </form>
      </div>
     );
}
 
export default NewOrder;