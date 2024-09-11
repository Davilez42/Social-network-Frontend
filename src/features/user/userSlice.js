import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: ''
    },
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload
        },
        updateUserInfoLocal: (state, action) => {
            const aux = state.userInfo
            for (let key in action.payload) {
                aux[key] = action.payload[key]
            }
            state.userInfo = aux
        },
        updatePreferences: (state, action) => { },
    }
})

// Action creators are generated for each case reducer function
export const { setUser, updateUserInfoLocal, updatePreferences } = userSlice.actions

export default userSlice.reducer