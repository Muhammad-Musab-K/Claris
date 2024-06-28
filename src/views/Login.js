import React from 'react'
import Navbar from '../components/Navbar'
import Form from '../Elements/form'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/LoginSlice';


function Login() {
    const token = useSelector(selectIsLoggedIn);
    if (token) return <Navigate to="/" />
    return (
        <div className='flex flex-col gap-20 items-center'>
            <Navbar />
            <Form />
        </div>
    )
}

export default Login
