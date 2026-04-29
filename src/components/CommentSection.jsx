import React, { useEffect, useState } from 'react'
import { IoArrowUpCircleOutline, IoArrowUpCircleSharp, IoClose } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { MdModeEdit, MdDelete } from "react-icons/md";
import moment from 'moment';
import EditDelete from './EditDelete';

const CommentSection = (props) => {
    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState('');
    const [inputIndex, setInputIndex] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:3001/post/post/${props.data.postId}`)
            .then(result => result.json())
            .then(data => {
                setPosts(data.post);
                // console.log(data, "data")
                // alert(data.message)
            })

    }, [props.data.postId]);

    const handleCommentChange = (e) => {
        setComment(e.target.value)
    }

    const sendComment = async () => {
        await fetch("http://localhost:3001/comment/add-comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ownerId: props.data.userData._id,
                text: comment,
                postId: props.data.postId
            })
        }).then(result => result.json())
            .then(data => {
                alert(data.message);
                setComment('');
                fetch(`http://localhost:3001/post/post/${props.data.postId}`)
                    .then(result => result.json())
                    .then(data => {
                        setPosts(data.post);
                    })
            })

    }


    return (
        <div className='comment-section-main-div flex-column center' style={{ display: props.data.commentDisplay }}>
            <IoClose className='comment-close-icon' onClick={() => props.data.setCommentDisplay("none")} />
            <span className='comment-header-span'>Comments {posts?.comments?.length}</span>
            {
                !posts?.comments?.length ? <div className="no-comments-div comment-section-child flex center">
                    <span>No comments yet, be the first to comment</span>
                </div> : <div className="comment-section-child">
                    {
                        posts?.comments?.toReversed().map((comment, index) => {
                            return (
                                <div className="comments-container flex-column around">

                                    <div className="comment-user-data flex between">
                                        <div className='flex between comment-name-holder'>
                                            <img src={comment.ownerId.image} className='comment-author-pro-pic' alt="author profile picture" />
                                            <span>{comment.ownerId.name}</span>
                                        </div>
                                        {
                                            props.data.userId === comment.ownerId._id ?
                                                <div className="comment-options-div">
                                                    <IoIosMore className='comment-options-icon' onClick={() => setInputIndex(inputIndex => inputIndex === index? null : index)} />
                                                {
                                                    inputIndex === index ? <EditDelete/> : null
                                                }

                                                </div> : null
                                        }
                                    </div>
                                    <div className="comment-text-div">
                                        <p className='comment-text'>{comment.text}</p>
                                        <p className='post-card-time-p comment-time-tag'><small>{moment(posts?.comments[index - 1]?.createdAt).startOf("hour").startOf("minute").fromNow().replace("minute", "m")}</small></p>
                                    </div>
                                </div>
                            )
                        })
                    }</div>
            }

            <div className="comment-input-div flex around center">
                <img src={props?.data?.userData?.image} className='comment-user-picture' alt="user profile picture" />
                <div className="comment-input-container flex between center">
                    <input type="text" placeholder='leave a comment' className='comment-input' value={comment} onChange={handleCommentChange} />
                    <button className={comment == "" ? "event-none-btn flex center " : "send-comment-btn flex center"} onClick={sendComment} >
                        <IoArrowUpCircleSharp className='comment-submit-icon' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CommentSection