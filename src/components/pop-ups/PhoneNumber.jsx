import React, {useEffect, useState} from 'react'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


const PhoneNumber = (props) => {
  const [value, setValue] = useState();

  useEffect(() => {
    if (props.isValid){
      if (value && value.length >= 10){
        props.buttonCCLass('btn-grad');
      } else {
        props.buttonCCLass('invalid-button');
      }
    }
    props.number(value);
  }, [value]);

  return (
    <div className='phoneNum-main-div popup-main-child flex-column' style={{display: props.display}}>
        <h2>Phone Number</h2>
        <div className="phone-input-div flex">
        <PhoneInput country='af' className='phoneNum-input' value={value} onChange={setValue} enableSearch={true} placeholder="Enter your phone number"/>
        </div>
    </div>
  )
}

export default PhoneNumber
