import React, { useEffect, useState } from 'react'
import '../assets/css/Register.css'
import { useNavigate } from 'react-router-dom';
function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [err, setErr] = useState("")
  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/')
    }
  }, [])
  async function Handle() {
    console.log(firstName, lastName, email, password, confirmPassword)
    let result = await fetch('https://roni-backend-serve.onrender.com/v1/register', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, phone, password, confirmPassword }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch((e) => {
      setErr(e);
      console.log("Error", e)
    })
    result = await result.json()
    if (!result.message) {
      localStorage.setItem("user", JSON.stringify(result))
      navigate(0)
      navigate('/')
      console.log(result)
    } else {
      const message = result.message;
      console.log(message)
      setErr(message)
    }
  }
  return (
    <div className='register-background'>
      <div className="container">
        <h3 className='title'>Create Account</h3>
        <input type="text" className="register-login input1" placeholder='Firstname'
          onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" className="register-login input2" placeholder='Lastname'
          onChange={(e) => setLastName(e.target.value)} />
        <input type="text" className="register-login input3" placeholder='Email Address'
          onChange={(e) => setEmail(e.target.value)} />
        <input type="text" className="register-login input3" placeholder='Phone Number'
          onChange={(e) => setPhone(e.target.value)} />
        <input type="text" className="register-login input4" placeholder='Password'
          onChange={(e) => setPassword(e.target.value)} />
        <input type="text" className="register-login input5" placeholder='Confirm Password'
          onChange={(e) => setConfirmPassword(e.target.value)} />
        <p className='para'>Already register? <span className='reg' onClick={() => navigate('/login')}>SignIn</span></p>
        <p className='error'>{(err) ? err : null}</p>
        <button className="register-button" onClick={() => Handle()}>Create Account</button>
      </div>
    </div>
  )
}

export default Register
