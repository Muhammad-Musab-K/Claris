import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ColorRing } from 'react-loader-spinner'
import { Button, CheckPicker, Stack } from 'rsuite';

import Navbar from '../components/Navbar'
import arrow from "../assests/back.png"
import { restaurentsData } from '../redux/RestaurantsSlice'
import Bookings from './Bookings'
import Content from './Content'

function Restraurents() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()
    const [ids, setIds] = useState([])
    const [restro, setRestro] = useState([])
    const [bookingActive, setBookingActive] = useState(true)
    const [contentActive, setContentActive] = useState(false)

    const handleBack = () => { navigate(-1) }

    let city;
    if (id === '1') city = "Milano"
    else if (id === '3') city = "Bali"
    else if (id === '2') city = "Dubai"
    const token = useSelector(state => state?.loginUser?.token)

    useEffect(() => {
        if (token) dispatch(restaurentsData({ id, token }))
    }, [id, token, dispatch])

    const handleValueChnage = (value) => setRestro(value)
    const handleIdChange = () => setIds(restro)
    const handleBookingAndUserPage = () => {
        setBookingActive(prev => !prev)
        setContentActive(prev => !prev)
    }

    const data = useSelector(state => state?.restaurant?.restaurents)
    const restrau = data?.map(item => ({ label: item.Name, value: item.id }))

    console.log('Ids:', ids);  // Debugging log
    console.log('Restaurant Id:', id);  // Debugging log

    return (
        <div className='w-full mb-4'>
            <Navbar />
            <div className='max-w-7xl m-auto'>
                <div className='m-6 flex justify-between'>
                    <img
                        onClick={handleBack}
                        className='w-6 h-6'
                        src={arrow} alt="" />
                    <h1 className='font-semibold text-4xl text-center'>{city}</h1>
                    <Button className='leading-3' appearance="ghost">Users</Button>
                </div>
                <div className='mt-4 flex flex-wrap justify-between items-center md:flex-row px-10 pb-8'>
                    <div className='flex gap-2'>
                        <Button
                            {...(bookingActive
                                ? { className: "bg-[#FF004F] text-white shadow-none border-none" }
                                : { appearance: 'ghost' }
                            )}
                            onClick={handleBookingAndUserPage}
                        >
                            Bookings
                        </Button>
                        <Button
                            {...(contentActive
                                ? { className: "bg-[#FF004F] text-white shadow-none border-none" }
                                : { appearance: 'ghost' }
                            )}
                            onClick={handleBookingAndUserPage}
                        >
                            Content
                        </Button>
                    </div>
                    <div className='flex gap-2 md:mr-3'>
                        <Stack spacing={10} direction="row" alignItems="flex-start">
                            <CheckPicker
                                style={{ boxShadow: 'none' }}
                                value={restro}
                                data={restrau}
                                className='w-[220px] md:w-[500px]'
                                onChange={handleValueChnage}
                                onClean={() => setIds([])} />
                        </Stack>
                        <Button
                            onClick={handleIdChange}
                            className="bg-[#FF004F] text-white shadow-none border-none">
                            Apply
                        </Button>
                    </div>
                </div>
                {bookingActive ? <Bookings ids={ids} restraurantId={id} />
                    : <Content ids={ids} restraurantId={id} />}
            </div>
        </div >
    )
}

export default Restraurents
