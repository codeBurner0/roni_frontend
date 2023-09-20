import React, { useEffect, useState } from 'react'
import '../assets/css/LoginPage.css'
import ProfileImage from '../assets/images/logo.png'
import { HiOutlineMail } from 'react-icons/hi';
import { FaUserLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function LoginPgae() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [err,setErr]=useState("")
  const navigate=useNavigate();
  useEffect(()=>{
    const auth=localStorage.getItem('user');
    if(auth){
      navigate('/')
    }
  },[])

  async function login(){
    console.log(email,password)
    let result=await fetch('https://roni-backend-serve.onrender.com/v1/login',{
      method:'POST',
      body:JSON.stringify({email,password}),
      headers:{
        'Content-Type':'application/json'
      }
    }).catch((e)=>{
      setErr(e);
      console.log("Error",e)
    })
    result=await result.json()
    if(!result.message){
      localStorage.setItem("user",JSON.stringify(result))
      navigate(0)
      navigate('/')
      console.log(result)
    }else{
      const message=result.message;
      console.log(message)
      setErr(message)
    }
    
  }
  return (
    <div className='login-background'>
      <div className="login-container">
        <img src={ProfileImage} alt="" className='profile-image'/>
        <HiOutlineMail className='email-icon'/>
        <input type="email" placeholder='Email Address' className='login-input login-input1'
        onChange={(e)=>setEmail(e.target.value)}/>
        <FaUserLock  className='password-icon'/>
        <input type="password"  placeholder='Password' className=' login-input login-input2'
        onChange={(e)=>setPassword(e.target.value)}/>
        <p className='para'>Click Here to <span className='reg' onClick={()=>navigate('/register')}>Register</span></p>
        <p className='error'>{(err)?err:null}</p>
        <button className="signin-button" onClick={()=>login()}>Sign In</button>
      </div>
    </div>
  )
}

export default LoginPgae
