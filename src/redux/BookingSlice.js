import { createSlice, createAsyncThunk, createDraftSafeSelector } from "@reduxjs/toolkit";
import axios from "axios";

export const bookingData = createAsyncThunk(
    "Bookings/AllBookings", async ({ ids, page, restraurantId, token }) => {
        try {
            const url = `https://xbut-eryu-hhsg.f2.xano.io/api:bwh6Xc5O/booking_turbo/${restraurantId}`;
            const data = await axios.get(url, {
                params: {
                    restaurantIds: ids,
                    page: page
                },
                headers: { "Authorization": token }
            });

            const response = data;
            return response;
        }
        catch (err) {
            console.log(err.message)
        }
    }
)

const initialState = {
    status: "idle",
    booking: [],
}

const BookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(bookingData.pending, (state) => {
                state.status = "loading"
            })
            .addCase(bookingData.fulfilled, (state, { payload }) => {
                state.status = "succeeded"
                state.booking = payload
            })
            .addCase(bookingData.rejected, (state) => {
                state.status = "reject"
            })
    }
})

export const BookingItemData = createDraftSafeSelector(
    [state => state?.booking?.booking?.data], (data) =>
    data?.items.map(item => item)
)
export const Totalpages = createDraftSafeSelector(
    [state => state?.booking?.booking?.data], (data) =>
    data?.pageTotal
)

export default BookingSlice.reducer