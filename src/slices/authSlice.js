import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null,
    token: sessionStorage.getItem("token") ? sessionStorage.getItem("token") : null,
    loading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    }
})

export const{ setUser, setToken, setLoading } = authSlice.actions;
export default authSlice.reducer;