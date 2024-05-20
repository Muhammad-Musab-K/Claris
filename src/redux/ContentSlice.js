import { createSlice, createDraftSafeSelector } from "@reduxjs/toolkit";

const initialState = {
    status: "idle",
    content: {},
    Pagination: {}
}
const key = 'content'
const ContentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {
        setNewContent: (state, { payload }) => {
            state.content = payload.reduce((prev, content) => {
                return {
                    ...prev,
                    [content.id + key]: content
                }
            }, {});
        },
        setAprroveContent(state, { payload }) {
            const content = state.content[payload + key]
        },
        setPagination: (state, { payload }) => {
            state.Pagination = payload
        }
    },

})

export const {
    setNewContent,
    setPagination,
    setAprroveContent,
} = ContentSlice.actions

export const contentState = createDraftSafeSelector(
    [state => state.content],
    state => state
)
export const contentObject = createDraftSafeSelector(
    [contentState],
    content => content.content
)
export const selectPagination = createDraftSafeSelector(
    [contentState],
    content => content.Pagination
)
export const ContentItemData = createDraftSafeSelector(
    [contentObject],
    (data) => Object.values(data || {})
)
export const Totalpage = createDraftSafeSelector(
    [selectPagination], (data) =>
    data?.pageTotal
)

export default ContentSlice.reducer