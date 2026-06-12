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

import EditDelete from '../EditDelete';
import Follow from '../Follow';
import CommentSection from '../CommentSection';
import MoodBubble from '../MoodAnimations';

// Truncates long captions like Instagram/Facebook with a "see more" toggle.
const PostCaption = ({ text, limit = 150 }) => {
    const [expanded, setExpanded] = useState(false);
    if (!text) return null;
    if (text.length <= limit) return <span>{text}</span>;
    return (
        <span>
            {expanded ? text : text.slice(0, limit).trimEnd() + "… "}
            <span className='see-more-toggle' onClick={() => setExpanded(prev => !prev)}>
                {expanded ? " see less" : "see more"}
            </span>
        </span>
    );
};

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
    const [user, setUser] = useState(null)


    const navigate = useNavigate()

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
                    props.getPostsFunc();
                    setIconClass('heart-icon heart-icon-filled');
                    setIsLiked(true);
                } else {
                    setIconClass('heart-icon');
                    setIsLiked(false);

                }
            })
        props.getPostsFunc();
    }

    const deletePost = async id => {
        if (isDelete) {
            await fetch(`http://localhost:3001/post/delete-post/${id}`, {
                method: "DELETE",
                headers: new Headers({ "content-type": "application/json" }),
            }).then(result => result.json())
                .then(data => {
                    props.getPostsFunc();
                })
        } else {
            null
        }
    }

    const editDltProps = {
        content: "post",
        setText,
        text,
        refMain: props.getPostsFunc,
    }

    const [commentDisplay, setCommentDisplay] = useState("none");

    const commentSectionProps = {
        postId,
        userData: user,
        commentDisplay,
        setCommentDisplay,
        userId: ids,
        getPostsFunc: () => {
            fetch(`http://localhost:3001/post/user-posts/${postId}`, {
                credentials: "include"
            })
                .then(res => res.json())
                .then(data => setPosts(data.posts))
                .catch(err => console.log(err))
        }
    }

    return (
        <div className={props?.length == 1 ? props.className + " flex-column between" : props.className + " between"}
            style={
                {
                    display: props.display,
                }
            }>
            <div className='userPosts-icon-div flex center'
                style={
                    { display: props.closeIconDisplay }
                }
                onClick={() => {
                    props.setDisplay("none");
                    props.proDataDisplay("flex");
                }}>
                <IoClose className='userPosts-close-icon'
                />
            </div>
            {
                props.posts.toReversed().map((posts, index) => {

                    return (
                        <div className={props.cardClass + " flex-column between"}>
                            <div className="post-card-header flex between">
                                <div className="post-card-pfp-div flex" onClick={() => navigate(`/profile/${posts.ownerId._id}`)}>
                                    {posts.mood && posts.mood.length > 0 ? (
                                        <div className="post-card-mood-pfp">
                                            <MoodBubble
                                                mood={posts.mood[0]}
                                                user={posts.ownerId}
                                                onClick={() => { }}
                                                size={42}
                                            />
                                        </div>
                                    ) : (
                                        <img src={posts.ownerId.image[0]} alt="user profile picture" className='post-card-pfp border-circle' />
                                    )}
                                    <div className="flex-column ">
                                        <span>{posts.ownerId.name}</span>
                                        <p className='post-card-time-p'><small>{moment(posts.createdAt).startOf("hour").startOf("minute").fromNow()}</small></p>
                                    </div>
                                </div>
                                <div className="options-icon-div">
                                    {
                                        posts.ownerId._id === ids && <SlOptions className='userPosts-options-icon' onClick={() => setInputIndex(inputIndex => inputIndex === index ? null : index)} />
                                    }

                                    {inputIndex === index &&
                                        <EditDelete data={{
                                            ...editDltProps,
                                            index: index,
                                            setIndex: setInputIndexB,
                                            inputIndex: inputIndexB,
                                            postId: posts._id,
                                            description: posts.description
                                        }} />

                                    }

                                    {

                                        posts.ownerId.followers?.includes(ids) ? null : <Follow data={{ posts, ids, followedId: posts.ownerId._id }} />
                                    }
                                </div>
                            </div>
                            <div className="post-card-image-div flex-column center" key={index} style={{ display: inputIndexB === index ? "none" : "flex" }}>
                                <img src={posts.content} className='post-card-image' alt="post content photo" />
                                {
                                    inputIndexB === index ? null :
                                        <div className="post-reactions-div flex between">
                                            <div className="like-icon-div post-action-div flex between align-center" onClick={props.getPostsFunc}>
                                                <BsHeart className={posts.likes.includes(ids) ? 'heart-icon heart-icon-filled' : 'heart-icon'} onClick={() => handleLikeAction(posts._id)} />
                                                <span className='count-span'>{posts.likes.length}</span>
                                            </div>
                                            <div className="comment-icon-div flex align-center between" >
                                                <IoChatbubbleOutline className='comment-icon' onClick={() => {
                                                    setPostId(posts._id);
                                                    setCommentDisplay("flex");
                                                    setUser(props.userData)
                                                }} />
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
                                    inputIndexB === index ? <textarea name="text" className='post-edit-textarea' onChange={handleText} value={text} /> : <PostCaption text={posts.description} />
                                }
                            </div>
                        </div>
                    )
                })
            }
            <CommentSection {...commentSectionProps} />
        </div>
    )
}

export default UserPosts