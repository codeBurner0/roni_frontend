import React, { useEffect, useState } from 'react'
import "../assets/css/navbar.css"
import { Link, useNavigate } from 'react-router-dom'
import appLogo from '../assets/images/appLogo.png'
function Navbar() {
  const [auth,setAuth]=useState("");
  const [user,setUser]=useState("");
  const navigate=useNavigate();
  useEffect(()=>{
    const author=localStorage.getItem('user');
    if(author){
      setAuth(true)
      setUser(JSON.parse(author))
    }else{
      setAuth(false)
    }
  },[])

  function logout(){
    localStorage.clear();
    navigate(0)
    navigate('/')
  }
  
  return (
    <div className="nav-container">
      <div className="navbar">
        <div className="list">
          <li ><Link to="/"><img src={appLogo} alt="" className='logo-img' onClick={()=>navigate('/')}/></Link></li>
          <li ><Link className="anchor" to="/about">About</Link></li>
          <li ><Link className="anchor" to="/coins">Coins</Link></li>
          
          {
            (auth)?
            <><li ><Link className="anchor" to="/indicator">Go</Link></li><li ><Link className="li-user" to="/profile">{user.email}</Link></li>
            <li><button className='logout-button' onClick={()=>logout()}>Logout</button></li></>
            :
            <><li ><Link className="li-signin" to="/login">SignIn</Link></li>
            <li><button className='signup-button' onClick={()=>navigate('/register')}>SignUp</button></li></>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar
