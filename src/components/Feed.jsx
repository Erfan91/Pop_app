import React, { useEffect, useState } from 'react';
import { data, useLocation, useNavigate } from 'react-router-dom';
import Popup from './pop-ups/Popup.jsx';
import UserPosts from './profile-nav-comps/UserPosts.jsx';
import CommentSection from './CommentSection.jsx';


const Feed = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = localStorage.getItem('_id');
  const ids = JSON.parse(JSON.stringify(id));

  const [popupDisplay, setPopupDisplay] = useState(null);
  const [firstLogin, setFirstLogin] = useState(null);

  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [commentInfo, setCommentInfo] = useState([]);
  const [commentDisplay, setCommentDisplay] = useState("none");
  const [postId, setPostId] = useState(null);
  const [className, setClassName] = useState("feed-userPosts-main-div");

  useEffect(() => {
    fetch(`http://localhost:3001/user/user-info/${ids}`)
      .then(result => result.json())
      .then(data => {
        setUserData(data.user);
        if (data.user.firstLogin) {
          setPopupDisplay("flex");
          setFirstLogin(data.user.firstLogin);
        } else {
          setPopupDisplay("none");
        }
        fetch("http://localhost:3001/post/get-post")
          .then(result => result.json())
          .then(json => {
            setPosts(json.posts);
          })
      })
    

  }, [])

  const getPostsFunc = () => {
    fetch("http://localhost:3001/post/get-post")
      .then(result => result.json())
      .then(json => {
        setPosts(json.posts);
      })
  }


  const userPostsProps = {
    getPostsFunc,
    posts,
    setPostId,
    className: className,
    cardClass: "post-card feed-post-card",
    closeIconDisplay: "none",
    commentDisplay,
    setCommentDisplay
  }

  const commentSectionProps = {
    postId,
    userData,
    commentDisplay,
    setCommentDisplay,
    userId : ids
  
  } 


  return (
    <div className={firstLogin ? 'feed-main-div feed-blur' : 'feed-main-div flex center'}>
      <Popup display={popupDisplay} id={ids} />
      {firstLogin ? null :
        <div className="feed-main-child flex center">
          <UserPosts data={userPostsProps} />
          <CommentSection  data={commentSectionProps} />
        </div>
      }
    </div>
  )
}

export default Feed