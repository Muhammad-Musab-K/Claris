import { createSlice, createAsyncThunk, createDraftSafeSelector } from "@reduxjs/toolkit";
import axios from "axios";

export const ContentData = createAsyncThunk(
    "Bookings/AllBookings", async ({ ids, page, restraurantId, token }) => {
        try {
            const url = `https://xbut-eryu-hhsg.f2.xano.io/api:bwh6Xc5O/booking_turbo/content_status/${restraurantId}`;
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
    content: [],
}

const ContentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ContentData.pending, (state) => {
                state.status = "loading"
            })
            .addCase(ContentData.fulfilled, (state, { payload }) => {
                state.status = "succeeded"
                state.content = payload
            })
            .addCase(ContentData.rejected, (state) => {
                state.status = "reject"
            })
    }
})

export const ContentItemData = createDraftSafeSelector(
    [state => state?.content?.content?.data], (data) =>
    data?.items.map(item => item)
)
export const Totalpage = createDraftSafeSelector(
    [state => state?.content?.content?.data], (data) =>
    data?.pageTotal
)

export default ContentSlice.reducer