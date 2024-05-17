import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, CheckPicker, Stack } from 'rsuite';

import Navbar from '../components/Navbar'
import { restaurentsData } from '../redux/RestaurantsSlice'
import Bookings from './Bookings'
import Content from './Content'
import ActiveButton from '../components/ActiveButton';
import { activeBook, activeCon } from '../redux/ActivationSlice';
import BackButton from '../components/BackButton';
import MyModal from '../components/Modal';

function Restraurents() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [ids, setIds] = useState([])
    const [restro, setRestro] = useState([])

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

    const handleBookingPage = () => {
        dispatch(activeBook(true))
    }
    const handleContentPage = () => {
        dispatch(activeCon(true))
    }


    const bookingActive = useSelector(state => state.activationButton.activateBooking);
    const contentActive = useSelector(state => state.activationButton.activateContent);

    const data = useSelector(state => state?.restaurant?.restaurents)
    const restrau = data?.map(item => ({ label: item.Name, value: item.id }))

    return (
        <div className='w-full mb-4'>
            <Navbar />
            <div className='max-w-7xl m-auto'>
                <div className='m-6 flex justify-between'>
                    <BackButton />
                    <h1 className='font-semibold text-4xl text-center'>{city}</h1>
                    <Button className='leading-3' appearance="ghost">Users</Button>
                </div>
                <div className='mt-4 flex flex-col justify-center gap-2 md:gap-0 flex-wrap md:flex-row md:justify-between items-center px-10 pb-8'>
                    <div className='flex gap-2'>

                        <ActiveButton onClick={handleBookingPage} contentActive={bookingActive} text="Bookings" />
                        <ActiveButton onClick={handleContentPage} contentActive={contentActive} text="Content" />

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
                            className="bg-[#FF004F] text-white">
                            Apply
                        </Button>
                    </div>
                </div>
                {bookingActive ? <Bookings ids={ids} restraurantId={id} />
                    : <Content ids={ids} restraurantId={id} />}
            </div>
            <MyModal />
        </div >
    )
}

export default Restraurents
