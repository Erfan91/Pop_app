import React, { useEffect, useState } from 'react';
import ProfileNav from './ProfileNav.jsx';
import Post from './Post.jsx';
import ProfileData from './ProfileData.jsx';
import UserPosts from './profile-nav-comps/UserPosts.jsx';
import UserPics from './profile-nav-comps/UserPics.jsx';
import InfoMessage from './InfoMessage.jsx';


const Profile = (props) => {
    const id = localStorage.getItem('_id');
    const ids = JSON.parse(JSON.stringify(id));
    const [posts, setPosts] = useState([]);
    const [pics, setPics] = useState([]);

    const [postDisplay, setPostDisplay] = useState("none");
    const [userPostsDisplay, setUserPostsDisplay] = useState("none");
    const [userPicsDisplay, setUserPicsDisplay] = useState("none");
    const [proDataDisplay, setProDataDisplay] = useState("flex")
    const [infoDisplay, setInfoDisplay] = useState("none");

    const [infoMessage, setInfoMessage] = useState(null);
    const [infoContext, setInfoContext]  = useState(null);

    const [arrayLength, setArrayLength] = useState(null)



    const getUserPosts = () => {
        fetch(`http://localhost:3001/post/user-posts/${ids}`)
            .then(result => result.json())
            .then(data => {
                setPosts(data.posts);
                setArrayLength(data.posts.length)
                if (data.posts.length === 0) {
                    setInfoDisplay("flex");
                    setInfoMessage("user have no posts yet");
                    setInfoContext("Share a note...");
                    setTimeout(() => {
                        setInfoDisplay("none")
                    }, 3000)
                } else {
                    setProDataDisplay("none");
                    setUserPicsDisplay("none");
                    setPostDisplay("none")
                    setUserPostsDisplay("flex");
                }
            })


    }


    const getUserPics = () => {

        fetch(`http://localhost:3001/post/user-pics/${ids}`)
            .then(result => result.json())
            .then(data => {
                setPics(data.pics);
                if (data.pics.length === 0) {
                    setInfoDisplay("flex");
                    setInfoMessage("You have no picture posts yet");
                    setInfoContext("Share a picture");
                    setTimeout(() => {
                        setInfoDisplay("none")
                    }, 3000)
                } else {
                    setProDataDisplay("none");
                    setUserPostsDisplay("none");
                    setPostDisplay("none")
                    setUserPicsDisplay("flex");
                }

            })

    }

    const userPostsProps = {
        display: userPostsDisplay,
        setDisplay: setUserPostsDisplay,
        proDataDisplay: setProDataDisplay,
        getPostsFunc: getUserPosts,
        posts,
        length: arrayLength,
        className: "userPosts-main-div",
        cardClass: "post-card"
    }


    return (
        <div className='profile-main-div flex column '>
            <section className='app-content-section'>
                <section className='profile-data-section'>
                    <ProfileData handleDisplay={setPostDisplay} navDisplay={props.navDisplay} display={proDataDisplay} />
                    <UserPosts data={userPostsProps} />
                    <UserPics display={userPicsDisplay} handleDisplay={setUserPicsDisplay} handleProDataDis={setProDataDisplay}  data={pics}/>
                    <ProfileNav userPostsDis={setUserPostsDisplay} getUPosts={getUserPosts} getUPics={getUserPics} arrayLength={arrayLength} setMessage={setInfoMessage} setInfoDisplay={setInfoDisplay} />
                    <Post display={postDisplay} handleDisplay={setPostDisplay} />
                    <InfoMessage display={infoDisplay} info={infoMessage} context={infoContext}/>
                </section>
                <div className="setting-nav"></div>
            </section>
        </div>
    )
}

export default Profile