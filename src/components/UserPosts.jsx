import React, { useState, useEffect } from 'react'

const UserPosts = (props) => {
    const id = localStorage.getItem('_id');
    const ids = JSON.parse(JSON.stringify(id));
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        fetch(`http://localhost:3001/post/user-posts/${ids}`)
            .then(result => result.json())
            .then(data => {
                console.log(data.message, "data")
                setPosts(data.posts);
            })
    }, [props.postRequest])

    return (
        <div className='userPosts-main-div flex-column center' style={{display: props.display}}>
            {
                posts.map((post, index) => {
                    return (
                        <div className="post-card">
                            <h1>{post.description}</h1>
                            <span>@{post.ownerId?.username}</span>
                            <div className="image-div" key={index}>
                                <img src={post.content} alt="post content photo" />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UserPosts