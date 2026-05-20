import React, {useEffect, useState} from 'react';

const Follow = (props) => {
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollow = async () => {
    await fetch(`http://localhost:3001/user/add-follow/`, {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        followerId: props.data.ids,
        followedId: props.data.followedId
      })
    }).then(result => result.json())
      .then(data => {
        if (data.state) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      })
  }

  return (
    <div className='follow-main-div'>
        <button className='follow-btn' style={{display: props.data.posts.ownerId._id==props.data.ids? "none": "flex"}} onClick={handleFollow}>
             {isFollowing ? "Following" : "Follow"}
        </button>
    </div>
  )
}

export default Follow