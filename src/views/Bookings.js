import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColorRing } from 'react-loader-spinner';
import {
  BookingItemData,
  Totalpages,
  PendingBookings,
  CompletedBookings,
  DeclinedBookings,
  CanceledBookings,
  IncomingBookings
} from '../redux/BookingSlice';
import NoBookingCard from '../components/NoBookingCard';
import Cards from '../components/Cards';
import Buttons from '../Elements/Button';
import MyModal from '../components/Modal';
import Tab from '../components/Tabs';
import { bookingData } from '../redux/Action/bookingAction';

function Bookings({ ids, restraurantId }) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const dispatch = useDispatch();
  const token = useSelector(state => state?.loginUser?.token);

  useEffect(() => {
    if (token) dispatch(bookingData({ ids, page, restraurantId, token }));
  }, [ids, page, restraurantId, token, dispatch]);

  useEffect(() => { setPage(1); }, [ids]);

  const data = useSelector(BookingItemData);
  const totalPage = useSelector(Totalpages);

  const completedBookings = useSelector(CompletedBookings);
  const pendingBookings = useSelector(PendingBookings);
  const declinedBookings = useSelector(DeclinedBookings);
  const canceledBookings = useSelector(CanceledBookings);
  const incomingBooking = useSelector(IncomingBookings);

  const getFilteredBookings = () => {
    switch (activeTab) {
      case 'completed':
        return completedBookings;
      case 'incoming':
        return incomingBooking;
      case 'pending':
        return pendingBookings;
      case 'declined':
        return declinedBookings;
      case 'canceled':
        return canceledBookings;
      default:
        return data;
    }
  };
  console.log(activeTab)

  const filteredBookings = getFilteredBookings();

  const next = () => { if (totalPage > page) setPage(prevPage => prevPage + 1); };
  const prev = () => { if (page > 1) setPage(prevPage => prevPage - 1); };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-2xl text-red-600 mb-4">{error}</h1>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  if (!filteredBookings || filteredBookings.length === 0) {
    return (
      <>
        <Tab activeKey={activeTab} onSelect={(key) => setActiveTab(key)} />

        <div className="flex justify-center items-center mt-10 text-2xl">

          <h1>No Booking</h1>
        </div>
      </>

    );
  }

  const groupedBookings = {};

  filteredBookings.forEach(item => {
    const bookingDay = item.BookingDay;
    if (!groupedBookings[bookingDay]) {
      groupedBookings[bookingDay] = [];
    }
    groupedBookings[bookingDay].push(item);
  });

  const bookings = Object.keys(groupedBookings).map(bookingDay => {
    const bookingItems = groupedBookings[bookingDay];

    return (
      <div key={bookingDay} className="flex flex-col p-2 gap-2">
        <h4 className="text-[#FF004F] text-3xl pl-2">{bookingDay}</h4>
        <div className="flex flex-col md:flex-row md:flex-wrap">
          {bookingItems.map((item, index) => (
            item?.user_turbo ? <Cards key={index} {...item} isContent={false} isBooking={true} /> : <NoBookingCard key={index} />
          ))}
        </div>
      </div>
    );
  });

  return (
    <div className='flex-col items-center md:pl-4'>
      <Tab activeKey={activeTab} onSelect={(key) => setActiveTab(key)} />
      <Buttons
        next={next}
        prev={prev}
        page={page}
        totalPage={totalPage} />
      <div className='flex flex-col gap-6'>
        {bookings}
      </div>
      <MyModal contentStatus={false} />
    </div>
  );
}

export default Bookings;
