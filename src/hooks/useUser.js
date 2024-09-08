/* eslint-disable no-unused-vars */
import AuthenticationRequired from "../exceptions/AuthenticationRequired";
import resource from "../services/source";
import { useSelector } from "react-redux";

import logout from '../helpers/logout'

export default function useUser() {
    const userAuth = useSelector((state) => state.auth.userAuth);
    const { token, userId } = userAuth;


    return {
        userLogin: async (user, password, callback) => {
            try {
                const resp = await resource({ route: `/api/v1/auth`, body: { user, password } })
                const data = await resp.json()
                if (!resp.ok) {
                    return callback(data?.error)
                }
                callback(undefined, data)
            } catch (e) {
                callback(e)
            }
        },
        registerUser: async (callback, username, password, fullname, dateBorn, email) => {
            try {
                const resp = await resource({
                    route: '/api/v1/user',
                    body: {
                        username, password, fullname, dateBorn, email,
                    },
                    method: 'POST'
                })
                const data = await resp.json()
                if (!resp.ok) {
                    callback(data.error)
                    return
                }
                callback(undefined, data)
            } catch (e) {
                callback(e)
            }
        },
        confirmVerifyCode: async (callback, userId, code) => {
            try {
                console.log(code);
                const resp = await resource({ route: `/api/v1/auth/${userId}/code/confirm`, body: { code } })
                const data = await resp.json()
                console.log(data);
                if (!resp.ok) {
                    return callback(data.error)
                }
                callback(undefined, data)
            } catch (e) {
                callback(e)
            }

        }
        ,
        getInfoUser: async (userId, callback) => {
            try {
                const resp = await resource({ route: `/api/v1/user/${userId}`, tkn: token, method: 'GET' })
                const data = await resp.json()

                if (!resp.ok) {
                    return callback(data.error)
                }
                callback(undefined, data)
            } catch (e) {
                if (e instanceof AuthenticationRequired) logout()
                callback(e)
            }
        }, userLoginWithGoogle: async (callback, values,) => {
            try {
                const resp = await resource({ route: `/api/v1/auth/google`, body: values })
                const data = await resp.json()
                if (!resp.ok) {
                    return callback(data.error)
                }
                callback(undefined, data)
            } catch (e) {
                callback(e)
            }
        },
        sendEmail: async (callback, user, type) => {
            try {
                const resp = await resource({ route: `/api/v1/auth/${user}/email/${type}` })

                if (resp.status !== 204) {
                    const data = await resp.json()
                    callback(data.error)
                }
                callback()
            } catch (e) {
                callback(e)
            }
        },
        sendRequest: async (callback, toUserId) => {
            try {
                const resp = await resource({ route: `/api/v1/user/${userId}/request/${toUserId}`, tkn: token, method: 'POST' })
                const data = await resp.json()
                if (!resp.ok) {
                    callback(data.error)
                }
                callback(undefined, data)
            } catch (e) {
                if (e instanceof AuthenticationRequired) logout()
                callback(e)
            }
        },

        updateUserInfo: async (callback, dataToUpdate) => {
            let formData = undefined
            let body = undefined

            if (dataToUpdate.avatarFile) {
                formData = new FormData()
                const keys = Object.keys(dataToUpdate)
                for (let i = 0; i < keys.length; i++) {
                    formData.append(keys[i], dataToUpdate[keys[i]])
                }
            } else {
                body = dataToUpdate
            }

            try {
                const resp = await resource({ route: `/api/v1/user/${userId}`, formData, body, tkn: token, method: 'PATCH' })

                if (resp.status !== 204) {
                    const data = await resp.json()
                    return callback(data.error)
                }
                callback()
            } catch (e) {
                if (e instanceof AuthenticationRequired) logout()
                callback(e)
            }
        },
        updatePassword: async (oldPassword, newPassword, callback) => {
            try {
                const resp = await resource({ route: `/api/v1/auth/${userId}/password`, method: 'PATCH', tkn: token, body: { newPassword, oldPassword } })


                if (resp.status !== 204) {
                    const data = await resp.json()
                    return callback(data.error)
                }
                callback()

            } catch (e) {
                if (e instanceof AuthenticationRequired) logout()
                callback(e)
            }
        },

        restorePassword: async (callback, password, accesToken) => {
            try {

                const resp = await resource({ route: `/api/v1/auth/${accesToken}/restore/password`, body: { password } })

                if (resp.status !== 204) {
                    const data = await resp.json()
                    return callback(data.error)
                }
                callback()
            } catch (e) {
                callback(e)
            }
        },
        deleteRelation: async (callback, id, request) => {
            try {
                const query = request ? `?type=request` : ''
                const resp = await resource({ route: `/api/v1/user/${userId}/relation/${id}${query}`, tkn: token, method: 'DELETE' })

                if (resp.status !== 204) {
                    const data = await resp.json()
                    return callback(data.error)
                }
                callback()
            } catch (e) {
                if (e instanceof AuthenticationRequired) logout()
                callback(e)
            }
        },

        deleteAccount: async (callback) => {
            try {
                const resp = await resource({ route: `/api/v1/user/${userId}`, method: 'DELETE', tkn: token })

                if (resp.status !== 204) {
                    const data = await resp.json()
                    return callback(data.error)
                }
                callback()
                logout()
            } catch (e) {
                if (e instanceof AuthenticationRequired) logout()
                callback(e)
            }
        }
        , getFriends: async (callback, userId) => {
            try {
                const resp = await resource({ route: `/api/v1/user/${userId}/friends`, method: 'GET', tkn: token })
                const data = await resp.json()
                if (!resp.ok) {
                    return callback(data.error)
                }
                callback(undefined, data)
            } catch (e) {
                if (e instanceof AuthenticationRequired) logout()
                callback(e)
            }
        },
        getRequests: async (callback, id_user) => {
            try {
                const resp = await resource({ route: `/api/v1/user/${id_user}/requests/received`, method: 'GET', tkn: token })
                const data = await resp.json()
                if (!resp.ok) {
                    return callback(data.error)
                }
                callback(undefined, data)
            } catch (e) {
                if (e instanceof AuthenticationRequired) logout()
                callback(e)
            }
        },

        logout: async () => {
            try {
                const resp = await resource({ route: `/api/v1/auth/logout`, method: 'DELETE' })

                if (resp.status !== 204) {
                    const data = await resp.json()
                    alert(data.error)
                }
            } catch (e) {
                console.log(e);
            }
        }

    }

}