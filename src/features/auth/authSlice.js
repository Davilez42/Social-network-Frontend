import { createSlice } from '@reduxjs/toolkit'
import { encryptDate, } from '../../helpers/encrypt'
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userAuth: {
            session: false,
            csrftoken: '',
            id_user: ''
        },

    },
    reducers: {
        setAuth: (state, action) => {
            const { session, csrftoken, id_user } = action.payload
            state.userAuth = encryptDate(JSON.stringify({ session, csrftoken, id_user }))
        }
    }
})
// Action creators are generated for each case reducer function
export const { setAuth, setCsrftkn } = authSlice.actions
export default authSlice.reducer