import React, { useEffect, useState } from 'react'
import { IoArrowUpCircleOutline, IoClose } from "react-icons/io5";

const CommentSection = (props) => {
    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState('');
    useEffect(() => {
        fetch(`http://localhost:3001/post/post/${props.data.postId}`)
            .then(result => result.json())
            .then(data => {
                setPosts(data);
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
                        setPosts(data);
                    })
            })

    }


    return (
        <div className='comment-section-main-div flex-column' style={{ display: props.data.commentDisplay }}>
            <IoClose className='comment-close-icon' onClick={() => props.data.setCommentDisplay("none")} />
            {
                !posts?.comments?.length === 0? <div className="no-comments-div comments-container flex center">
                    <p>No comments yet, be the first to comment</p>
                </div> : <> {
                    posts?.comments?.map((comment, index) => {
                        return (
                            <div className="comments-container flex-column">
                                <div className="comment-user-data flex">
                                    <img src={comment.ownerId.image} alt="author profile picture" />
                                    <span>{comment.ownerId.name}</span>
                                    {/*  timestamps goes here */}
                                </div>
                                <div className="comment-text">
                                    <p>{comment.text}</p>
                                </div>
                            </div>
                        )
                    })
                }</>
            }

            <div className="comment-input-div flex around center">
                <img src={props?.data?.userData?.image} className='comment-user-picture' alt="user profile picture" />
                <div className="comment-input-container flex between center">
                    <input type="text" placeholder='leave a comment' className='comment-input' value={comment} onChange={handleCommentChange} />
                </div>
                <button className={comment == "" ? "event-none-btn flex center " : "send-comment-btn flex center"} onClick={sendComment} >
                    <IoArrowUpCircleOutline className='comment-submit-icon' />
                </button>
            </div>
        </div>
    )
}

export default CommentSection