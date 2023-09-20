import React from 'react'
import '../assets/css/HomePage.css'
import DashBoardImage from '../assets/images/DashBoardImage.png'
import { useNavigate } from 'react-router-dom'
import About from './About'
import Footer from './Footer'
function HomePage() {
  const navigate=useNavigate();
  return (
    <>
    <div className='home-container'>
      <div className='title-box'>
        <h1>
          <span className='title-span1'>"Take control of</span>
          <span className='title-span2'> your finance."</span>
        </h1>
        <p className='title-para'>
          The two most important emotions in the market are fear and greed. 
          Emotions lead to mistakes; therefore, to be a good trader or investor, 
          you must learn to control them. - Richard Dennis
        </p>
        <button className='getStarted-button' onClick={()=>navigate('/indicator')}>Get Started</button>
      </div>
      <div className="main-div">
        <div className='outer-div'>
          <div className="inner-div">
           <img src={DashBoardImage} className='dashborad-image' alt="" />
         </div>
        </div>
      </div>
    </div>
    <About/>
    </>
  )
}

export default HomePage
