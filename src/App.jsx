import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import Feed from './components/Feed.jsx';
import Signup from './components/Signup.jsx';
import Resetpassword from './components/Resetpassword.jsx';
import Profile from './components/Profile.jsx';
import Loader from './components/Loader.jsx';
import Popup from './components/pop-ups/Popup.jsx';
import './App.css';
import "./styles/login.css";
import "./styles/feed.css";
import "./styles/signup.css";
import "./styles/resetPass.css";
import "./styles/loader.css";

import "./styles/pop-ups/bio.css";
import "./styles/pop-ups/gettingStarted.css";
import "./styles/pop-ups/phoneNum.css";
import "./styles/pop-ups/popup.css";
import "./styles/pop-ups/pp.css";

function App() {

  return (
    <>
      <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      </div>
    </>
  )
}

export default App
