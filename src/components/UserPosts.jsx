import React, { useState, useEffect } from 'react';
import moment from "moment";
import { IoClose} from "react-icons/io5";
import { SlOptions } from "react-icons/sl";

const UserPosts = (props) => {
    const id = localStorage.getItem('_id');
    const ids = JSON.parse(JSON.stringify(id));



    return (
        <div className='userPosts-main-div column-reverse between' style={{ display: props.display }}>
            <div className='userPosts-icon-div flex center' onClick={() => props.setDisplay("none")}>
                <IoClose className='userPosts-close-icon' />
            </div>
            {
                props.userPosts.map((posts, index) => {

                    return (
                        <div className="post-card flex-column between">
                            <div className="post-card-header flex between">
                                <div className="post-card-pfp-div flex between">
                                    <img src={posts.ownerId.image[0]} alt="user profile picture" className='post-card-pfp border-circle' />
                                    <div className="flex-column ">
                                        <span>{posts.ownerId.name}</span>
                                        <p className='post-card-time-p'><small>{moment(posts.createdAt).startOf("hour").startOf("minute").fromNow()}</small></p>
                                    </div>
                                </div>
                                <SlOptions className='userPosts-options-icon' />
                            </div>
                            <div className="post-card-image-div flex center" key={index}>
                                <img src={posts.content} className='post-card-image' alt="post content photo" />
                            </div>
                            <div className="post-card-caption-div flex-column">
                                <span>{posts.description}</span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UserPosts