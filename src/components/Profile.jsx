import React, { useEffect, useState } from 'react';
import ProfileNav from './ProfileNav.jsx';
import Post from './Post.jsx';
import ProfileData from './ProfileData.jsx';
import UserPosts from './UserPosts.jsx';
const Profile = (props) => {

    const [postDisplay, setPostDisplay] = useState("none");
    const [userPostsDisplay, setUserPostsDisplay] = useState("none");

    const [userPostsReq, setUserPostReq] = useState(null);


    return (
        <div className='profile-main-div flex column '>
            <section className='app-content-section'>
                <section className='profile-data-section'>
                    <ProfileData handleDisplay={setPostDisplay} navDisplay={props.navDisplay} postRequest={userPostsReq}/>
                    <ProfileNav postRequest={userPostsReq} handlePostReq={setUserPostReq} userPostsDis={setUserPostsDisplay}/>
                    <Post display={postDisplay} handleDisplay={setPostDisplay} />
                    <UserPosts postRequest={userPostsReq} handlePostReq={setUserPostReq} display={userPostsDisplay}/>
                </section>
                <div className="setting-nav"></div>
            </section>
        </div>
    )
}

export default Profile