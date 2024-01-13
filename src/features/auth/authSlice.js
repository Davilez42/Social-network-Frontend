import { createSlice } from '@reduxjs/toolkit'
import { encryptDate, } from '../../helpers/encrypt'
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userAuth: {
            session: false,
            csrftoken: ''
        },

    },
    reducers: {
        setAuth: (state, action) => {
            const { session, csrftoken } = action.payload
            state.userAuth = encryptDate(JSON.stringify({ session, csrftoken }))
        }
    }
})
// Action creators are generated for each case reducer function
export const { setAuth, setCsrftkn } = authSlice.actions
export default authSlice.reducer