import { createSlice } from '@reduxjs/toolkit'
import { encryptDate, decryptDate } from '../../helpers/encrypt'
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: ''
    },
    reducers: {
        setUser: (state, action) => {
            state.userInfo = encryptDate(JSON.stringify({ ...action.payload }))
        },
        updateUserInfoLocal: (state, action) => {
            const aux = decryptDate(state.userInfo)
            for (let key in action.payload) {
                aux[key] = action.payload[key]
            }
            state.userInfo = encryptDate(JSON.stringify(aux))
        }
    }
})

// Action creators are generated for each case reducer function
export const { setUser, updateUserInfoLocal } = userSlice.actions

export default userSlice.reducer