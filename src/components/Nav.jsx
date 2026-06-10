import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSolidNotification } from "react-icons/bi";
import { VscSettings } from "react-icons/vsc";
import { RiSettingsFill } from "react-icons/ri";
import { GrHomeOption } from "react-icons/gr";
import { FaUserFriends } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import ChatBox from './ChatBox';
const Nav = (props) => {
    const navigate = useNavigate();
    const [display, setDisplay] = useState(false);
    const [chatDisplay, setChatDisplay] = useState(false);
    const id = localStorage.getItem('_id');
    const ids = JSON.parse(JSON.stringify(id));

    const [pfpClass, setPfpClass] = useState("nav-pfp")

    const [cssIconCLasses, setCssIconClasses] = useState({
        homeIconClass: "",
        friendIconClass: "",
        messageIconClass: "",
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
        iconName === 'setting' ? setPfpClass("nav-pfp pfp-border ") : setPfpClass("nav-pfp")
    };


    const handleNavigation = (des) => {
        navigate(`/${des}`, { state: { firstLogin: false, login: true, } })
    }

    return (
        <>
            <div className='nav-div flex' style={{ display: props.display }}>
                <div className='nav-icon-div flex-column center' onClick={() => handleNavigation('feed')}>
                    <GrHomeOption className={"nav-icon " + cssIconCLasses.homeIconClass} onClick={() => handleIconClick('home')} />
                    <p><small>Home</small></p>
                </div>
                <div className='nav-icon-div flex-column center' onClick={() => handleNavigation('friends')}>
                    <FaUserFriends className={"nav-icon " + cssIconCLasses.friendIconClass} onClick={() => handleIconClick('friend')} />
                    <p><small>Friends</small></p>
                </div>
                <div className='nav-icon-div flex-column center' onClick={() => { handleIconClick('message'); setChatDisplay(true); }}>
                    <IoChatbubbleEllipsesOutline className={"nav-icon " + cssIconCLasses.messageIconClass} />
                    <p><small>Messages</small></p>
                </div>
                <div className='nav-icon-div flex-column center' onClick={() => handleNavigation('notifications')}>
                    <BiSolidNotification className={"nav-icon " + cssIconCLasses.notificationIconClass} onClick={() => handleIconClick('notification')} />
                    <p><small>Notifications</small></p>
                </div>
                <div className='nav-icon-div flex-column center' onClick={() => handleNavigation('profile')}>
                    <img src={props.pfp} className={"nav-icon " + pfpClass + cssIconCLasses.settingIconClass} onClick={() => handleIconClick('setting')}/>
                    <p ><small>Profile</small></p>
                </div>
            </div>

            <ChatBox display={chatDisplay} onClose={() => setChatDisplay(false)} />
        </>
    )
}

export default Nav
