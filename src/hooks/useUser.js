/* eslint-disable no-unused-vars */
import resource from "../services/source";
import PermissionInvalid from "../exceptions/PermissionInvalid";
import AuthenticationRequired from "../exceptions/authenticationRequired";
import { decryptDate } from "../helpers/encrypt";
import { useSelector } from "react-redux";
export default function useUser(usenavigate) {
    const userAuth = useSelector((state) => state.auth.userAuth);
    const { csrftoken, id_user } =
        typeof userAuth === "string" ? decryptDate(userAuth) : userAuth;

    const logout = () => {
        usenavigate('/login')
    }
    return {
        registerUser: async (callback, username, password, fullname, date_born, email, phone_number) => {
            try {
                const resp = await resource({
                    route: '/api/v1/auth/signup', body: {
                        username, password, fullname, date_born, email, phone_number
                    }
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
        confirmVerifyCode: async (callback, id_user, code_verify) => {
            try {
                const resp = await resource({ route: `/api/v1/auth/confirmEmail/${id_user}`, body: { entered_code: code_verify } })
                const data = await resp.json()
                if (!resp.ok) {
                    return callback(data.error)
                }
                callback(undefined, data)
            } catch (e) {
                callback(e)
            }

        }
        ,
        getInfoUser: async (id_user, callback) => {
            try {
                const resp = await resource({ route: `/api/v1/user/${id_user}`, tkn: csrftoken, method: 'GET' })
                const data = await resp.json()

                if (!resp.ok) {
                    return callback(data.error)
                }
                callback(undefined, data)
            } catch (e) {
                if (e instanceof AuthenticationRequired || e instanceof PermissionInvalid) return logout()
                callback(e)
            }
        },
        userLogin: async (user, password, callback) => {
            try {
                const resp = await resource({ route: `/api/v1/auth`, body: { user, password } })
                const data = await resp.json()

                if (!resp.ok) {
                    return callback(data.error)
                }
                callback(undefined, data)
            } catch (e) {
                callback(e)
            }
        }, userLoginWithGoogle: async (callback, credentials,) => {
            try {
                const resp = await resource({ route: `/api/v1/auth/google_platform`, body: { credentials } })
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
                const resp = await resource({ route: `/api/v1/email/sendEmail?type=${type}`, body: { user } })

                if (resp.status !== 204) {
                    const data = await resp.json()
                    callback(data.error)
                }
                callback()
            } catch (e) {
                callback(e)
            }
        },
        sendRequestFriend: async (callback, to_user) => {
            try {
                const resp = await resource({ route: `/api/v1/user/${id_user}/sendRequest/${to_user}`, tkn: csrftoken, method: 'POST' })
                const data = await resp.json()
                if (!resp.ok) {
                    callback(data.error)
                }
                callback(undefined, data)
            } catch (e) {
                callback(e)
            }
        },

        updateUserInfo: async (data_to_update, callback, type) => {
            try {
                const query = type ? `?data=${type}` : ''
                const resp = await resource({ route: `/api/v1/user/${id_user}/${query}`, body: data_to_update, tkn: csrftoken, method: 'PATCH' })
                const data = await resp.json()
                if (!resp.ok) {
                    callback(data.error)
                    return
                }
                callback()
            } catch (e) {
                callback(e)
            }
        },
        updatePassword: async (old_password, new_password, callback) => {
            try {
                console.log(old_password, new_password);

                const resp = await resource({ route: `/api/v1/user/${id_user}/password`, tkn: csrftoken, body: { old_password, new_password } })
                const data = await resp.json()
                if (!resp.ok) {
                    return callback(data.error)

                }
                callback()

            } catch (e) {
                callback(e)
            }
        },
        updateAvatarUser: async (file, callback) => {
            try {
                const formData = new FormData()
                formData.append('avatar', file)

                const resp = await resource({ route: `/api/v1/user/${id_user}/avatar`, tkn: csrftoken, method: 'PATCH', formData })
                if (resp.status !== 204) {
                    const data = await resp.json()

                    callback(data.error.message)
                    return
                }
                callback()
            } catch (e) {
                callback(e)
            }
        },
        restorePassword: async (callback, password, accesToken) => {
            try {

                const resp = await resource({ route: `/api/v1/user/restore_password`, body: { password }, tkn: accesToken })
                const data = await resp.json()
                if (!resp.ok) {
                    callback(data.error)
                    return
                }
                usenavigate('/login')
            } catch (e) {
                callback(e)
            }
        },
        deleteRelation: async (callback, id_relation, request) => {
            try {
                const query = request ? `?type=request` : ''
                const resp = await resource({ route: `/api/v1/user/${id_user}/relation/${id_relation}${query}`, tkn: csrftoken, method: 'DELETE' })

                if (resp.status !== 204) {
                    const data = await resp.json()
                    return callback(data.error)
                }
                callback()
            } catch (e) {
                callback(e)
            }
        },

        deleteAccount: async (callback) => {
            try {
                const resp = await resource({ route: '/api/v1/user/deleteAccount', method: 'DELETE', tkn: csrftoken })
                const data = await resp.json()
                if (!resp.ok) {

                    return callback(data.error)
                } callback()

            } catch (e) {
                callback(e)

            }
        }
        , getFriends: async (callback, id_user) => {
            try {
                const resp = await resource({ route: `/api/v1/user/${id_user}/friends`, method: 'GET', tkn: csrftoken })
                const data = await resp.json()
                if (!resp.ok) {
                    return callback(data.error)
                }
                callback(undefined, data)
            } catch (e) {
                callback(e)
            }
        },
        getRequests: async (callback, id_user) => {
            try {
                const resp = await resource({ route: `/api/v1/user/${id_user}/requests`, method: 'GET', tkn: csrftoken })
                const data = await resp.json()
                if (!resp.ok) {
                    return callback(data.error)
                }
                callback(undefined, data)
            } catch (e) {
                callback(e)
            }
        },

        logout: async () => {
            try {
                const resp = await resource({ route: `/api/v1/auth/logout`, method: 'DELETE' })
                const data = await resp.json()
                if (!resp.ok) {
                    console.log(data);
                    return
                }
            } catch (e) {
                console.log(e);
            }
        }

    }

}