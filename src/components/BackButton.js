import React from 'react'
import Arrow from "../assests/back.png"
import { useNavigate } from 'react-router-dom';


function BackButton() {
    const navigate = useNavigate();
    const goBack = () => navigate(-1)

    return (
        <div onClick={goBack}>
            <img className='w-11 h-12' src={Arrow} alt="" />
        </div>
    )
}

export default BackButton
