import { createSlice } from '@reduxjs/toolkit'
import { encryptDate } from '../../helpers/encrypt'
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userAuth: ''
    },
    reducers: {
        setAuth: (state, action) => {
            state.userAuth = encryptDate(action.payload.toString())
        }

    }
})
// Action creators are generated for each case reducer function
export const { setAuth } = authSlice.actions
export default authSlice.reducer