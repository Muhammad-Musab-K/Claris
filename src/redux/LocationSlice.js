import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

export const locationsData = createAsyncThunk(
    "locations/AllLocations", async () => {
        try {
            const data = await axiosInstance.get("/locations");
            const response = data?.data
            return response
        }
        catch (err) {
            console.log(err.message)
        }
    }
)

const initialState = {
    status: "idle",
    location: {},
}

const LocationSlice = createSlice({
    name: "Location",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(locationsData.pending, (state) => {
                state.status = "loading"
            })
            .addCase(locationsData.fulfilled, (state, { payload }) => {
                state.status = "succeeded"
                state.location = payload
            })
            .addCase(locationsData.rejected, (state) => {
                state.status = "reject"
            })
    }
})

export default LocationSlice.reducer