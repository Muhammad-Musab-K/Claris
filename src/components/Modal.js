import { useState } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { HiMiniXMark } from "react-icons/hi2";
import { Link } from 'react-router-dom'
import { Button } from 'rsuite';

import { isOpen } from '../redux/ActivationSlice'
import { selectUserTurbo } from '../redux/ModalSlice'
import TikTok from "../assests/tiktok.png"
import Insta from "../assests/insta.png"
import { selectIsLoggedIn } from '../redux/LoginSlice';
import { setContent } from '../redux/Action/content.action';

export default function MyModal({ contentStatus }) {

    const dispatch = useDispatch()
    const [showButton, setShowButton] = useState(false)
    const { user_turbo, vanue_images, content_status_turbo_id, id } = useSelector(selectUserTurbo)
    const token = useSelector(selectIsLoggedIn)

    const handleContentApprovedOrReject = async (status) => {
        await dispatch(setContent({ id, status, token }))
        setShowButton(true)
    }

    function close() {
        dispatch(isOpen(false))
    }
    const isopen = useSelector(state => state?.activationButton?.ModalAction)

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
                                <DialogPanel className="w-full max-w-sm rounded-xl flex flex-col gap-3 bg-white p-6  shadow ">
                                    <div className='flex gap-4 relative'>
                                        <img
                                            className='h-36 w-h-36 rounded-lg object-cover'
                                            src={user_turbo?.Profile_pic?.url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVrLgzSMdH62yI75gb9jx3MTTR0o0VLDntTteWqR6rPQ&s"}
                                            alt="Profile pic" />
                                        <HiMiniXMark onClick={close} className='absolute text-xl hover:opacity-45 right-0' />

                                        <div>
                                            <h6 className='text-black md:font-semibold text-lg'>{user_turbo?.name}</h6>
                                            {user_turbo?.IG_account && (

                                                <Link to={user_turbo?.IG_account.includes("https://www.instagram.com/")
                                                    ? user_turbo.IG_account
                                                    : `https://www.instagram.com/${user_turbo?.IG_account}`}>
                                                    <img className="h-8 w-8" src={Insta} alt="Instagram" />
                                                </Link>
                                            )}
                                            {user_turbo?.Tiktok_account && (

                                                <Link to={user_turbo?.Tiktok_account.includes("https://www.tiktok.com/")
                                                    ? user_turbo.Tiktok_account
                                                    : `https://www.tiktok.com/${user_turbo?.Tiktok_account}`}>
                                                    <img className="h-8 w-8" src={TikTok} alt="tiktok" />
                                                </Link>

                                            )}
                                        </div>
                                    </div>
                                    <div className='flex font-semibold gap-3'>
                                        <div className=' '>
                                            <p>NickName</p>
                                            <p>Nationality </p>
                                            <p>Bio </p>

                                        </div>
                                        <div className='text-black'>
                                            <p>{user_turbo?.NickName ? user_turbo?.NickName : "unknown"}</p>
                                            <p>{user_turbo?.nationality ? user_turbo?.nationality : "unknown"}</p>
                                            <p>{user_turbo?.bio ? user_turbo?.bio : "unknown"}</p>

                                        </div>
                                    </div>
                                    {vanue_images && vanue_images.length > 0 && vanue_images[0] !== null && (
                                        <div className='flex-col gap-2'>
                                            <h6 className='font-semibold '>Venue Images</h6>
                                            <div className='flex gap-1 flex-wrap'>
                                                {vanue_images.map((item, index) => (
                                                    <img key={index} className='rounded-md w-20 h-20 object-cover' src={item?.url} alt={`Venue ${index}`} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {contentStatus ? (
                                        <div className='flex gap-3'>
                                            {content_status_turbo_id === 1 ? (
                                                <>
                                                    <Button
                                                        onClick={() => handleContentApprovedOrReject(2)}
                                                        className='bg-[#FF004F] text-white px-5'
                                                    >
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleContentApprovedOrReject(3)}
                                                        className='px-10'
                                                        appearance='ghost'
                                                    >
                                                        Reject
                                                    </Button>
                                                </>
                                            ) : content_status_turbo_id === 2 ? (
                                                <h6>Completed!</h6>
                                            ) : content_status_turbo_id === 3 ? (
                                                <h6>Rejected!</h6>
                                            ) : null}
                                        </div>
                                    ) : null}
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}