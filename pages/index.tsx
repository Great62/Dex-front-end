import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import { getContracts, getWeb3 } from '../utils';
import Web3 from 'web3'
import Wallet from '../Components/Wallet';
import NewOrder from '../Components/NewOrder';
import AllTrades from '../Components/AllTrades';
import AllOrders from '../Components/AllOrders';
import MyOrders from '../Components/MyOrders';
import NavBar from '../Components/Navbar';

const Home: NextPage = () => {

  const SIDE = {
    BUY: 0,
    SELL: 1
  };

  const [activeMenuItem, setActiveMenuItem] = useState('')
  const [canReqContracts, setCanReqContracts] = useState(false);
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [contracts, setContracts] = useState(undefined);
  const [tokens, setTokens] = useState([]);
  const [user, setUser] = useState({
    accounts: [],
    balances: {
      tokenDex: 0,
      tokenWallet: 0
    },
    selectedToken: undefined
  });
  const [orders, setOrders] = useState({
    buy: [],
    sell: []
  });
  const [trades, setTrades] = useState([]);
  const [listener, setListener] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const contracts = await getContracts(web3);
      const accounts = await web3.eth.getAccounts();
      setWeb3(web3);
      setContracts(contracts);
      setAccounts(accounts);
      setCanReqContracts(true)
    }
    init();
  // eslint-disable-next-line
  }, []);

  const getBalances = async (account, token) => {
    const tokenDex = await contracts.dex.methods
      .traderBalances(account, web3.utils.fromAscii(token.ticker))
      .call();
    const tokenWallet = await contracts[token.ticker].methods
      .balanceOf(account)
      .call();
    return {tokenDex, tokenWallet};
  }

  const getOrders = async token => {
    const orders = await Promise.all([
      contracts.dex.methods
        .getOrders(web3.utils.fromAscii(token.ticker), SIDE.BUY)
        .call(),
      contracts.dex.methods
        .getOrders(web3.utils.fromAscii(token.ticker), SIDE.SELL)
        .call(),
    ]);
    return {buy: orders[0], sell: orders[1]};
  }

  const listenToTrades = token => {
    const tradeIds = new Set();
    setTrades([]);
    const listener = contracts.dex.events.NewTrade(
      {
        filter: {ticker: web3.utils.fromAscii(token.ticker)},
        fromBlock: 0
      })
      .on('data', newTrade => {
        if(tradeIds.has(newTrade.returnValues.tradeId)) return;
        tradeIds.add(newTrade.returnValues.tradeId);
        setTrades(trades => ([...trades, newTrade.returnValues]));
      });
    setListener(listener);
  }

  const selectToken = token => {
    setUser({...user, selectedToken: token});
  }

  const deposit = async amount => {
    console.log(`making deposit on ${user.selectedToken}`)
    await contracts[user.selectedToken.ticker].methods
      .approve(contracts.dex.options.address, amount)
      .send({from: user.accounts[0]});
    await contracts.dex.methods
      .deposit(amount, web3.utils.fromAscii(user.selectedToken.ticker))
      .send({from: user.accounts[0]});
    const balances = await getBalances(
      user.accounts[0],
      user.selectedToken
    );
    setUser(user => ({ ...user, balances}));
  }

  const withdraw = async amount => {
    await contracts.dex.methods
      .withdraw(
        amount, 
        web3.utils.fromAscii(user.selectedToken.ticker)
      )
      .send({from: user.accounts[0]});
    const balances = await getBalances(
      user.accounts[0],
      user.selectedToken
    );
    setUser(user => ({ ...user, balances}));
  }

  const createMarketOrder = async (amount, side) => {
    console.log(user.accounts[0])
    await contracts.dex.methods
    .createMarketOrder(
        web3.utils.fromAscii(user.selectedToken.ticker),
        amount,
        side
      )
      .send({from: user.accounts[0]});
    const orders = await getOrders(user.selectedToken);
    setOrders(orders);
  }

  const createLimitOrder = async (amount, price, side) => {
    console.log(user.accounts[0])
    await contracts.dex.methods
    .createLimitOrder(
        web3.utils.fromAscii(user.selectedToken.ticker),
        amount,
        price,
        side
      ).send({from: user.accounts[0]});
      const orders = await getOrders(user.selectedToken);
      setOrders(orders);
      console.log(orders)
  }


  useEffect(() => {
    if (canReqContracts) {
      const init = async () => {
        console.log(contracts)
        const rawTokens = await contracts.dex.methods.getTokens().call(); 
        const tokens = rawTokens.map(token => ({
          ...token,
          ticker: web3.utils.hexToUtf8(token.ticker)
        }));
        const [balances, orders] = await Promise.all([
          getBalances(accounts[0], tokens[0]),
          getOrders(tokens[0]),
        ]);
        setTokens(tokens);
        setUser({accounts, balances, selectedToken: tokens[0]});
        setOrders(orders);
        setActiveMenuItem(tokens[0].ticker)
        console.log('was able to req contracts')
        console.log(tokens)
        console.log(orders)
      }
      init();
    }
    console.log('init wasnt ready')
  }, [canReqContracts]);

  useEffect(() => {
    const init = async () => {
      const [balances, orders] = await Promise.all([
        getBalances(
          user.accounts[0], 
          user.selectedToken
        ),
        getOrders(user.selectedToken),
      ]);
      listenToTrades(user.selectedToken);
      setUser(user => ({ ...user, balances}));
      setOrders(orders);
      console.log(orders)
    }
    if(typeof user.selectedToken !== 'undefined') {
      init();
    }
  }, [user.selectedToken], () => {
    listener.unsubscribe();
  });  

  return (
    <div className="flex bg-black min-h-screen flex-col justify-center ">
      <Head>
        <title>DEX</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar
      user={user}
      setActiveMenuItem={setActiveMenuItem}
      activeMenuItem={activeMenuItem}
      selectToken={selectToken}
      items={tokens.map((token) => ({
              label: token.ticker,
              value: token
            }))}  />
      <div className='flex flex-col w-full h-auto gap-5 my-10'>
        <div className='flex align-middle justify-between px-5 flex-col sm:flex-row w-full'>
          <div className='flex flex-col gap-5 w-full sm:w-4/12'>
            <Wallet
            activeMenuItem={activeMenuItem}
            user={user}
            deposit={deposit}
            withdraw={withdraw}
             />
            <NewOrder
            user={user}
            createLimitOrder={createLimitOrder}
            createMarketOrder={createMarketOrder}
            />
          </div>
          <div className='flex flex-col gap-5 w-full sm:w-[65%] h-full'>
            <AllTrades />
            <AllOrders
            orders={orders}
            />
            <MyOrders />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
