import React from 'react'
import { Button } from 'rsuite'
import { resetState, selectIsLoggedIn } from '../redux/LoginSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logo from "../assests/logo.png"

function Navbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const token = useSelector(selectIsLoggedIn)

    const handleSingout = () => {
        dispatch(resetState())
        navigate("/login")
    }
    return (
        <nav className=" relative px-2 h-14 w-full bg-[#FF004F] text-white md:font-semibold text-3xl flex items-center justify-center">
            <img className='absolute left-4 h-10' src={logo} alt="" />
            <h1>Claris Admin</h1>
            {token ? <Button className='absolute right-2' onClick={handleSingout}>Signout</Button> : null}
        </nav>
    )
}

export default Navbar
