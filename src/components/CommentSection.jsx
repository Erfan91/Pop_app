import React, { useEffect } from 'react'
import { useState } from 'react'

const CommentSection = (props) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/post/post/${props.postId}`)
        .then(result => result.json())
        .then(data => {
            setPosts(data);
            // alert(data.message)
        })

    }, [props.postId])

    return (
        <div className='comment-section-main-div flex-column'>
            {
                posts?.comments?.map((comment, index) => {
                    return(
                        <div className="comment-div flex-column">
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
            }
            <div className="comment-input-div flex-column center">
                <input type="text" placeholder='leave a comment' className='comment-input' />
            </div>
        </div>
    )
}

export default CommentSection