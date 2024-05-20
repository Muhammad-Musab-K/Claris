import { Button, Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
// import { Button } from 'rsuite'
import { Link } from 'react-router-dom'

import { isOpen } from '../redux/ActivationSlice'
import { ModalData, selectUserTurbo } from '../redux/ModalSlice'
import TikTok from "../assests/tiktok.png"
import Insta from "../assests/insta.png"

export default function MyModal() {

    const dispatch = useDispatch()
    const customerData = useSelector(selectUserTurbo)
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
                                    <div className='flex gap-4'>
                                        <img
                                            className='h-36 w-h-36 rounded-lg object-cover'
                                            src={customerData?.Profile_pic?.url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVrLgzSMdH62yI75gb9jx3MTTR0o0VLDntTteWqR6rPQ&s"}
                                            alt="Profile pic" />
                                        <div>
                                            <h6 className='text-black md:font-semibold text-lg'>{customerData?.name}</h6>
                                            {customerData?.IG_account && (
                                                <Link to={`https://instagram.com/${customerData?.IG_account}`}>
                                                    <img className='h-8 w-8' src={Insta} alt="Instagram" />
                                                </Link>
                                            )}
                                            {customerData?.Tiktok_account && (
                                                <Link to={`https://tiktok/en/${customerData?.Tiktok_account}`}>
                                                    <img className='h-8 w-8' src={TikTok} alt="TikTok" />
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
                                            <p>{customerData?.NickName ? customerData?.NickName : "unknown"}</p>
                                            <p>{customerData?.nationality ? customerData?.nationality : "unknown"}</p>
                                            <p>{customerData?.bio ? customerData?.bio : "unknown"}</p>

                                        </div>
                                    </div>

                                    <Button
                                        className="bg-[#FF004F] text-white py-2 rounded-lg"
                                        onClick={close}
                                    >
                                        Close
                                    </Button>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}