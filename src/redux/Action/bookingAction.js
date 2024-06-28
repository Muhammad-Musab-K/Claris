import axiosInstance from "../../axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setNewBooking, setBookingPagination, setAprroveBooking, setCompleteBooking } from "../BookingSlice";


export const bookingData = createAsyncThunk(
    "Bookings/AllBookings", async ({ ids, page, restraurantId, token }, { dispatch }) => {
        try {
            const url = `/booking_turbo/${restraurantId}`;
            const res = await axiosInstance.get(url, {
                params: {
                    restaurantIds: ids,
                    page: page
                },
                headers: { "Authorization": token }
            });

            if (res) {
                console.log(res.data, 'CheckBookings')
                const { items, ...rest } = res?.data
                console.log(items, 'CheckBookings')
                dispatch(setNewBooking(items))
                dispatch(setBookingPagination(rest))
                // dispatch(setCompleteBooking(items))
            }
            return res;
        }
        catch (err) {
            console.log(err.message)
        }
    }
)
export const setBookings = createAsyncThunk(
    "setContent", async ({ id, rejectedStatus, Approved, token }, { dispatch }) => {
        try {
            const response = await axiosInstance.put(`/restaurant_owner/bookingsturbo_status/${id}`,
                {
                    "rejectedStatus": rejectedStatus,
                    "Approved": Approved
                },
                {
                    headers: {
                        "Authorization": token
                    }
                })
            if (response) {
                dispatch(setAprroveBooking({ id, rejectedStatus, Approved }))
            }
            return response.data;
        } catch (err) {
            console.log(err.message)
        }
    }
)