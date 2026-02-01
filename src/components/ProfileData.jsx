import React, {useState, useEffect} from 'react'
import { BsCameraFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import { RiChatAiLine } from "react-icons/ri";

const ProfileData = (props) => {

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
                });
        }, []);
    
    return (
        <>
            {profileData.map(profile => {
                return (
                    <div className='profile-data-div flex-column'>
                        <div className='profile-image-div flex'>
                            <img className='profile-image' src={profile.image[0]} alt="Profile Image" />
                            <div className="camera-icon-div cam-icon-div-2 flex center" onClick={() => props.handleDisplay("flex")}>
                                <RiChatAiLine className='chat-iccon' />
                            </div>
                            <div className="camera-icon-div flex center">
                                <BsCameraFill className='camera-icon' />
                            </div>
                        </div>
                        <h1 className='_text'> {profile.name}</h1>
                        <span>@{profile.username}</span>
                        <span>{profile.bio}</span>
                        <span><MdLocationPin className='location-icon' /> Unknown</span>
                    </div>
                )
            })}
        </>
    )
}

export default ProfileData