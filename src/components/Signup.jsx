import React, { useState } from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { FaLock } from "react-icons/fa6";
import { GrFormNextLink } from "react-icons/gr";
// import { set } from 'mongoose';
{/* <GrFormNextLink /> */ }

const Signup = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = useState(false);

     const handleUserNameChange = e => {
        e.preventDefault();
        setUsername(e.target.value);
        setChecked(true);
    }

    const handleNameChange = e => {
        e.preventDefault();
        setName(e.target.value);
        setChecked(true);
    }

     const handleEmailChange = e => {
        e.preventDefault();
        setEmail(e.target.value);
        setChecked(true);
    }

    const handlePasswordChange = e => {
        e.preventDefault();
        setPassword(e.target.value);
        setChecked(true);
    }

    const handleConfirmPasswordChange = e => {
        e.preventDefault();
        setConfirmPassword(e.target.value);
        setChecked(true);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (checked && (name !== '')) {
            // setChecked(false);
            document.querySelector(".signup-name-div").classList.add('display-none');
            document.querySelector(".signup-username-div").classList.remove('display-none');
        }
        if (checked && (username !== '')) {
            
            document.querySelector(".signup-username-div").classList.add('display-none');
            document.querySelector(".signup-email-div").classList.remove('display-none');
        }
        if (checked && (email !== '')) {

            document.querySelector(".signup-email-div").classList.add('display-none');
            document.querySelector(".signup-password-div").classList.remove('display-none');
            document.querySelector(".signup-confirm-password-div").classList.remove('display-none');

        }
        if (checked && (password !== '') && (password == confirmPassword)) {
            fetch("http://localhost:3001/user/create-account", {
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
                    console.log(data);
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
                        <FaCircleUser className='user-icon' />
                        <input type="text" placeholder='Name' onChange={handleNameChange}/>
                    </div>
                    <div className="input-div signup-input-div signup-username-div display-none">
                        <FaCircleUser className='user-icon' />
                        <input type="text" placeholder='Username' onChange={handleUserNameChange}/>
                    </div>
                    <div className="input-div signup-input-div signup-email-div display-none">
                        <HiOutlineMail className='email-icon' />
                        <input type="text" placeholder='Email' onChange={handleEmailChange} />
                    </div>
                    <div className="input-div signup-input-div signup-password-div display-none">
                        <FaLock className='lock-icon' />
                        <input type="password" placeholder='Password' onChange={handlePasswordChange} />
                    </div>
                    <div className="input-div signup-input-div signup-confirm-password-div display-none">
                        <FaLock className='lock-icon' />
                        <input type="password" placeholder='Confirm Password' onChange={handleConfirmPasswordChange} />
                    </div>
                    <div className="checkbox-div flex">
                        <input type="checkbox" id="terms-checkbox" onChange={() => setChecked(!checked)} />
                        <label htmlFor="terms-checkbox">I agree to the Terms and Conditions</label>
                    </div>
                </div>
                <div className="signup-button-div flex">
                    {confirmPassword && password? <button className='signup-button'>Sign Up</button> : <button className='next-button' onClick={handleSubmit}><GrFormNextLink className='next-icon ' /></button>}
                </div>
                <div className="oauth-div">
                    <span>Or sign up with</span>
                    <div className="div oauth-buttons">
                        <button className='oauth-button google'>Google</button>
                        <button className='oauth-button facebook'>Facebook</button>
                        <button className='oauth-button twitter'>Twitter</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup