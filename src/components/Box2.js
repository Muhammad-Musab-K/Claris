import React from 'react'
import { useNavigate } from 'react-router-dom';
import img from "../assests/clarisimg.jpeg"

function Box2({ id, name, image }) {

    const navigate = useNavigate()
    const handleClick = () => navigate(`/bookings/${id}`)

    return (
        <>
            <div
                id={id}
                className='bg-[#CCCCCC] rounded-md w-72 md:w-[400px] h-48 '
                onClick={handleClick}>
                <img className='w-72 md:w-[429px] h-36 rounded-md object-cover' src={image || img} alt="" />
                <p className='mt-2 font-bold text-lg md:text-2xl  text-center'>{name}</p>
            </div>

        </>
    )
}

export default Box2
