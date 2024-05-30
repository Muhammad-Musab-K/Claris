import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'rsuite'

import Navbar from '../components/Navbar'
import AcceptInfluencer from '../components/AcceptInfluencer'
import PenInfluencer from '../components/PenInfluencer'
import InfluencerModal from '../components/InfluencerModal'
import { useNavigate } from 'react-router-dom'
import { getAllInfluencer } from '../redux/Action/influencer.action'
import { acceptedInfleuncer, pendingInfleuncer, rejectedInfleuncer, AcceptedTab, PendingTab, RejectedTab } from '../redux/ActivationSlice'
import ActiveButton from '../Elements/ActiveButton'
import RejectedInfluncer from '../components/RejectedInfluencer'
import Container from '../Elements/Container'
import Buttons from '../Elements/Button'
import { totalPagesInfluencer } from '../redux/InfluencerSlice'

function Influencers() {

    const navigate = useNavigate()
    const handleBack = () => navigate(-1)
    const [page, setPage] = useState(1)
    const [status, setStatus] = useState("pending")

    useEffect(() => { setPage(1); }, [status]);


    const pendingInflu = useSelector(pendingInfleuncer)
    const acceptInflu = useSelector(acceptedInfleuncer)
    const rejectInflu = useSelector(rejectedInfleuncer)

    const handlePendingInflu = async () => {
        await setStatus("pending")
        disptach(PendingTab())
    }
    const handleAccptedInflu = async () => {
        await setStatus("aprroved")
        disptach(AcceptedTab())
    }
    const handleRejectInflu = async () => {
        await setStatus("rejected")
        disptach(RejectedTab())
        console.log(totalPage)
    }
    const isopen = useSelector(state => state?.activationButton?.ModalAction)
    const token = useSelector(state => state?.loginUser?.token)
    const disptach = useDispatch()
    useEffect(() => {
        disptach(getAllInfluencer({ token, page, status }))
    }, [page, status])

    const totalPage = useSelector(totalPagesInfluencer);


    const next = () => { if (totalPage > page) setPage(prevPage => prevPage + 1); };
    const prev = () => { if (page > 1) setPage(prevPage => prevPage - 1); };

    return (
        <div className={`w-full ${isopen ? "blur-sm" : ""} `}>
            <Navbar />
            <Container>
                <div className='flex justify-between p-5'>
                    <div className='flex gap-2'>
                        <ActiveButton onClick={handlePendingInflu} contentActive={pendingInflu} text="Pending" />
                        <ActiveButton onClick={handleAccptedInflu} contentActive={acceptInflu} text="Accepted" />
                        <ActiveButton onClick={handleRejectInflu} contentActive={rejectInflu} text="Rejected" />
                    </div>
                    <Button onClick={handleBack} appearance='ghost'>Restaurants</Button>
                </div>
                <div><Buttons next={next} prev={prev} page={page} totalPage={totalPage} /></div>
                <div className='w-full max-w-6xl m-auto flex flex-col px-2'>

                    {pendingInflu && <PenInfluencer />}
                    {acceptInflu && <AcceptInfluencer />}
                    {rejectInflu && <RejectedInfluncer />}
                </div>
                <InfluencerModal />
            </Container>
        </div>
    )
}

export default Influencers
