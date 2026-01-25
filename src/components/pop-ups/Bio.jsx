import React, {useState, useEffect} from 'react';

const Bio = (props) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    if(e.target.value == ""){
      props.buttonCCLass("invalid-button");
    } else {
      props.buttonCCLass("btn-grad");
    }
    props.bio(e.target.value);
  };


  return (
    <div className='bio-main-div popup-main-child flex-column' style={{display: props.display}}>
        <h2>Bio</h2>
        <textarea 
        className='bio-textarea' 
        maxLength={150} 
        onChange={handleChange}
        placeholder="Write a short bio about yourself (max 150 characters)"/>

    </div>
  )
}

export default Bio