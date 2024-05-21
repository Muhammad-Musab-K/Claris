import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'rsuite'
import { HiMiniXMark } from "react-icons/hi2";

import { isOpen } from '../redux/ActivationSlice'
import { selectInfluencerTurbo, } from '../redux/ModalSlice'
import TikTok from "../assests/tiktok.png"
import Insta from "../assests/insta.png"
import { HandleReject, HandleReq } from '../redux/HandleReqSlice'

export default function InfluencerModal() {

    const dispatch = useDispatch()
    const influencerData = useSelector(selectInfluencerTurbo)
    function close() {
        dispatch(isOpen(false))
    }


    const isopen = useSelector(state => state?.activationButton?.ModalAction)
    const token = useSelector(state => state?.loginUser?.token);

    const ApprovedReq = async () => {
        await dispatch(HandleReq({ id: influencerData.id, res: true, token }))
        dispatch(isOpen(false))
    }
    const NotApprovedReq = () => {
        dispatch(HandleReject({ id: influencerData.id, res: false, token }))
        dispatch(isOpen(false))
    }

    return (
        <>
            <Transition appear show={isopen}>
                <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close}>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <TransitionChild
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 transform-[scale(95%)]"
                                enterTo="opacity-100 transform-[scale(100%)]"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 transform-[scale(100%)]"
                                leaveTo="opacity-0 transform-[scale(95%)]"
                            >
                                <DialogPanel className="w-full max-w-sm rounded-xl flex flex-col gap-3 bg-white p-6 shadow ">
                                    <div className='flex gap-4 relative' >
                                        <img
                                            className='h-36 w-h-36 rounded-lg object-cover'
                                            src={influencerData?.Profile_pic?.url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVrLgzSMdH62yI75gb9jx3MTTR0o0VLDntTteWqR6rPQ&s"}
                                            alt="Profile pic" />
                                        <HiMiniXMark onClick={close} className='absolute right-0 text-xl hover:opacity-45' />
                                        <div>
                                            <h6 className='text-black md:font-semibold text-lg'>{influencerData?.name}</h6>
                                            {influencerData?.IG_account && (
                                                <Link to={`https://instagram.com/${influencerData?.IG_account}`}>
                                                    <img className='h-8 w-8' src={Insta} alt="Instagram" />
                                                </Link>
                                            )}
                                            {influencerData?.Tiktok_account && (
                                                <Link to={`https://tiktok/en/${influencerData?.Tiktok_account}`}>
                                                    <img className='h-8 w-8' src={TikTok} alt="TikTok" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>

                                    <div className='flex font-semibold gap-3'>
                                        <div className=' '>
                                            <p>NickName</p>
                                            <p>Birthday </p>
                                            <p>Bio </p>

                                        </div>
                                        <div className='text-black'>
                                            <p>{influencerData?.NickName ? influencerData?.NickName : "unknown"}</p>
                                            <p>{influencerData?.nationality ? influencerData?.Birthday : "unknown"}</p>
                                            <p>{influencerData?.bio ? influencerData?.bio : "unknown"}</p>

                                        </div>
                                    </div>
                                    <div className='flex gap-3 justify-center'>
                                        <Button
                                            onClick={ApprovedReq}
                                            className='bg-[#FF004F] text-white px-5 '>Approve</Button>
                                        <Button
                                            onClick={NotApprovedReq}
                                            className='px-10 ' appearance='ghost'>Reject</Button>
                                    </div>

                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}