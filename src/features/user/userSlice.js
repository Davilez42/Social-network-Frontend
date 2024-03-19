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
        setUserPosts: (state, action) => {
            const aux = decryptDate(state.userInfo)
            aux.userPosts = action.payload
            state.userInfo = encryptDate(JSON.stringify(aux))
        },
        deleteUserPost: (state, action) => {
            const aux = decryptDate(state.userInfo)
            aux.userPosts = aux.userPosts?.filter(p => p.id_post !== action.payload)
            state.userInfo = encryptDate(JSON.stringify(aux))
        },
        archiveUserPost: (state, action) => {
            const aux = decryptDate(state.userInfo)
            aux.userPosts = aux.userPosts?.map(post => {
                if (post.id_post === action.payload) {
                    const p = post
                    p.post_visibility = false;
                    return p
                }
                return post
            })
            console.log(aux);
            state.userInfo = encryptDate(JSON.stringify(aux))
        }
        ,
        updateUserInfoLocal: (state, action) => {
            const aux = decryptDate(state.userInfo)
            for (let key in action.payload) {
                aux[key] = action.payload[key]
            }
            state.userInfo = encryptDate(JSON.stringify(aux))
        },
        deleteFriendLocal: (state, action) => {
            const aux = decryptDate(state.userInfo)
            aux.friends = aux.friends.filter(f => f._id !== action.payload)
            state.userInfo = encryptDate(JSON.stringify(aux))
        },
        setFriendLocal: (state, action) => {
            const aux = decryptDate(state.userInfo)
            aux.friends.push(action.payload)
            state.userInfo = encryptDate(JSON.stringify(aux))
        },
        deleteRequestUserLocal: (state, action) => {
            const aux = decryptDate(state.userInfo)
            aux.requests = aux.requests.filter(r => r._id !== action.payload)
            aux.my_requests_sent = aux.my_requests_sent.filter(r => r._id !== action.payload)
            state.userInfo = encryptDate(JSON.stringify(aux))
        },
        setRequestUserLocal: (state, action) => {
            const aux = decryptDate(state.userInfo)
            aux.my_requests_sent.push(action.payload)
            state.userInfo = encryptDate(JSON.stringify(aux))
        }
        , updateDescriptionPost: (state, action) => {
            const aux = decryptDate(state.userInfo)
            aux.userPosts = aux.userPosts?.map(post => {
                if (post.id_post === action.payload.id_post) {
                    const p = post
                    p.text = action.payload.text;
                    return p
                }
                return post
            })
            state.userInfo = encryptDate(JSON.stringify(aux))
        }
    }
})

// Action creators are generated for each case reducer function
export const { setUser, setFriendLocal, deleteUserPost, updateDescriptionPost, archiveUserPost, setUserPosts, updateUserInfoLocal, deleteRequestUserLocal, deleteFriendLocal, setRequestUserLocal } = userSlice.actions

export default userSlice.reducer