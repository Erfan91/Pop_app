import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import { HiOutlineUpload } from "react-icons/hi";
import { MdOutlineAddAPhoto } from "react-icons/md";

const ProfilePicture = (props) => {
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageChange = e => {
    const [file] = e.target.files;
    if (file){
      const reader = new FileReader();
      const {current} = uploadedImage;

      setImage(e.target.files[0]);
      setSelectedImg(URL.createObjectURL(e.target.files[0]));
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      }
      reader.readAsDataURL(file);
    }
  }

  const handleUploadImage = e => {
    e.preventDefault();
    const formaData = new FormData();
    formaData.append("myImage", image);
    axios({
      method: "post",
      url: "http://localhost:3001/user/upload-image",
      data: formaData,
    })
    .then(res => {
      const {data} = res;
      setFile(data.url);
      props.image(data.url);
      alert(data.url)
    })
    .catch(err => {
      console.log(err)
    })
    // imageUploader.current.click();
  }

  return (
    <div className='pfp-main-div popup-main-child flex-column' style={{display: props.display}}>
      <h2>Upload Profile Picture</h2>
      <input type="file" accept='/image' onChange={handleImageChange} ref={imageUploader} style={{display: 'none'}}/>
      <div className="pfp-upload-div flex-column" onClick={() =>{
        imageUploader.current.click();
      }}>
        {selectedImg ? <img src={selectedImg} ref={uploadedImage} className='pfp-image'/> : <MdOutlineAddAPhoto className='add-photo-icon'/>}
      {/* <img ref={uploadedImage} className='pfp-image'/>   */}
      </div>
      <button className='pfp-upload-button' onClick={handleUploadImage}><HiOutlineUpload className='upload-icon'/></button>
    </div>
  )
}

export default ProfilePicture