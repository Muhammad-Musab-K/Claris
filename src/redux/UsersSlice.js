import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const Influencer = createAsyncThunk(
    "Influencer/All-influencer", async () => {
        try {
            const response = await axios.get("https://xbut-eryu-hhsg.f2.xano.io/api:bwh6Xc5O/user-turbo/list");
            const data = response.data
            console.log(response)
            return data
        } catch (err) {
            console.log(err.message)
        }
    }
)

const initialState = {
    influencer: [],
    status: "idle"

}
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(Influencer.fulfilled, (state, { payload }) => {
                state.influencer = payload
                state.state = "succeeded"
            })
            .addCase(Influencer.pending, (state) => {
                state.state = "loading"
            })
            .addCase(Influencer.rejected, (state) => {
                state.state = "rejected"
            })
    }
})