import { createSlice, createDraftSafeSelector } from "@reduxjs/toolkit";


const initialState = {
    influencer: {},
    status: "idle",
    error: null,
    totalpage: 1
};
const Key = 'influencer'
const InfluencerSlice = createSlice({
    name: "influencer",
    initialState,
    reducers: {
        setAllinfluencer: (state, { payload }) => {
            state.influencer = payload.reduce((pre, influencer) => {
                return {
                    ...pre,
                    [influencer.id + Key]: influencer
                }
            }, {});
        },
        setTotalPages: (state, { payload }) => {
            state.totalpage = payload
        },
        setInfluencerAcepeted: (state, { payload }) => {
            const singleInfluencer = state.influencer[payload + Key]
            if (singleInfluencer) {
                singleInfluencer.UserStatus = "approved"
            }
        },
        setInfluencerRejected: (state, { payload }) => {
            const singleInfluencer = state.influencer[payload + Key]
            if (singleInfluencer) {
                singleInfluencer.UserStatus = "rejected"

            }
        }
    },

});

export const {
    setInfluencerAcepeted,
    setAllinfluencer,
    updateSIngleInfluencer,
    setInfluencerRejected,
    setTotalPages
} = InfluencerSlice.actions

export const influencerState = createDraftSafeSelector(
    [state => state.influencer],
    state => state
)

export const influencerObject = createDraftSafeSelector(
    [influencerState],
    state => state.influencer
)
export const pendingInfluencer = createDraftSafeSelector(
    [influencerObject],
    (influencers) => Object.values(influencers || {})?.filter((item) => item.UserStatus === "" || item.UserStatus === "onapproval")
);
export const acceptedInfluencer = createDraftSafeSelector(
    [influencerObject],
    (influencers) => Object.values(influencers || {})?.filter((item) => item.UserStatus === "approved")
);
export const rejectedInfluencer = createDraftSafeSelector(
    [influencerObject],
    (influencers) => Object.values(influencers || {})?.filter((item) => item.UserStatus === "rejected")
);

export const totalPagesInfluencer = createDraftSafeSelector(
    [influencerState],
    state => state.totalpage
);


export default InfluencerSlice.reducer;
