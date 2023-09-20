import React, { useEffect, useState } from 'react'
import '../assets/css/CoinList.css'
import { arr } from '../assets/coin'
import { IoLogoUsd } from 'react-icons/io';
function CoinList() {
  const [coinList, setCoinList] = useState([]);
  useEffect(() => {
    async function callApi() {
      try {
        let result = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en')
        result = await result.json();
        console.log(result)
        setCoinList(result)
      } catch (e) {
        setCoinList(arr)
        console.log("error", e.message)
      }
    }
    callApi();
  }, [])



  return (
    <div className='body'>
      <section>
        <h1 className='h1'>Cryptocurrency Prices by Market Cap</h1>
        <div className="tbl-header">
          <table cellPadding="0" cellSpacing="0" border="0" className='table'>
            <thead>
              <tr>
                <th>#</th>
                <th>Symbol</th>
                <th>Coin</th>
                <th>Price</th>
                <th>Supply</th>
                <th>Volume</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellPadding="0" cellSpacing="0" border="0">
            <tbody>
              {
                coinList.map((item, index) => {
                  return (<tr key={index} className='coin-tr'>
                    <td>{index + 1}</td>
                    <td><img className='symbol-coin' src={item.image} alt="" />{item.symbol}</td>
                    <td>{item.name} </td>
                    <td><IoLogoUsd/>{item.current_price}</td>
                    <td>{item.total_supply}</td>
                    <td>{item.total_volume}</td>
                  </tr>)
                })
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default CoinList


// ath
// :
// 69045
// ath_change_percentage
// :
// -60.31698
// ath_date
// :
// "2021-11-10T14:24:11.849Z"
// atl
// :
// 67.81
// atl_change_percentage
// :
// 40306.21214
// atl_date
// :
// "2013-07-06T00:00:00.000Z"
// circulating_supply
// :
// 19489343
// current_price
// :
// 27340
// fully_diluted_valuation
// :
// 575139587797
// high_24h
// :
// 27405
// id
// :
// "bitcoin"
// image
// :
// "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
// last_updated
// :
// "2023-09-18T13:16:41.158Z"
// low_24h
// :
// 26417
// market_cap
// :
// 533766319021
// market_cap_change_24h
// :
// 15834616365
// market_cap_change_percentage_24h
// :
// 3.05728
// market_cap_rank
// :
// 1
// max_supply
// :
// 21000000
// name
// :
// "Bitcoin"
// price_change_24h
// :
// 765.73
// price_change_percentage_24h
// :
// 2.88148
// roi
// :
// null
// symbol
// :
// "btc"
// total_supply
// :
// 21000000
// total_volume
// :
// 10536750053