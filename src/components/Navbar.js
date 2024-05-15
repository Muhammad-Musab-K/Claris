import React from 'react'
import { Button } from 'rsuite'
import { resetState, selectIsLoggedIn } from '../redux/LoginSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Navbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const token = useSelector(selectIsLoggedIn)

    const handleSingout = () => {
        dispatch(resetState())
        navigate("/login")
    }
    return (
        <nav className={`px-2 h-14 w-full bg-[#FF004F] text-white font-semibold text-3xl flex items-center ${token ? "justify-between" : "justify-center"}`}>
            <div></div>
            <h1>Claris Admin</h1>
            {token ? <Button onClick={handleSingout}>Signout</Button> : null}
        </nav>
    )
}

export default Navbar
