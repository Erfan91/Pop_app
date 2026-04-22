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
    // const [homeIconClass, setHomeIconClass] = useState(null);
    // const [frndIconClass, setFriendIconClass] = useState(null);
    // const [ntfnIconClass, setNotificationIconClass] = useState(null);
    // const [stgIconClass, setSetingIconClass] = useState(null);
    const [cssIconCLasses, setCssIconClasses] = useState({
        homeIconClass: "",
        friendIconClass: "",
        notificationIconClass: "",
        settingIconClass: "",
    })

    const handleIconClick = (iconName) => {
        setCssIconClasses((prevClasses) => {
            const updatedClasses = { ...prevClasses };
        
            Object.keys(updatedClasses).forEach((key) => {
                updatedClasses[key] = "";
            });

            updatedClasses[`${iconName}IconClass`] = "nav-icon-active";
            return updatedClasses;
        });
    };


    const handleNavigation = () => {
        navigate("/feed", {state: {firstLogin: false, login:true,}})
    }

  return (
    <div className='nav-div flex' style={{display: props.display}}>
        <div className='nav-icon-div flex-column center' onClick={handleNavigation}>  
            <GrHomeOption className={"nav-icon " + cssIconCLasses.homeIconClass} onClick={() => handleIconClick('home')}/>
            <p><small>Home</small></p>
        </div>
         <div className='nav-icon-div flex-column center'>  
            <FaUserFriends className={"nav-icon " + cssIconCLasses.friendIconClass} onClick={() => handleIconClick('friend') } />
            <p><small>Friends</small></p>
        </div>
        <div className='nav-icon-div flex-column center'>  
            <BiSolidNotification className={"nav-icon " + cssIconCLasses.notificationIconClass} onClick={() => handleIconClick('notification') } />
            <p><small>Notifications</small></p>
        </div>
        <div className='nav-icon-div flex-column center'>  
            <VscSettings className={"nav-icon " + cssIconCLasses.settingIconClass} onClick={() => handleIconClick('setting') }/>
            <p ><small>Settings</small></p>
        </div>
    </div>
  )
}

export default Nav