import React from 'react'

const ProfileNav = (props) => {
    return (
        <div className="profile-nav-div " >
            <div className="profile-nav-main-child flex">
                <div className="pro-nav-option-div flex" onClick={() => {
                    props.userPostsDis("flex");
                    props.getUPosts()
                }}>
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