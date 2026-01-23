import React, {useState, useEffect} from 'react'
import GettingStarted from './GettingStarted.jsx'
import Bio from './Bio.jsx';
import PhoneNumber from './PhoneNumber.jsx';
import ProfilePicture from './ProfilePicture.jsx';

const Popup = (props) => {
  const [gsDisplay, setGsDisplay] = useState("flex");
  const [bioDisplay, setBioDisplay] = useState("none");
  const [phnDisplay, setPhnDisplay] = useState("none");
  const [pfpDisplay, setPfpDisplay] = useState("none");


   const handledisplay = (e) => {
    e.preventDefault();
   if ( gsDisplay === "flex") {
      setGsDisplay('none');
      setBioDisplay('flex');
    } else if (bioDisplay === "flex") {
      setBioDisplay('none');
      setPhnDisplay('flex');
    } else if (phnDisplay === "flex") {
      setPhnDisplay('none');
      setPfpDisplay('flex');}
  }

  return (
    <div className='pop-up' style={{display: props.display}}>
        <GettingStarted display={gsDisplay}/>
        <Bio display={bioDisplay} />
        <PhoneNumber display={phnDisplay} />
        <ProfilePicture display={pfpDisplay} />
        <button className="btn-grad"
        onClick={handledisplay}>Get Started</button>
        {/* <div className="big-dot"/>
        <div className="big-dot"/>
        <div className="big-dot"/> */}
    </div>
  )
}

export default Popup