import React from 'react'

const ProfileNav = (props) => {

    const handlePostsDisplay = async () => {
        await props.getUPosts();
       setTimeout(()=>{
        props.setInfoDisplay("none")
       }, 3000)
    }

    return (
        <div className="profile-nav-div flex" >
            <div className="profile-nav-main-child flex">
                <div className="pro-nav-option-div flex" onClick={handlePostsDisplay}>
                    <span>Posts</span>
                </div>
                <div className="pro-nav-option-div flex">
                    <span>Pictures</span>
                </div>
                <div className="pro-nav-option-div flex">
                    <span>About</span>
                </div>
                <div className="pro-nav-option-div flex">
                    <span>Prefrences</span>
                </div>
            </div>
        </div>
    )
}

export default ProfileNav