import React, { FC, useState } from 'react'

interface WalletProps {
  deposit:any
  withdraw:any
  user:any
  activeMenuItem:any
}

const DIRECTION = {
  WITHDRAW: 'withdraw',
  DEPOSIT: 'deposit'
};

const Wallet: FC<WalletProps> = ({deposit, withdraw, user, activeMenuItem}) => {
  const [actionDirection, setActionDirection] = useState(DIRECTION.DEPOSIT)
  const [amount, setAmount] = useState(0);

  const onSubmit = (e:any) => {
    e.preventDefault();
    if(actionDirection === DIRECTION.DEPOSIT && amount > 0) {
      deposit(amount);
    } else if (DIRECTION.WITHDRAW && amount > 0) {
      withdraw(amount);
    }
    else {
      console.log('Cannot deposit a negative value')
    }
  }

  return (
    <div className="w-full bg-slate-300 h-[27rem] p-6 rounded min-w-[19rem]">
      <div className="w-full text-3xl font-bold mb-3">Wallet</div>
      <div className="w-full text-2xl font-bold my-4">Token Balance for {activeMenuItem}</div>
      <div className="flex w-full my-3"> 
        <div className="w-1/3">Wallet</div>
        <div className="w-1/3">{user.balances.tokenWallet}</div>
      </div>
      <div className="flex w-full my-3">
        <div className="w-1/3">Dex</div>
        <div className="w-1/3">{user.balances.tokenDex} </div>
      </div>
      <div className="w-full text-2xl font-bold my-3">Transfer {activeMenuItem}</div>
      <div className="flex items-center justify-between w-full my-3">
        <div className="w-1/4">Direction</div>
        <div className="flex w-2/4 bg-slate-600 rounded h-10 p-[0.15rem] min-w-[10rem]">
            <button className={`${'flex w-1/2 items-center justify-center rounded duration-300 text-white'} ${actionDirection === DIRECTION.DEPOSIT && 'bg-slate-500 duration-300'} `} onClick={() => setActionDirection(DIRECTION.DEPOSIT)} >Deposit</button>
            <button className={`${'flex w-1/2 items-center justify-center rounded duration-300 text-white'} ${actionDirection === DIRECTION.WITHDRAW && 'bg-slate-500 duration-300'} `} onClick={() => setActionDirection(DIRECTION.WITHDRAW)} >Withdraw</button>
        </div>
      </div>
      <form
      onSubmit={(e) => onSubmit(e)}
      >
      <div className="flex items-center justify-between w-full my-3">
        <div className="w-1/4">Amount</div>
          <input 
          required
          type='number' 
          className="w-2/4 h-10 min-w-[10rem] px-2 bg-slate-700 text-white rounded"
          onChange={(e) => setAmount(e.target.value)}
          ></input>
        </div>
        <div className="relative w-full my-7">
          <button type='submit' className='bg-slate-800 hover:bg-slate-700 duration-200 h-12 w-24 text-white rounded absolute right-0'>Submit</button>
        </div>
      </form>
    </div>
    )
}

export default Wallet