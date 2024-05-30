import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { LoginUser } from '../redux/LoginSlice'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Button } from 'rsuite'

function Form() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = async () => {
        if (email === "" || password === "") {
            return Swal.fire({
                icon: "info",
                title: "Fill empty Fields!",
                text: "Oops...",
            });
        }
        await dispatch(LoginUser({ email, password }))
        navigate("/", { replace: true });
    }
    return (
        <div className='shadow p-4 flex flex-col gap-3 w-[300px] md:w-[400px] rounded-md '>
            <h1 className='text-xl text-[#FF004F] md:font-semibold'>Login to your Account</h1>
            <div className='flex flex-col gap-2'>
                <label className="md:font-semibold text-base" >Email Address</label>
                <input
                    className="border rounded-sm  border-slate-400 py-1 px-1.5 focus:outline-slate-300"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label className="md:font-semibold text-base" >Password</label>
                <input
                    className="border rounded-sm border-slate-400 py-1 px-1.5 focus:outline-slate-300 "
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button
                onClick={handleLogin}
                className="w-24 md:font-semibold text-base text-white bg-[#FF004F] rounded-md py-2">Login
            </Button>
            <div>
                {/* <Link><p>ForgoPassword</p></Link> */}
            </div>
        </div>
    )
}

export default Form
