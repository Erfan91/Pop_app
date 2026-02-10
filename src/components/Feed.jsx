import React, { useEffect, useState } from 'react';
import { data, useLocation, useNavigate } from 'react-router-dom';
import Popup from './pop-ups/Popup.jsx';

const Feed = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = localStorage.getItem('_id');
  const ids = JSON.parse(JSON.stringify(id));

  const [popupDisplay, setPopupDisplay] = useState(null);
  const [firstLogin, setFirstLogin] = useState(null);


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
      })

  }, [])

  return (
    <div className={firstLogin ? 'feed-main-div feed-blur' : 'feed-main-div'}>
      welcome to your feed
      <Popup display={popupDisplay} id={ids} />
    </div>
  )
}

export default Feed