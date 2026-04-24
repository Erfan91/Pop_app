import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { IoClose, IoChatbubbleOutline, IoCheckmarkOutline } from "react-icons/io5";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { PiShareFatLight } from "react-icons/pi";
import { SlOptions } from "react-icons/sl";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FcCancel } from "react-icons/fc";

const UserPosts = (props) => {
    const id = localStorage.getItem('_id');
    const ids = JSON.parse(JSON.stringify(id));

    const [inputIndex, setInputIndex] = useState(null);
    const [inputIndexB, setInputIndexB] = useState(null);
    const [text, setText] = useState("");
    const [postId, setPostId] = useState(null);
    const [edit, setEdit] = useState(null);
    const [isDelete, setDelete] = useState(null);
    const [posts, setPosts] = useState([]);
    const [likes, setLikes] = useState(null);
    const [isliked, setIsLiked] = useState(null);
    const [iconClass, setIconClass] = useState(null);


    const handleText = e => {
        e.preventDefault();
        setText(e.target.value)
    }

    const updatePost = async () => {
        if (edit) {
            await fetch(`http://localhost:3001/post/update-post/${postId}`, {
                method: "PATCH",
                headers: new Headers({ "content-type": "application/json" }),
                body: JSON.stringify({
                    description: text,
                })
            }).then(result => result.json())
                .then(data => {
                    if (data.state) {

                        setText(data.message);
                    } else {
                        alert(data.message)
                    }
                })
        } else {
            null
        }

    }


    const handleLikeAction = async (postId) => {
        await fetch("http://localhost:3001/post/like-post", {
            method: "PUT",
            headers: new Headers({ "content-type": "application/json" }),
            body: JSON.stringify({
                postId,
                userId: ids
            })
        }).then(result => result.json())
            .then(data => {
                if (data.state) {
                    props.data.getPostsFunc();
                    setIconClass('heart-icon heart-icon-filled');
                    setIsLiked(true);
                } else {
                    setIconClass('heart-icon');
                    setIsLiked(false);
                    console.log(data.message, "error like action");
                }
            })
        props.data.getPostsFunc();
    }

    const deletePost = async id => {
        if (isDelete) {
            await fetch(`http://localhost:3001/post/delete-post/${id}`, {
                method: "DELETE",
                headers: new Headers({ "content-type": "application/json" }),
            }).then(result => result.json())
                .then(data => {
                    props.data.getPostsFunc();
                })
        } else {
            null
        }
    }

    return (
        <div className={props.data.length == 1 ? props.data.className + " flex-column between" : props.data.className + " column-reverse between"}
            style={
                {
                    display: props.data.display,
                }
            }>
            <div className='userPosts-icon-div flex center'
                style={
                    { display: props.data.closeIconDisplay }
                }
                onClick={() => {
                    props.data.setDisplay("none");
                    props.data.proDataDisplay("flex");
                }}>
                <IoClose className='userPosts-close-icon'
                />
            </div>
            {
                props.data.posts.map((posts, index) => {

                    return (
                        <div className={props.data.cardClass + " flex-column between"}>
                            <div className="post-card-header flex between">
                                <div className="post-card-pfp-div flex between">
                                    <img src={posts.ownerId.image[0]} alt="user profile picture" className='post-card-pfp border-circle' />
                                    <div className="flex-column ">
                                        <span>{posts.ownerId.name}</span>
                                        <p className='post-card-time-p'><small>{moment(posts.createdAt).startOf("hour").startOf("minute").fromNow()}</small></p>
                                    </div>
                                </div>
                                <div className="options-icon-div">
                                    <SlOptions className='userPosts-options-icon' onClick={() => setInputIndex(inputIndex => inputIndex === index ? null : index)} />
                                    {inputIndex === index && <div className="post-card-dropdown flex-column around">
                                        <button
                                            className='post-option-btn'
                                            onClick={() => {
                                                setInputIndexB(inputIndexB => inputIndexB === index ? null : index);
                                                setText(posts.description);
                                                setPostId(posts._id)
                                            }}>
                                            {
                                                inputIndexB == index ? <FcCancel className='delete-icon cancel-icon' /> : <MdModeEdit className='edit-icon' />
                                            }
                                        </button>
                                        {
                                            inputIndexB == index ?

                                                <button className='update-post-button post-option-btn flex center' onClick={async (e) => {
                                                    e.preventDefault();
                                                    setEdit(true);
                                                    await updatePost();
                                                }}><IoMdCheckmarkCircleOutline className='edit-icon checkmark-icon' /></button> :
                                                <>
                                                    <button className='delete-button post-option-btn flex center' onClick={inputIndexB === index ? null : async () => {
                                                        await setDelete(true);

                                                    }}><MdDelete className='delete-icon' /></button>
                                                    {
                                                        isDelete ?
                                                            <div className="confirm-delete-div flex-column around">
                                                                <p>Confirm delete</p>
                                                                <div className="confirm-btn-div flex between">
                                                                    <button className='post-cancel-btn' onClick={e => {
                                                                        e.preventDefault();
                                                                        setDelete(false);
                                                                    }}><IoClose className='cancel-icon' /></button>
                                                                    <button className='confirm-btn' onClick={async e => {
                                                                        e.preventDefault();
                                                                        await deletePost(posts._id)
                                                                    }}><IoCheckmarkOutline className='confirm-icon' /></button>
                                                                </div>
                                                            </div>
                                                            : null
                                                    }
                                                </>
                                        }

                                    </div>}
                                </div>
                            </div>
                            <div className="post-card-image-div flex-column center" key={index} style={{ display: inputIndexB === index ? "none" : "flex" }}>
                                <img src={posts.content} className='post-card-image' alt="post content photo" />
                                {
                                    inputIndexB === index ? null :
                                        <div className="post-reactions-div flex between">
                                            <div className="like-icon-div post-action-div flex between align-center" onClick={props.data.getPostsFunc}>
                                                <BsHeart className={posts.likes.includes(ids) ? 'heart-icon heart-icon-filled' : 'heart-icon'} onClick={() => handleLikeAction(posts._id)} />
                                                <span className='count-span'>{posts.likes.length}</span>
                                            </div>
                                            <div className="comment-icon-div flex align-center between" >
                                                <IoChatbubbleOutline className='comment-icon' onClick={props.data.setPostId(posts._id)}/>
                                                <span className='count-span'>{posts.comments.length}</span>
                                            </div>
                                            <div className="share-icon-div flex align-center center">
                                                <PiShareFatLight className='share-icon' />
                                            </div>
                                        </div>
                                }

                            </div>
                            <div className="post-card-caption-div flex">
                                {
                                inputIndexB === index ? <textarea name="text" className='post-edit-textarea' onChange={handleText} value={text} /> : <span>{posts.description}</span>
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UserPosts