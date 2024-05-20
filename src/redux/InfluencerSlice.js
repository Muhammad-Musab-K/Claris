import { createSlice, createDraftSafeSelector } from "@reduxjs/toolkit";

const initialState = {
    influencer: {},
    status: "idle",
    error: null
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
        setInfluencerAcepeted: (state, { payload }) => {
            const singleInfluencer = state.influencer[payload + Key]
            if (singleInfluencer) {
                singleInfluencer.Approved = true
            }
        },
        setInfluencerRejected: (state, { payload }) => {
            const singleInfluencer = state.influencer[payload + Key]
            if (singleInfluencer) {
                singleInfluencer.NotApproved = false
                singleInfluencer.Approved = false
            }
        }
    },

});

export const {
    setInfluencerAcepeted,
    setAllinfluencer,
    updateSIngleInfluencer,
    setInfluencerRejected
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
    (influencers) => Object.values(influencers || {})?.filter((item) => !item.Approved && item.NotApproved)
);
export const acceptedInfluencer = createDraftSafeSelector(
    [influencerObject],
    (influencers) => Object.values(influencers || {})?.filter((item) => item.Approved)
);
export const rejectedInfluencer = createDraftSafeSelector(
    [influencerObject],
    (influencers) => Object.values(influencers || {})?.filter((item) => !item.NotApproved && !item.Approved)
);

export default InfluencerSlice.reducer;
