import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import setAuth from '../auth/firebase.js';
import {getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { AiOutlineExclamation } from "react-icons/ai";
import { FaCircleUser, FaLock } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { GrFormNextLink } from "react-icons/gr";
import {
        BsFillEyeFill,
        BsFillEyeSlashFill,
        BsAlphabetUppercase, 
        BsCurrencyDollar, 
        BsDiscord, 
        BsApple, 
        BsFacebook 
       } from "react-icons/bs";
import { RxLetterCaseLowercase } from "react-icons/rx";
import { TbNumber123 } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Signup = () => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState('password');
    const [buttonClass, setButtonClass] = useState('invalid-button');
    const [usernameAvailable, setUsernameAvailable] = useState(null);
    const [passwordValid, setPasswordValid] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth()

    const togglePasswordVisibility = () => {

        if (!showPassword) {
            setShowPassword(true);
            setInputType('text');

        } else {
            setShowPassword(false);
            setInputType('password');
        }
    }

    useEffect(() => {
        if (username.length >= 3)
            fetch("http://localhost:3001/user/username", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ username })
            }).then(res => res.json())
                .then(data => {
                    if (data.state) {
                        document.querySelector('.username-available').classList.remove('display-none');
                        setUsernameAvailable("username available");
                    } else {
                        document.querySelector('.username-available').classList.remove('display-none');
                        setUsernameAvailable("username already exists");
                    }
                })
    }, [username]);

    const handleUserNameChange = e => {
        e.preventDefault();

        if (e.target.value.length < 3) {
            e.target.placeholder = "At least 3 characters";
            document.querySelector('.signup-username-div').classList.add('error-border');
            setButtonClass("invalid-button")

        } else {
            setButtonClass("valid-button");
            document.querySelector('.signup-username-div').classList.remove('error-border');
        }

        if (e.target.value == "") {
            e.target.placeholder = "Username is required";
            document.querySelector('.signup-username-div').classList.remove('error-border');
            document.querySelector('.username-available').classList.add('display-none');
            setButtonClass("invalid-button")
        }

        setUsername(e.target.value);
        setChecked(true);
    }


    const handleNameChange = e => {
        e.preventDefault();

        if (e.target.value.length < 3) {
            e.target.placeholder = "At least 3 characters";
            document.querySelector('.signup-name-div').classList.add('error-border');
            setButtonClass(" invalid-button");

        } else {
            setButtonClass("valid-button");
            document.querySelector('.signup-name-div').classList.remove('error-border');
        }

        if (e.target.value == "") {
            e.target.placeholder = "Name is required";
            setButtonClass("invalid-button")
        }

        setName(e.target.value);
        setChecked(true);
    }

    const handleEmailChange = e => {
        e.preventDefault();

        const target = e.target.value;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (target === '') {
            e.target.classList.remove('invalid-email');
            e.target.placeholder = "email@example.com";
            setButtonClass("invalid-button")

        }
        if (!reg.test(target)) {
            e.target.classList.add('invalid-email');
            document.querySelector('.signup-email-div').classList.add('error-border');
            setButtonClass("invalid-button")
        } else {
            document.querySelector('.signup-email-div').classList.remove('error-border');
            setButtonClass("valid-button");
        }

        setEmail(e.target.value);
        setChecked(true);
    }


    const reg = /[A-Z]/
        && /[a-z]/
        && /[0-9]/
        && /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    const handlePasswordChange = e => {
        e.preventDefault();
        if (e.target.value.length < 8) {
            setPasswordValid(<span className='password-mismatch'>Password must be at least 8 characters long</span>);
        } else if (e.target.value == "") {
            setPasswordValid(null);
        } else {
            setPasswordValid(null)
        }
        setPassword(e.target.value);
        setChecked(true);
    }

    const handleConfirmPasswordChange = e => {
        e.preventDefault();
        if (e.target.value !== password) {
            setPasswordValid(<span className='password-mismatch'>Passwords do not match</span>);
        } else if (e.target.value == "") {
            setPasswordValid(null);
        } else {
            setPasswordValid(<span className='password-match'><IoMdCheckmarkCircleOutline className='checkmark-icon valid-requirement-icon' /></span>);
        }
        setConfirmPassword(e.target.value);
        setChecked(true);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (checked && (name !== '')) {
            // setChecked(false);
            document.querySelector(".signup-name-div").classList.add('display-none');
            document.querySelector(".signup-username-div").classList.remove('display-none');
            setButtonClass('invalid-button');
        }
        if (checked && (username !== '')) {

            document.querySelector(".signup-username-div").classList.add('display-none');
            document.querySelector(".signup-email-div").classList.remove('display-none');
            setButtonClass('invalid-button');
        }
        if (checked && (email !== '')) {

            document.querySelector(".signup-email-div").classList.add('display-none');
            document.querySelector(".signup-password-div").classList.remove('display-none');
            document.querySelector(".signup-confirm-password-div").classList.remove('display-none');
            document.querySelector(".oauth-div").classList.add('display-none');
            document.querySelector(".signup-form").classList.add('justify-space');

        }
        if (checked && (password !== '') && (password == confirmPassword)) {
            fetch("http://localhost:3001/user/create-user", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    name,
                    username,
                    email,
                    password
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.state) {
                        createUserWithEmailAndPassword(auth, data.user.email, data.user.password)
                        .then(userCredential=>{
                        })
                        navigate("/")
                    } else {
                        console.log(data.message);
                    }
                })
        }
    };

    return (
        <div className='signup-container flex'>
            <div className="signup-main-div flex-column">
                <div className="signup-header">
                    <h2>Create your account</h2>
                </div>
                <div className="signup-form flex-column">
                    <div className="input-div signup-input-div signup-name-div">
                        <FaCircleUser className='user-icon signup-icon' />
                        <input type="text" placeholder='Name' onChange={handleNameChange} />
                    </div>
                    <div className="input-div signup-input-div signup-username-div display-none">
                        <FaCircleUser className='user-icon signup-icon' />
                        <input type="text" placeholder='Username' onChange={handleUserNameChange} />
                        <span className="username-available">{usernameAvailable}</span>
                    </div>
                    <div className="input-div signup-input-div signup-email-div display-none">
                        <HiOutlineMail className='email-icon signup-icon' />
                        <input type="text" placeholder='Email' onChange={handleEmailChange} />

                    </div>
                    <div className="input-div signup-input-div signup-password-div display-none">
                        <FaLock className='lock-icon signup-icon' />
                        <input type={inputType} placeholder='Password' onChange={handlePasswordChange} />
                        {showPassword ? <BsFillEyeFill className='eye-icon signup-eye-icon' onClick={togglePasswordVisibility} /> : <BsFillEyeSlashFill className='eye-icon signup-eye-icon' onClick={togglePasswordVisibility} />}
                        <div className="password-requirement-div flex">
                            <div className="password-icon-div uppercase-icon">
                                <BsAlphabetUppercase className={/[A-Z]/.test(password) ? 'requirement-icon valid-requirement-icon' : 'requirement-icon invalid-requirement-icon'} />
                            </div>
                            <div className="password-icon-div lowercase-icon">
                                <RxLetterCaseLowercase className={/[a-z]/.test(password) ? 'requirement-icon valid-requirement-icon' : 'requirement-icon invalid-requirement-icon'} />
                            </div>
                            <div className="password-icon-div number-icon">
                                <TbNumber123 className={/[0-9]/.test(password) ? 'requirement-icon valid-requirement-icon' : 'requirement-icon invalid-requirement-icon'} />
                            </div>
                            <div className="password-icon-div special-character-icon">
                                <BsCurrencyDollar className={/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password) ? 'requirement-icon valid-requirement-icon' : 'requirement-icon invalid-requirement-icon'} />
                                <AiOutlineExclamation className={/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password) ? 'requirement-icon valid-requirement-icon' : 'requirement-icon invalid-requirement-icon'} />
                            </div>
                        </div>
                    </div>
                    <div className="input-div signup-input-div signup-confirm-password-div display-none">
                        <FaLock className='lock-icon signup-icon' />
                        <input type={inputType} placeholder='Confirm Password' onChange={handleConfirmPasswordChange} />
                        <div className="password-correction-div">
                            {passwordValid}
                        </div>
                    </div>
                    <div className="signup-button-div flex">
                        {confirmPassword && password ? <button className={!reg.test(password) || !reg.test(confirmPassword) ? "signup-button event-none" : "signup-button"} onClick={handleSubmit}>Sign Up</button> : <button className={"next-button " + buttonClass} onClick={handleSubmit}><GrFormNextLink className='next-icon ' /></button>}
                    </div>
                </div>
                <div className="oauth-div flex-column">
                    <span>Or sign up with</span>
                    <div className="oauth-buttons-div flex">
                        <button className='oauth-button flex apple'><BsApple className='oauth-icon apple-icon' /></button>
                        <button className='oauth-button flex facebook'><BsFacebook className='oauth-icon facebook-icon' /></button>
                        <button className='oauth-button flex discord'><BsDiscord className='oauth-icon discord-icon' /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup