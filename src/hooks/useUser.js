/* eslint-disable no-unused-vars */
import resource from "../services/source";
import PermissionInvalid from "../exceptions/PermissionInvalid";
import AuthenticationRequired from "../exceptions/authenticationRequired";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setCsrftkn } from "../features/auth/authSlice";
import { decryptDate } from "../helpers/encrypt";
export default function useUser(usenavigate) {
    const dispatch = useDispatch()
    const userAuth = useSelector((state) => state.auth.userAuth);
    const { csrftoken } =
        typeof userAuth === "string" ? decryptDate(userAuth) : userAuth;

    const logout = () => {
        dispatch(setAuth(false))
        usenavigate('/login')
    }
    return {
        registerUser: async (handlerError, username, password, fullname, date_born, email, phone_number) => {
            try {

                const resp = await resource({
                    route: '/api/v1/auth/signup', body: {
                        username, password, fullname, date_born, email, phone_number
                    }
                })
                const data = await resp.json()
                if (!resp.ok) {
                    handlerError(data.message)
                    return
                }
                usenavigate(`/confirmEmail/${data.id_user}/${fullname.split(' ')[0]}`)

            } catch (e) {
                handlerError([e.message])

            }
        },
        confirmVerifyCode: async (handlerError, id_user, code_verify, actionClear) => {
            try {
                const resp = await resource({ route: `/api/v1/auth/signup/confirmEmail/${id_user}`, body: { entered_code: code_verify } })
                const data = await resp.json()
                // console.log(data);
                if (!resp.ok) {
                    handlerError([data.message])
                    return
                }
                dispatch(setCsrftkn(data.csrfToken))
                usenavigate(`/home/feed`)
            } catch (e) {
                handlerError([e.message])
            }
            finally {
                actionClear()
            }
        }
        ,
        getInfoUser: async (handlerError, id_user, setUser) => {
            try {
                const query = id_user ? `?foreign_view=${id_user}` : ''
                const resp = await resource({ route: `/api/v1/user/getInfo/${query}`, tkn: csrftoken })
                const data = await resp.json()
                if (resp.ok) {
                    setUser(data)

                } else {
                    handlerError([data.message])
                }
            } catch (e) {
                if (e instanceof AuthenticationRequired || e instanceof PermissionInvalid) return logout()
                handlerError([e.message])
            }
        },
        userLogin: async (handlerError, user, password) => {
            try {
                const resp = await resource({ route: `/api/v1/auth/sign`, body: { user, password } })
                const data = await resp.json()
                if (!resp.ok) {
                    console.log(data);
                    handlerError([data.message])
                    return
                }
                if (data?.status === 'PENDING_TO_VERIFIED') {
                    usenavigate({ route: `/confirmEmail/${data.data.id_user}/${data.data.fullname.split(' ')[0]}` })
                    return
                }
                dispatch(setAuth({ session: true, csrftoken: data.data.csrftoken }))
                usenavigate(`/home/feed`)

            } catch (e) {
                handlerError([e.message])
            }
        }, userLoginWithGoogle: async (handlerError, credentials) => {
            try {
                const resp = await resource({ route: `/api/v1/auth/sign_google_platform`, body: { credentials } })
                const data = await resp.json()
                if (!resp.ok) {
                    // console.log(data);
                    handlerError([data.message])
                    return
                }
                dispatch(setAuth({ session: true, csrftoken: data.csrftoken }))
                usenavigate(`/home/feed`)

            } catch (e) {
                console.log(e);
                handlerError([e.message])
            }
        },
        sendEmail: async (handlerError, id_user, email, type) => {
            try {
                const resp = await resource({ route: `/api/v1/auth/sendEmail/?type=${type}`, body: { id_user, email } })
                const data = await resp.json()
                if (!resp.ok) {
                    handlerError([data.message])
                }
            } catch (e) {
                handlerError([e.message])
            }
        },
        sendRequestFriend: async (handlerError, id_user, actionRevert, actionSuccess) => {
            try {
                const resp = await resource(`/api/v1/user/SendFriendReq/${id_user}`, { csrftoken }, 'POST')
                const data = await resp.json()
                if (!resp.ok) {
                    actionRevert()
                    console.log(data);
                    handlerError([data.message])
                    return
                }
                actionSuccess()

            } catch (e) {
                if (e instanceof PermissionInvalid) return logout()
            }
        },

        updateUserInfo: async (handlerError, data_to_update, type, actionSuccess) => {
            try {
                const query = type ? `?data=${type}` : ''
                const resp = await resource({ route: `/api/v1/user/data_update/${query}`, body: data_to_update, tkn: csrftoken, method: 'PATCH' })
                const data = await resp.json()
                if (!resp.ok) {
                    handlerError([data.message])
                    return
                }

                handlerError(['Se han actualizado tus datos'])
                actionSuccess()
            } catch (e) {
                if (e instanceof PermissionInvalid) return logout()
            }
        },
        updatePassword: async (handlerError, old_password, new_password) => {
            try {
                console.log(old_password, new_password);

                const resp = await resource({ route: `/api/v1/user/password_update`, tkn: csrftoken, body: { old_password, new_password } })
                const data = await resp.json()
                if (!resp.ok) {
                    handlerError([data.message])
                    return
                }
                handlerError(['Se ha actualizado tu contraseña'])
                usenavigate(`/home/profile/edit`)
            } catch (e) {
                if (e instanceof PermissionInvalid) return logout()
            }
        },
        updateAvatarUser: async (handlerError, file, actionRevert, actionSuccess) => {
            try {
                const formData = new FormData()
                formData.append('avatar_file', file)

                const resp = await resource({ route: `/api/v1/user/avatar_update`, tkn: csrftoken, method: 'PATCH', formData })
                if (resp.status !== 204) {
                    const data = await resp.json()
                    console.log('pasa');
                    handlerError([data.message])
                    return
                }
                actionSuccess()
                handlerError(['Se ha actualizado tu avatar'])
            } catch (e) {
                console.log(e);
                if (e instanceof PermissionInvalid) return logout()
            }
        },
        restorePassword: async (handlerError, accesToken, password) => {
            try {
                console.log(accesToken, password);
                const resp = await resource({ route: `/api/v1/user/restore_password`, body: { password }, tkn: accesToken })
                const data = await resp.json()
                if (!resp.ok) {
                    handlerError([data.message])
                    return
                }
                usenavigate('/login')
            } catch (e) {
                if (e instanceof PermissionInvalid) return logout()
            }
        },
        deleteRelationFriend: async (handlerError, id_relation, actionRevert, actionSuccess, request) => {
            try {
                const query = request ? `?type=request` : ''
                const resp = await resource({ route: `/api/v1/user/deleteFriend/${id_relation}/${query}`, tkn: csrftoken, method: 'DELETE' })
                const data = await resp.json()
                if (!resp.ok) {
                    actionRevert()
                    handlerError([data.message])
                    return
                }
                actionSuccess()
            } catch (e) {
                if (e instanceof PermissionInvalid) return logout()
            }
        },

        deleteAccount: async (handlerError, callback) => {
            try {
                const resp = await resource({ route: '/api/v1/user/deleteAccount', method: 'DELETE', tkn: csrftoken })
                const data = await resp.json()
                if (resp.ok) {
                    callback()
                } else {
                    handlerError([data.message])
                }

            } catch (e) {
                console.log(e);
                if (e instanceof PermissionInvalid) return logout()
            }
        }
        ,

        logout: async () => {
            try {
                const resp = await resource({ route: `/api/v1/auth/logout`, method: 'DELETE' })
                const data = await resp.json()
                if (!resp.ok) {
                    console.log(data);
                    return
                }
            } catch (e) {
                //console.log(e);
            }
        }

    }

}