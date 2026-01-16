import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import Feed from './components/Feed.jsx';
import Signup from './components/Signup.jsx';
import Resetpassword from './components/Resetpassword.jsx';
import './App.css';
import "./styles/login.css";
import "./styles/feed.css";
import "./styles/signup.css";
import "./styles/resetPass.css";

function App() {

  return (
    <>
      <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<Resetpassword />} />
      </Routes>
      </div>
    </>
  )
}

export default App
