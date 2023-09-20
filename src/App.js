import React from 'react'
import './App.css';
import Navbar from './Components/Navbar';
import LoginPage from './Components/LoginPage'
import Register from './Components/Register'
import HomePage from './Components/HomePage'
import Indicator from './Components/Indicator'
import { Routes,Route } from 'react-router-dom';
import About from './Components/About';
import Footer from './Components/Footer';
import CoinList from './Components/CoinList';
import Profile from './Components/Profile';
function App() {
  
  return (
    <>
    <div className='background'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/indicator' element={<Indicator/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/coins' element={<CoinList/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App;
