import React, { useEffect, useState } from 'react';
import ProfileNav from './ProfileNav.jsx';
import Post from './Post.jsx';
import ProfileData from './ProfileData.jsx';
import UserPosts from './UserPosts.jsx';
const Profile = (props) => {
    const id = localStorage.getItem('_id');
    const ids = JSON.parse(JSON.stringify(id));
    const [posts, setPosts] = useState([]);

    const [postDisplay, setPostDisplay] = useState("none");
    const [userPostsDisplay, setUserPostsDisplay] = useState("none");
    const [proDataDisplay, setProDataDisplay] = useState("flex")
    
    const [arrayLength, setArrayLength] = useState(null)



    const getUserPosts = () => {
        fetch(`http://localhost:3001/post/user-posts/${ids}`)
            .then(result => result.json())
            .then(data => {
                setPosts(data.posts);
                setArrayLength(data.posts.length)
                console.log(data.posts.length)
            })

            setProDataDisplay("none")
    }


    return (
        <div className='profile-main-div flex column '>
            <section className='app-content-section'>
                <section className='profile-data-section'>
                    <ProfileData handleDisplay={setPostDisplay} navDisplay={props.navDisplay} display={proDataDisplay} />
                    <UserPosts display={userPostsDisplay} userPosts={posts} setDisplay={setUserPostsDisplay} proDataDisplay={setProDataDisplay} getPostsFunc={getUserPosts} length={arrayLength}/>
                    <ProfileNav userPostsDis={setUserPostsDisplay} getUPosts={getUserPosts} />
                    <Post display={postDisplay} handleDisplay={setPostDisplay} />
                </section>
                <div className="setting-nav"></div>
            </section>
        </div>
    )
}

export default Profile