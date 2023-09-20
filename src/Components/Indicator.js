import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import '../assets/css/Indicator.css'
import { BiLogoBitcoin } from 'react-icons/bi';
import { LiaEthereum } from 'react-icons/lia';
import { GiTimeTrap } from 'react-icons/gi';
import { FaCalculator } from 'react-icons/fa';
import { IoLogoUsd } from 'react-icons/io';
import { AiOutlineStock } from 'react-icons/ai';
import { GiTwoCoins } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
function Indicator() {
  const navigate = useNavigate()
  const [userId, setUserId] = useState('')
  useEffect(() => {
    let auth = localStorage.getItem('user');
    auth=JSON.parse(auth)
    setUserId(auth._id)
    if (!auth) {
      navigate('/')
    }
  }, [])

  const obj = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }
    },
    series: [
      {
        name: "series-1",
        data: [1591, 1192, 2993, 3794, 1765, 1996, 1497, 3298, 1999, 4002]
      }
    ], theme: {
      palette: 'palette6'
    }
  }
  
  const [radio, setRadio] = useState('')
  const [result, setResult] = useState(0)
  const [formula, setFormula] = useState("Calculate")
  const [timeperiod, setTimePeriod] = useState(4)
  const [categoryArray, setCategoryArray] = useState([])
  const [state, setState] = useState(obj)
  const [err, setErr] = useState("")

  async function movingAverage() {
    console.log("MA")
    try {
      setCategoryArray([])
      let result = await fetch(`https://api.coingecko.com/api/v3/coins/${radio}/market_chart?vs_currency=usd&days=${timeperiod - 1}&interval=daily&precision=2`)
      result = await result.json()
      console.log(typeof result.prices[0][1])
      let sum = 0;
      result.prices.map((item) => {
        categoryArray.push(item[1]);
        sum += item[1];
      })
      console.log("sum", sum)
      console.log("result", sum / timeperiod)
      setResult(parseFloat(sum / timeperiod).toFixed(2));
      result=parseFloat(sum / timeperiod).toFixed(2);
      console.log("category", categoryArray)
      setObjectArray(categoryArray)
      setErr('')
      saveHistory(userId,radio,timeperiod,formula,result)
    } catch (e) {
      setErr("All fields are required")
    }
  }

  async function exponentialMovingAverage() {
    console.log("EMA")
    try {
      setCategoryArray([])
      let result = await fetch(`https://api.coingecko.com/api/v3/coins/${radio}/market_chart?vs_currency=usd&days=${timeperiod - 1}&interval=daily&precision=2`)
      result = await result.json()

      result.prices.map((item) => {
        categoryArray.push(item[1]);
      })
      console.log(result)
      let currentPrice = result.prices[timeperiod - 1][1]
      let yesterdayPrice = result.prices[timeperiod - 2][1]
      const multiplier = (2 / (1 + +timeperiod));
      const currentEMA = currentPrice * (multiplier)
      const previousEMA = yesterdayPrice * (1 - multiplier)
      const EMA = currentEMA + previousEMA;
      setResult(parseFloat(EMA).toFixed(2));
      result=parseFloat(EMA).toFixed(2);
      console.log("EMA", EMA)
      setObjectArray(categoryArray)
      setErr('')
      saveHistory(userId,radio,timeperiod,formula,result)
    } catch (error) {
      setErr("All fields are required")
    }
  }

  async function WeightingMovingAverage() {
    console.log("WMA")
    try {
      setCategoryArray([])
      let result = await fetch(`https://api.coingecko.com/api/v3/coins/${radio}/market_chart?vs_currency=usd&days=${timeperiod - 1}&interval=daily&precision=2`)
      result = await result.json()
      let sum = 0;
      let len = result.prices.length;
      result.prices.map((item, index) => {
        categoryArray.push(item[1]);
        sum += (len) * item[1];
        len--;
      })
      console.log("sum", sum)
      console.log("array", categoryArray)
      console.log("round", Math.round(37063.674000000006 * 100) / 100)
      const div = timeperiod * (1 + +timeperiod);
      console.log("div", div)
      setResult(parseFloat(sum / (div * 0.5)).toFixed(2));
      result=parseFloat(sum / (div * 0.5)).toFixed(2);
      setObjectArray(categoryArray)
      setErr('')
      saveHistory(userId,radio,timeperiod,formula,result)
    } catch (error) {
      setErr("All fields are required")
    }
  }

  async function averageMaWmaEma() {
    console.log("average")
    try {
      setCategoryArray([])
      let result = await fetch(`https://api.coingecko.com/api/v3/coins/${radio}/market_chart?vs_currency=usd&days=${timeperiod - 1}&interval=daily&precision=2`)
      result = await result.json()
      console.log(typeof result.prices[0][1])
      let currentPrice = result.prices[timeperiod - 1][1]
      let yesterdayPrice = result.prices[timeperiod - 2][1]
      let wmaSum = 0;
      let maSum = 0;
      result.prices.map((item, index) => {
        categoryArray.push(item[1]);
        wmaSum += (1 + +index) * item[1];
        maSum += item[1];
      })
      const MA = maSum / timeperiod;
      console.log("MA", MA)
      const div = timeperiod * (1 + +timeperiod);
      const WMA = wmaSum / (div * 0.5);
      console.log("WMA", WMA)
      const multiplier = (2 / (1 + +timeperiod));
      const currentEMA = currentPrice * (multiplier)
      const previousEMA = yesterdayPrice * (1 - multiplier)
      const EMA = currentEMA + previousEMA;
      console.log("EMA", EMA)
      setResult(parseFloat((MA + WMA + EMA) / 3).toFixed(2));
      result=parseFloat((MA + WMA + EMA) / 3).toFixed(2);
      saveHistory(userId,radio,timeperiod,formula,result)
      setObjectArray(categoryArray)
      setErr('')
    } catch (error) {
      setErr("All fields are required")
    }
  }

  async function weightedMaWmaEma() {
    console.log("weighted")
    try {
      setCategoryArray([])
      let result = await fetch(`https://api.coingecko.com/api/v3/coins/${radio}/market_chart?vs_currency=usd&days=${timeperiod - 1}&interval=daily&precision=2`)
      result = await result.json()
      console.log(typeof result.prices[0][1])
      let currentPrice = result.prices[timeperiod - 1][1]
      let yesterdayPrice = result.prices[timeperiod - 2][1]
      let wmaSum = 0;
      let maSum = 0;
      result.prices.map((item, index) => {
        categoryArray.push(item[1]);
        wmaSum += (1 + +index) * item[1];
        maSum += item[1];
      })
      const MA = maSum / timeperiod;
      console.log("MA", MA)
      const div = timeperiod * (1 + +timeperiod);
      const WMA = wmaSum / (div * 0.5);
      console.log("WMA", WMA)
      const multiplier = (2 / (1 + +timeperiod));
      const currentEMA = currentPrice * (multiplier)
      const previousEMA = yesterdayPrice * (1 - multiplier)
      const EMA = currentEMA + previousEMA;
      console.log("EMA", EMA)
      console.log("weighted")
      setResult(parseFloat((1 * MA + 2 * WMA + 3 * EMA) / 6).toFixed(2));
      result=parseFloat((1 * MA + 2 * WMA + 3 * EMA) / 6).toFixed(2);
      setObjectArray(categoryArray)
      setErr('')
      saveHistory(userId,radio,timeperiod,formula,result)
    } catch (error) {
      setErr("All fields are required")
    }
  }

  function setObjectArray(categoryArray) {
    setState({
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: categoryArray.map((item, index) => {
            return index + 1;
          })
        }
      },
      series: [
        {
          name: "series-1",
          data: categoryArray
        }
      ]
    })
  }

  function changeFormula(type) {
    if (type === "WMA") {
      setFormula("Calculate WMA")
    } else if (type === "EMA") {
      setFormula("Calculate EMA")
    } else if (type === "MA") {
      setFormula("Calculate MA")
    } else if (type === "Weighted") {
      setFormula("Calculate Weighted")
    }
    else {
      setFormula("Calculate Average")
    }
  }

  function callFormulaFunc() {
    if (formula === "Calculate WMA") {
      WeightingMovingAverage();
    } else if (formula === "Calculate EMA") {
      exponentialMovingAverage()
    } else if (formula === "Calculate MA") {
      movingAverage()
    } else if (formula === "Calculate Weighted") {
      weightedMaWmaEma()
    }
    else {
      averageMaWmaEma()
    }

    
  }


  async function saveHistory(userId,radio,timeperiod,formula,result){
    console.log(userId,radio,timeperiod,formula,result)
    let res=await fetch('https://roni-backend-serve.onrender.com/v1/history',{
      method:'POST',
      body:JSON.stringify({userId,radio,timeperiod,formula,result}),
      headers:{
        'Content-Type':'application/json'
      }
    }).catch((e)=>{
      setErr(e);
      console.log("Error",e)
    })
    res=await res.json()
    console.log('history',res)
  }


  return (
    <div className='indicator-container'>
      <Chart
        options={state.options}
        series={state.series}
        themes={state.theme}
        type="bar"
        color="white"
        className="chart"
      />
      <div className='outer-div-ind'>
        <div className="inner-div-ind">
          <div className="calculator-sec">
            <h2 className='cal-title'>Financial Indicator</h2>
            <p className='formula-text'><GiTwoCoins className='formula-icon' />Select the coin </p>
            <div onChange={(e) => setRadio(e.target.value)} className='radio-buttons'>
              <input type="radio" value="bitcoin" name="gender" className='ind-input' /><BiLogoBitcoin className='radio-icon' />Bitcoin
              <input type="radio" value="ethereum" name="gender" className='ind-input' /><LiaEthereum className='radio-icon' />Ethereum
            </div>
            <GiTimeTrap className='time-period-icon' /><input className='time-period' type="text"
              placeholder='Time period' onChange={(e) => setTimePeriod(e.target.value)} />
            <p className='formula-text'><AiOutlineStock className='formula-icon' />Select your Indicator </p>
            <div className='formula-buttons'>
              <input type="radio" value="ma" name="ma" onClick={() => changeFormula("MA")} className='ma-input' />MA
              <input type="radio" value="ema" name="ma" onClick={() => changeFormula("EMA")} className='ma-input' />EMA
              <input type="radio" value="ema" name="ma" onClick={() => changeFormula("WMA")} className='ma-input' />WMA
            </div>
            <div className='formula-buttons'>
              <input type="radio" value="ma" name="ma" onClick={() => changeFormula("Average")} className='ma-input' />Average(<span className='ma-input-span'>
                ( Ma+Ema+Wma ) / 3 </span>)
            </div>
            <div className='formula-buttons'>
              <input type="radio" value="ma" name="ma" onClick={() => changeFormula("Weighted")} className='ma-input' />Weighted(<span className='ma-input-span'>
                ( 1*Ma +2*Ema+ 3*Wma ) / 3 </span>)
            </div>
            <p className='error'>{(err) ? err : null}</p>
            <button className="calculate-button" onClick={() => callFormulaFunc()}><FaCalculator />{formula}</button>
            <h1 className='result'><IoLogoUsd className='dollar-icon' />{result}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Indicator
