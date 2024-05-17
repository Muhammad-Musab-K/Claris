
import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

export const Influencer = createAsyncThunk(
    "influencer/fetchInfluencers",
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await axios.get("https://xbut-eryu-hhsg.f2.xano.io/api:bwh6Xc5O/user-turbo/list", {
                headers: { Authorization: token },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const initialState = {
    influencer: [],
    status: "idle",
    error: null
};

const InfluencerSlice = createSlice({
    name: "influencer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(Influencer.fulfilled, (state, { payload }) => {
                state.influencer = payload;
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(Influencer.pending, (state) => {
                state.status = "loading";
            })
            .addCase(Influencer.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const selectAllInfluencers = (state) => state.influencer.influencer;
export const pendingInfluencer = createSelector(
    [selectAllInfluencers],
    (influencers) => influencers.filter((item) => !item.Approved && item.NotApproved)
);
export const acceptedInfluencer = createSelector(
    [selectAllInfluencers],
    (influencers) => influencers.filter((item) => item.Approved)
);
export const rejectedInfluencer = createSelector(
    [selectAllInfluencers],
    (influencers) => influencers.filter((item) => !item.NotApproved && !item.Approved)
);

export default InfluencerSlice.reducer;
