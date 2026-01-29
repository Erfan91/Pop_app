import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import Feed from './components/Feed.jsx';
import Signup from './components/Signup.jsx';
import Resetpassword from './components/Resetpassword.jsx';
import Profile from './components/Profile.jsx';
import Nav from "./components/Nav.jsx";

import './App.css';
import "./styles/login.css";
import "./styles/feed.css";
import "./styles/signup.css";
import "./styles/profile.css";

import "./styles/post.css";
import "./styles/resetPass.css";
import "./styles/loader.css";
import "./styles/nav.css";
import "./styles/proNav.css";

import "./styles/pop-ups/bio.css";
import "./styles/pop-ups/gettingStarted.css";
import "./styles/pop-ups/phoneNum.css";
import "./styles/pop-ups/popup.css";
import "./styles/pop-ups/pp.css";



function App(props) {
const [navDisplay, setNavDisplay] = useState("flex");
  return (
    <>
      <div className="App">
      <Routes>
        <Route path="/" element={<Login navDisplay={setNavDisplay} />} />
        <Route path="/feed" element={<Feed navDisplay={setNavDisplay}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/profile" element={<Profile navDisplay={setNavDisplay}/>} />
      </Routes>
    <Nav display={navDisplay} />
      </div>
    </>
  )
}

export default App
