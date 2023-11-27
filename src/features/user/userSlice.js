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
        deleteRelationFriendLocal: (state, action) => {
            const aux = decryptDate(state.userInfo)
            aux.friends = aux.friends.filter(f => f.id_relation !== action.payload)
            state.userInfo = encryptDate(JSON.stringify(aux))
        },
        deleteRequestUserLocal: (state, action) => {
            console.log(action.payload);
            const aux = decryptDate(state.userInfo)
            aux.friends = aux.friends.filter(f => parseInt(f.user[0]) !== parseInt(action.payload))
            console.log(aux.friends);
            state.userInfo = encryptDate(JSON.stringify(aux))
        },
        setRequestUserLocal: (state, action) => {
            const aux = decryptDate(state.userInfo)

            const user_found = aux.friends.some(f => f.user[0] === parseInt(action.payload[0]) && f.friend_state === 'pending')
            if (user_found) {
                aux.friends.map(f => {
                    if (f.user[0] === parseInt(action.payload[0])) {
                        f.friend_state = 'accepted'
                    }
                })
            } else {
                aux.friends = [...aux.friends, {
                    id_relation: 23123,
                    friend_state: "pending",
                    user_requesting: aux.id_user,
                    user: action.payload,
                },]
            }
            console.log(aux.friends);
            state.userInfo = encryptDate(JSON.stringify(aux))
        }
    }
})

// Action creators are generated for each case reducer function
export const { setUser, deleteUserPost, archiveUserPost, setUserPosts, updateUserInfoLocal, deleteRequestUserLocal, deleteRelationFriendLocal, setRequestUserLocal } = userSlice.actions

export default userSlice.reducer