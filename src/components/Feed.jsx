import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import Popup from './pop-ups/Popup.jsx';

const Feed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {user, login} = location.state || {};
  const [popupDisplay, setPopupDisplay] = useState(null);



  useEffect(() => {
    if(!location.state.login){
      navigate("/");
    }
    if(user.firstLogin){
      setPopupDisplay("flex");
    } else{
      setPopupDisplay("none");
    }
  }, [])

  return (
    <div className={user.firstLogin ? 'feed-main-div feed-blur' : 'feed-main-div'}>
      welcome to your feed
      <Popup display={popupDisplay} id={user._id || location.state.user._id}/>
    </div>
  )
}

export default Feed