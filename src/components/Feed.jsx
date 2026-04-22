import React, { useEffect, useState } from 'react';
import { data, useLocation, useNavigate } from 'react-router-dom';
import Popup from './pop-ups/Popup.jsx';
import UserPosts from './profile-nav-comps/UserPosts.jsx';


const Feed = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = localStorage.getItem('_id');
  const ids = JSON.parse(JSON.stringify(id));

  const [popupDisplay, setPopupDisplay] = useState(null);
  const [firstLogin, setFirstLogin] = useState(null);

  const [posts, setPosts] = useState([]);
  const [className, setClassName] = useState("feed-userPosts-main-div");

  useEffect(() => {
    fetch(`http://localhost:3001/user/user-info/${ids}`)
      .then(result => result.json())
      .then(data => {
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
    // setClassName("feed-userPosts-main-div")

  }, [])

  const getPosts = () => {
    fetch("http://localhost:3001/post/get-post")
      .then(result => result.json())
      .then(json => {
        setPosts(json.posts);
      })
  }


  const userPostsProps = {
    getPosts,
    posts,
    className: className,
    cardClass: "post-card feed-post-card"
  }



  return (
    <div className={firstLogin ? 'feed-main-div feed-blur' : 'feed-main-div flex center'}>
      <Popup display={popupDisplay} id={ids} />
      <div className="feed-main-child flex center">
        <UserPosts data={userPostsProps} />
      </div>
    </div>
  )
}

export default Feed