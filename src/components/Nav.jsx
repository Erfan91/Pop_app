import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { BiSolidNotification } from "react-icons/bi";
import { VscSettings } from "react-icons/vsc";
import { RiSettingsFill } from "react-icons/ri";
import { GrHomeOption } from "react-icons/gr";
import { FaUserFriends } from "react-icons/fa";
const Nav = (props) => {
    const navigate = useNavigate();
    const [display, setDisplay] = useState(false);


  return (
    <div className='nav-div flex' style={{display: props.display}}>
        <div className='nav-icon-div flex-column center' onClick={()=>navigate("/feed", {state: {firstLogin: false, login:true}})}>  
            <GrHomeOption className='nav-icon' />
            <p><small>Home</small></p>
        </div>
         <div className='nav-icon-div flex-column center'>  
            <FaUserFriends className='nav-icon' />
            <p><small>Friends</small></p>
        </div>
        <div className='nav-icon-div flex-column center'>  
            <BiSolidNotification className='nav-icon' />
            <p><small>Notifications</small></p>
        </div>
        <div className='nav-icon-div flex-column center'>  
            <VscSettings className='nav-icon' />
            <p ><small>Settings</small></p>
        </div>
    </div>
  )
}

export default Nav