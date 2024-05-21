import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, CheckPicker, Stack } from 'rsuite';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar'
import { restaurentsData } from '../redux/RestaurantsSlice'
import Bookings from './Bookings'
import Content from './Content'
import ActiveButton from '../Elements/ActiveButton';
import { activeBook, activeCon, isOpen } from '../redux/ActivationSlice';
import BackButton from '../Elements/BackButton';
import MyModal from '../components/Modal';
import Container from '../Elements/Container';

function Restraurents() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
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

    const isopen = useSelector(state => state?.activationButton?.ModalAction)
    const bookingActive = useSelector(state => state.activationButton.activateBooking);
    const contentActive = useSelector(state => state.activationButton.activateContent);

    const data = useSelector(state => state?.restaurant?.restaurents)
    const restrau = data?.map(item => ({ label: item.Name, value: item.id }))

    return (
        <div className={`w-full mb-4 ${isopen ? "blur-sm" : ""} `}>
            <Navbar />
            <Container>
                <div className='m-6 flex justify-between'>
                    <BackButton />
                    <h1 className='font-semibold text-4xl text-center'>{city}</h1>
                    <div></div>
                </div>
                <div className='mt-4 flex flex-col justify-center gap-2 md:gap-0 flex-wrap md:flex-row md:justify-between items-center px-10 pb-8'>
                    <div className='flex gap-2'>
                        <ActiveButton onClick={handleBookingPage} contentActive={bookingActive} text="Bookings" />
                        <ActiveButton onClick={handleContentPage} contentActive={contentActive} text="Content" />
                    </div>
                    <div className='flex gap-2 self-end '>
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
                    <Button onClick={() => navigate("/influencers")} appearance="ghost">Users</Button>

                </div>
                {bookingActive ? <Bookings ids={ids} restraurantId={id} />
                    : <Content ids={ids} restraurantId={id} />}
            </Container >
            <MyModal />
        </div >
    )
}

export default Restraurents
