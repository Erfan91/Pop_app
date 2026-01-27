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
        <div className='profile-main-div flex column '>
            <section className='app-content-section'>
            <section className='profile-data-section'>
                {profileData.map(profile => {
                    console.log(profile.image[1]);
                    return (
                        <div className='profile-data-div flex-column'>
                            <div className='profile-image-div flex'>
                                <img className='profile-image' src={profile.image[0]} alt="Profile Image" />
                            </div>
                            <h1 className='_text'> {profile.name}</h1>
                            <span>{profile.bio}</span>

                        </div>
                    )
                })}
            </section>
            </section>
        </div>
    )
}

export default Profile