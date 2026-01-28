import React, { useEffect, useState } from 'react';
import { BsCameraFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import ProfileNav from './ProfileNav.jsx';
import Nav from './Nav.jsx';

const Profile = (props) => {
    const userId = localStorage.getItem('_id');
    const ids = JSON.parse(JSON.stringify(userId));
    const [profileData, setProfileData] = useState([]);

    useEffect(() => {
        props.navDisplay("flex")
        fetch(`http://localhost:3001/user/get-user/${ids}`, {
            method: "GET",
            headers: new Headers({ "content-type": "application/json" }),
        })
            .then(response => response.json())
            .then(data => {
                setProfileData([data.user]);
                console.log(data.user);
            });
    }, []);

    return (
        <div className='profile-main-div flex column '>
            <section className='app-content-section'>
                <section className='profile-data-section'>
                    {profileData.map(profile => {
                        return (
                            <div className='profile-data-div flex-column'>
                                <div className='profile-image-div flex'>
                                    <img className='profile-image' src={profile.image[0]} alt="Profile Image" />
                                    <div className="camera-icon-div flex center">
                                        <BsCameraFill className='camera-icon' />
                                    </div>
                                </div>
                                <h1 className='_text'> {profile.name}</h1>
                                <span>{profile.bio}</span>
                                <span><MdLocationPin className='location-icon' /> Unknown</span>
                            </div>
                        )
                    })}
                    <ProfileNav />
                </section>
                <div className="setting-nav"></div>
            </section>
        </div>
    )
}

export default Profile