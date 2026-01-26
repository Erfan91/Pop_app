import React, { useEffect, useState } from 'react';


const Profile = () => {
    const userId = localStorage.getItem('_id');
    const ids = JSON.parse(JSON.stringify(userId));
    const [profileData, setProfileData] = useState([]);

    useEffect(() => {
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
        <div className='profile-main-div'>
            {profileData.map(profile => {
                console.log(profile.image[1]);
                return (
                    <>
                        <h1>{profile.name}</h1>
                        <span>{profile.bio}</span>
                        <span>{profile.number}</span>
                        <div>
                            <img  src={profile.image[1]} alt="Profile Image" />
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default Profile