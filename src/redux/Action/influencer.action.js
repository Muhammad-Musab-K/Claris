import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAllinfluencer } from "../InfluencerSlice";
import axios from "axios";


export const getAllInfluencer = createAsyncThunk(
    "influencer/fetchInfluencers",
    async ({ token }, { dispatch }) => {
        try {
            const response = await axios.get("https://xbut-eryu-hhsg.f2.xano.io/api:bwh6Xc5O/user-turbo/list", {
                headers: { Authorization: token },
            });
            if (response) {
                dispatch(setAllinfluencer(response.data));
            }
        } catch (err) {
        }
    }
);