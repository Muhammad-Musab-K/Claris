import { createSlice, createDraftSafeSelector } from "@reduxjs/toolkit";

// export const bookingData = createAsyncThunk(
//     "Bookings/AllBookings", async ({ ids, page, restraurantId, token }) => {
//         try {
//             const url = `/booking_turbo/${restraurantId}`;
//             const data = await axiosInstance.get(url, {
//                 params: {
//                     restaurantIds: ids,
//                     page: page
//                 },
//                 headers: { "Authorization": token }
//             });

//             const response = data;
//             return response;
//         }
//         catch (err) {
//             console.log(err.message)
//         }
//     }
// )

const initialState = {
    status: "idle",
    booking: {},
    Pagination: {}
}
const key = "booking"
const BookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setNewBooking: (state, { payload }) => {
            state.booking = payload.reduce((prev, booking) => {
                return {
                    ...prev,
                    [booking.id + key]: booking
                }
            }, {});
        },
        setCompleteBooking: (state, { payload }) => {

            state.booking = payload.reduce((prev, booking) => {
                if (booking.Approved === true)
                    return {
                        ...prev,
                        [booking.id + key]: booking
                    }
            }, {});
        },
        setAprroveBooking(state, { payload }) {
            console.log(payload)
            const booking = state?.booking[payload.id + key]
            booking.Approved = payload.Approved
            booking.Rejectedstatus = payload.rejectedStatus
        },
        setBookingPagination: (state, { payload }) => {
            state.Pagination = payload
        },
    },

})

export const { setNewBooking,
    setCompleteBooking,
    setAprroveBooking,
    setBookingPagination
} = BookingSlice.actions

export const BookingState = createDraftSafeSelector(
    [state => state.booking],
    state => state
)
export const BookingtObject = createDraftSafeSelector(
    [BookingState],
    booking => booking.booking
)
export const selectPagination = createDraftSafeSelector(
    [BookingState],
    booking => booking.Pagination
)
export const BookingItemData = createDraftSafeSelector(
    [BookingtObject],
    (data) => Object.values(data || {})
)
export const PendingBookings = createDraftSafeSelector(
    [BookingItemData],
    (data) => data.filter(item =>
        item.Approved === false &&
        item.canceled === false &&
        item.Rejectedstatus === false &&
        item.ApprovalStatus === false
    )
);

export const CompletedBookings = createDraftSafeSelector(
    [BookingItemData],
    (data) => {
        return data.filter(item => {
            const bookingDate = new Date(item?.BookingDay).getTime();
            const isFutureBooking = bookingDate < Date.now();
            const isApproved = item?.Approved === true;
            return isFutureBooking && isApproved;
        });
    }
);

export const IncomingBookings = createDraftSafeSelector(
    [BookingItemData],
    (data) => {
        return data.filter(item => {
            const bookingDate = new Date(item?.BookingDay).getTime();
            const isFutureBooking = bookingDate > Date.now();
            const isApproved = item?.Approved === true;
            return isFutureBooking && isApproved;
        });
    }
);

export const DeclinedBookings = createDraftSafeSelector(
    [BookingItemData],
    (data) => data.filter(item => item.Rejectedstatus === true)
);

export const CanceledBookings = createDraftSafeSelector(
    [BookingItemData],
    (data) => data.filter(item => item.canceled === true)
);

export const Totalpages = createDraftSafeSelector(
    [selectPagination], (data) =>
    data?.pageTotal
)

export default BookingSlice.reducer