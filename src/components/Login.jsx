import React, {useState} from 'react'
import { HiOutlineMail } from "react-icons/hi";
import { FaLock } from "react-icons/fa6";
import { BsFillEyeFill, BsFillEyeSlashFill} from "react-icons/bs";
import {data, useNavigate} from 'react-router-dom'

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const togglePasswordVisibility = () => {
    if(!showPassword) {
      setShowPassword(true);
      setInputType('text');
    }else{
      setShowPassword(false);
      setInputType('password');
    }
  }

  const handleEmailChange = e => {
    const target = e.target.value;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if(!reg.test(target)){
      e.target.classList.add('invalid-email');
      document.querySelector('.email-div').classList.add('error-border');
    }
    if(reg.test(target)){
      e.target.classList.remove('invalid-email') ;
      document.querySelector('.email-div').classList.remove('error-border');
    }
    if(target === ''){
      e.target.classList.remove('invalid-email');
      document.querySelector('.email-div').classList.remove('error-border');
    }
    setEmail(target);

  }

  const handleButtonClick = e => {
    e.preventDefault();
    e.target.classList.add('button-clicked');

      setTimeout(() => {
        e.target.classList.remove('button-clicked');
      }, 200);

    fetch("http://localhost:3001/user/login",{
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({
        email, 
        password
      })
    }).then(res => res.json())
    .then(data => {
      if(!data.state){
        console.log(data.message);
      }
      navigate("/feed", {state: {userId: data.id}})
    })
  }

  return (
    <div className='login-container'>
      <div className='login-main-div flex-column'>
        <div className='login-header'>
          <h2>Login to your account</h2>
        </div>
        <div className="login-form flex-column">
          <div className="input-div email-div flex">
            <HiOutlineMail className="email-icon" />
            <input type="text" className='email-input' placeholder='Email' onChange={handleEmailChange}/>
          </div>

          <div className="input-div flex">
            <FaLock className='lock-icon' />
            <input type={inputType} placeholder='Password' onChange={e=>setPassword(e.target.value)}/>
         {showPassword ? <BsFillEyeFill className='eye-icon'  onClick={togglePasswordVisibility}/> : <BsFillEyeSlashFill className='eye-icon'  onClick={togglePasswordVisibility}/>}
          </div>
          <div className="inst-div flex">
            <span>forgot password?</span>
            <span onClick={()=>navigate('/signup')}>Create account</span>
          </div>
        </div>
        <div className="login-button-div flex">
          <button className='login-button' onClick={handleButtonClick}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login