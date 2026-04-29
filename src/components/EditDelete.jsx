import React, { useState, useEffect } from 'react'
import { MdModeEdit, MdDelete } from "react-icons/md";
import { IoMdCheckmarkCircleOutline,  } from "react-icons/io";
import { IoClose, IoCheckmarkOutline } from 'react-icons/io5';
import { FcCancel } from "react-icons/fc";

const EditDelete = () => {
    return (
        <div>

            <button className='post-option-btn'>
                <FcCancel className='delete-icon cancel-icon' />
                <MdModeEdit className='edit-icon' />
            </button>
            <button className='update-post-button post-option-btn flex center' >
                <IoMdCheckmarkCircleOutline className='edit-icon checkmark-icon' />
            </button> 
            <button className='delete-button post-option-btn flex center' >
                <MdDelete className='delete-icon' />
            </button>

            <div className="confirm-delete-div flex-column around">
                <p>Confirm delete</p>
                <div className="confirm-btn-div flex between">
                    <button className='post-cancel-btn' ><IoClose className='cancel-icon' /></button>
                    <button className='confirm-btn'><IoCheckmarkOutline className='confirm-icon' /></button>
                </div>
            </div>
        </div>
    )
}

export default EditDelete