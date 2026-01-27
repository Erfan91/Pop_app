import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { HiUser } from "react-icons/hi2";
import { BsFilePost } from "react-icons/bs";
import { BiSolidNotification } from "react-icons/bi";
import { VscSettings } from "react-icons/vsc";
import { RiSettingsFill } from "react-icons/ri";

const Nav = () => {
    const navigate = useNavigate();
    const [display, setDisplay] = useState(false);


  return (
    <div className='nav-div flex'>
        <div className='nav-icon-div flex-column center'>  
            <HiUser className='nav-icon' />
            <p><small>Profile</small></p>
        </div>
        <div className='nav-icon-div flex-column center' onClick={()=>navigate("/feed")}>  
            <BsFilePost className='nav-icon' />
            <p><small>Posts</small></p>
        </div>
        <div className='nav-icon-div flex-column center'>  
            <BiSolidNotification className='nav-icon' />
            <p><small>Notifications</small></p>
        </div>
        <div className='nav-icon-div flex-column center'>  
            <RiSettingsFill className='nav-icon' />
            <p ><small>Settings</small></p>
        </div>
    </div>
  )
}

export default Nav