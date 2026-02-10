import React, { useEffect, useState } from 'react';
import { useLocation,  } from 'react-router-dom';
import { HiOutlineMail } from "react-icons/hi";
import { FaLock } from "react-icons/fa6";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { data, Navigate, useNavigate } from 'react-router-dom';
import { getAuth, sendEmailVerification, } from 'firebase/auth';
import { IoIosCodeWorking } from "react-icons/io";
import setAuth from '../auth/firebase.js';
import emailjs from "emailjs-com";
import Loader from './Loader.jsx';



const Login = (props) => {
  const auth = getAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [forgotPassword, setForgotPasssword] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState(null);
  const [passCode, setPasscode] = useState(null);
  const [emailMessage, setEmailMessage] = useState(null);
  const [buttonClass, setButtonClass] = useState(null);
  const [loaderDisplay, setLoaderDisplay] = useState("none");
  const [passwordValid, setPasswordValid] = useState(null);
  const SERVICE_ID = "service_8i8k0fb";
  const TEMPLATE_ID = "template_ab584df";
  const PUBLIC_ID = "xgf6c53ybIKZehK7j";
  const location = useLocation();

 

  const togglePasswordVisibility = () => {
    if (!showPassword) {
      setShowPassword(true);
      setInputType('text');
    } else {
      setShowPassword(false);
      setInputType('password');
    }
  }

  const handleEmailChange = e => {
    const target = e.target.value;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!reg.test(target)) {
      e.target.classList.add('invalid-email');
      document.querySelector('.email-div').classList.add('error-border');
    }
    if (reg.test(target)) {
      e.target.classList.remove('invalid-email');
      document.querySelector('.email-div').classList.remove('error-border');
    }
    if (target === '') {
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

    fetch("http://localhost:3001/user/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email,
        password
      })
    }).then(res => res.json())
      .then(data => {
        if (!data.state) {
          setPasswordValid(data.message)
        }
        if (data.state) {
          localStorage.setItem('_id', data.user.id);
          if(!data.user.firstLogin){
              navigate("/profile")
          }else{
            navigate("/feed");
          }
        }
      })
  }

  useEffect(() => {

    if (email) {
      fetch("http://localhost:3001/user/emailEx", {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({ email })
      }).then(res => res.json())
        .then(data => {
          if (!data.state) {
            setButtonClass("event-none invalid-button")
            setEmailMessage(data.message);
          } else {
            setButtonClass(null)
            setEmailMessage(data.message);
          }
        })
    }

  }, [email])


  const sendCode = async e => {
    e.preventDefault();
    await setLoaderDisplay("flex");
    let random = Math.ceil(Math.random() * (1, 1000000) + 1)
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      email,
      time: "15/01/2025",
      passcode: JSON.stringify(random)
    }, PUBLIC_ID)
      .then(result => {
        console.log(result)
        setCode(JSON.stringify(random));
        setCodeSent(true);
      })
    document.querySelector('.email-div').classList.add("selected-input-bg");


    setTimeout(() => {
      setLoaderDisplay("none");
    }, 800);
  }

  const checkCode = e => {
    e.preventDefault();
    if (e.target.value == code) {
      document.querySelector(".code-div").classList.add("correct-border")
      navigate("/reset-password", { state: { email } });
    } else {
      document.querySelector(".code-div").classList.add("error-border");
    }
  }

  useEffect(() => {
    props.navDisplay("none");
  }, [])

  return (
    <div className='login-container'>
      <div className='login-main-div flex-column'>
        <div className='login-header'>
          <h2>Login to your account</h2>
        </div>
        <div className="login-form flex-column">
          <div className="input-div email-div flex">
            <HiOutlineMail className="email-icon" />
            <input type="text" className='login-email-input' placeholder='Email' onChange={handleEmailChange} />
          </div>
          {forgotPassword ? <span className="email-message">{emailMessage}</span> : null}
          {
            !forgotPassword ?
              <div className="input-div flex">
                <FaLock className='lock-icon' />
                <input type={inputType} placeholder='Password'  onChange={e => setPassword(e.target.value)} />
                {showPassword ? <BsFillEyeFill className='eye-icon' onClick={togglePasswordVisibility} /> : <BsFillEyeSlashFill className='eye-icon' onClick={togglePasswordVisibility} />}
              </div>
              : null
          }
          <div className="password-message-div" style={!forgotPassword? {display: "block"} : {display: "none"}}>
            {passwordValid}
          </div>
          {
            codeSent ?
              <div className="input-div code-div flex">
                <IoIosCodeWorking className='lock-icon' />
                <input type="number" minLength={6} maxLength={6} placeholder='6 digit code' onChange={checkCode} />
              </div> : null
          }
          {!forgotPassword ?
            <div className="inst-div flex">
              <span onClick={() => {
                setEmailMessage(null)
                setForgotPasssword(true)
              }}>forgot password?</span>
              <span onClick={() => navigate('/signup')}>Create account</span>
            </div> :
            null
          }
        </div>
        <Loader display={loaderDisplay} />
        <div className="login-button-div flex">
          {!forgotPassword ?
            <button className='login-button' onClick={handleButtonClick}>Login</button>
            :
            <button className={'login-button send-code-button ' + buttonClass} onClick={sendCode}>Send code</button>


          }
        </div>
      </div>
    </div>
  )
}

export default Login