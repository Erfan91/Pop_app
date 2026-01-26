import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GettingStarted from './GettingStarted.jsx'
import Bio from './Bio.jsx';
import PhoneNumber from './PhoneNumber.jsx';
import ProfilePicture from './ProfilePicture.jsx';

const Popup = (props) => {

  const [gsDisplay, setGsDisplay] = useState("flex");
  const [bioDisplay, setBioDisplay] = useState("none");
  const [phnDisplay, setPhnDisplay] = useState("none");
  const [pfpDisplay, setPfpDisplay] = useState("none");

  const [btnText, setBtnText] = useState("Get Started");
  const [btnClass, setBtnClass] = useState("btn-grad");

  const [isValid, setIsValid] = useState(false);

  const id = JSON.stringify(localStorage.getItem('_id'));
  const ids = JSON.parse(id);

  const [bio, setBio] = useState(null);
  const [number, setNumber] = useState(null);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const sendProfileData = () => {

    fetch("http://localhost:3001/user/create-profile", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        _id: ids,
        bio,
        number,
        image,
      })
    }).then(res => res.json())
      .then(data => {
        if (data) {
          alert(data.message);
          navigate("/profile")
        }
      });
  };

  const handledisplay = (e) => {
    e.preventDefault();
    if (gsDisplay === "flex") {
      setGsDisplay('none');
      setBioDisplay('flex');
      setBtnText('Next');
      setBtnClass('invalid-button');
    } else if (bioDisplay === "flex") {
      setBioDisplay('none');
      setPhnDisplay('flex');
      setBtnClass('invalid-button');
      setIsValid(true)
    } else if (phnDisplay === "flex") {
      setPhnDisplay('none');
      setPfpDisplay('flex');
      setBtnText('Finish');
    } else if (pfpDisplay === "flex") {
      sendProfileData();
    }
  }

  const buttonClass = (className) => {
    setBtnClass(className);
  }




  return (
    <div className='pop-up' style={{ display: props.display }}>
      <GettingStarted display={gsDisplay} />
      <Bio display={bioDisplay} buttonCCLass={buttonClass} bio={setBio} />
      <PhoneNumber display={phnDisplay} buttonCCLass={buttonClass} number={setNumber} isValid={isValid} />
      <ProfilePicture display={pfpDisplay} image={setImage} />
      <button className={"btn-grad-exp " + btnClass}
        onClick={handledisplay}>{btnText}</button>
      {/* <div className="big-dot"/>
        <div className="big-dot"/>
        <div className="big-dot"/> */}
    </div>
  )
}

export default Popup