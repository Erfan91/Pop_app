import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCircleUser, FaLock } from "react-icons/fa6";
import {
    BsFillEyeFill,
    BsFillEyeSlashFill,
    BsAlphabetUppercase,
    BsCurrencyDollar,
} from "react-icons/bs";
import { RxLetterCaseLowercase } from "react-icons/rx";
import { TbNumber123 } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineExclamation } from "react-icons/ai";


const Resetpassword = () => {

    const [inputType, setInputType] = useState('password');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
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

    const handlePasswordChange = e => {
        e.preventDefault();
        if (e.target.value.length < 8) {
            setPasswordValid(<span className='password-mismatch'>Password must be at least 8 characters long</span>);
            document.querySelector(".reset-password-button").classList.add("invalid-button")
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
            setPasswordValid(<span className='password-mismatch rst-match-span'>Passwords do not match</span>);
            document.querySelector(".reset-password-button").classList.add('invalid-button')
        } else if (e.target.value == "") {
            setPasswordValid(null);
        } else {
            setPasswordValid(<span className='password-match'><IoMdCheckmarkCircleOutline className='checkmark-icon valid-requirement-icon' /></span>);
            document.querySelector(".reset-password-button").classList.remove("invalid-button");

        }
        setConfirmPassword(e.target.value);
        setChecked(true);
    }

    const resetPassword = e => {
        e.preventDefault();
        fetch("http://localhost:3001/user/reset-password", {
            method: "POST",
            headers: new Headers({"content-type" : "application/json"}),
            body: JSON.stringify({
                email: location.state.email,
                password: confirmPassword,
            })
        }).then(result=>result.json())
        .then(data=>{
            if(data.state){
                navigate("/")
            }
        })
    }

    return (
        <div className='login-container rst-pss-container'>
            <div className="login-main-div flex-column">
                <div className='login-header reset-header'>
                    <h2>Reset Password</h2>
                </div>
                <div className="login-form rst-pss-form flex-column">
                    <div className="input-div signup-input-div signup-password-div">
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
                    <div className="input-div signup-input-div signup-confirm-password-div">
                        <FaLock className='lock-icon signup-icon' />
                        <input type={inputType} placeholder='Confirm Password' onChange={handleConfirmPasswordChange} />
                        <div className="password-correction-div">
                            {passwordValid}
                        </div>
                    </div>
                    <div className="login-button-div flex">
                        <button className='login-button reset-password-button invalid-button' onClick={resetPassword}>Reset Password</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Resetpassword