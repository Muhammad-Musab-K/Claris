import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

const initialState = {
    status: "idle",
    restaurents: [],
    booking: []
}

export const restaurentsData = createAsyncThunk(
    "restraurents", async ({ id, token }) => {
        try {
            const data = await axiosInstance.get(`/restaurants/${id}`,
                { headers: { "Authorization": token, } }
            )
            const response = data
            return response.data
        } catch (err) {
            console.log(err.message);
        }
    }
)

const RestaurantsSlice = createSlice({
    name: "restaurant",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(restaurentsData.pending, (state) => {
                state.status = "loading"
            })
            .addCase(restaurentsData.fulfilled, (state, { payload }) => {
                state.status = "succeeded"
                state.restaurents = payload
            })
            .addCase(restaurentsData.rejected, (state) => {
                state.status = "reject"
            })
    }
})

export default RestaurantsSlice.reducer