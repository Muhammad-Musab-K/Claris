import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'rsuite'

import Navbar from '../components/Navbar'
import AcceptInfluencer from '../components/AcceptInfluencer'
import PenInfluencer from '../components/PenInfluencer'
import InfluencerModal from '../components/InfluencerModal'
import { useNavigate } from 'react-router-dom'
import { getAllInfluencer } from '../redux/Action/influencer.action'
import { acceptedInfleuncer, pendingInfleuncer, rejectedInfleuncer, AcceptedTab, PendingTab, RejectedTab } from '../redux/ActivationSlice'
import ActiveButton from '../components/ActiveButton'
import RejectedInfluncer from '../components/RejectedInfluencer'

function Influencers() {

    const navigate = useNavigate()
    const handleBack = () => navigate(-1)

    const pendingInflu = useSelector(pendingInfleuncer)
    const acceptInflu = useSelector(acceptedInfleuncer)
    const rejectInflu = useSelector(rejectedInfleuncer)

    const handlePendingInflu = () => {
        disptach(PendingTab())
    }
    const handleAccptedInflu = () => {
        disptach(AcceptedTab())
    }
    const handleRejectInflu = () => {
        disptach(RejectedTab())
    }
    const isopen = useSelector(state => state?.activationButton?.ModalAction)
    const token = useSelector(state => state?.loginUser?.token)
    const disptach = useDispatch()
    useEffect(() => {
        disptach(getAllInfluencer({ token }))
    }, [])

    return (
        <div className={`w-full ${isopen ? "blur-sm" : ""} `}>
            <Navbar />
            <div className='flex justify-between p-5'>
                <div className='flex gap-2'>
                    <ActiveButton onClick={handlePendingInflu} contentActive={pendingInflu} text="Pending" />
                    <ActiveButton onClick={handleAccptedInflu} contentActive={acceptInflu} text="Accepted" />
                    <ActiveButton onClick={handleRejectInflu} contentActive={rejectInflu} text="Rejected" />
                </div>
                <Button onClick={handleBack} appearance='ghost'>Restaurants</Button>
            </div>
            <div className='w-full max-w-6xl m-auto flex flex-col items-center'>

                {pendingInflu && <PenInfluencer />}
                {acceptInflu && <AcceptInfluencer />}
                {rejectInflu && <RejectedInfluncer />}
            </div>
            <InfluencerModal />
        </div>
    )
}

export default Influencers
