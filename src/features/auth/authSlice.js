import { createSlice } from '@reduxjs/toolkit'
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userAuth: {
            session: false,
            token: null,
            userId: null
        },

    },
    reducers: {
        setAuth: (state, action) => {
            state.userAuth = action.payload
        }
    }
})
// Action creators are generated for each case reducer function
export const { setAuth, setCsrftkn } = authSlice.actions
export default authSlice.reducer