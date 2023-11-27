/* eslint-disable no-unused-vars */
import resource from "../services/source";
import PermissionInvalid from "../exceptions/PermissionInvalid";
import AuthenticationRequired from "../exceptions/authenticationRequired";
import { useDispatch } from "react-redux";
import { setAuth } from "../features/auth/authSlice";
export default function useUser(usenavigate) {
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(setAuth(false))
        usenavigate('/login')
    }
    return {
        registerUser: async (handlerError, username, password, fullname, date_born, email, phone_number) => {
            try {

                const resp = await resource('/api/v1/auth/signup', {
                    username, password, fullname, date_born, email, phone_number
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
                const resp = await resource(`/api/v1/auth/signup/confirmEmail/${id_user}`, { entered_code: code_verify })
                const data = await resp.json()
                // console.log(data);
                if (!resp.ok) {
                    handlerError([data.message])
                    return
                }
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
                const resp = await resource(`/api/v1/user/getInfo/${query}`, undefined, 'POST')
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
                const resp = await resource(`/api/v1/auth/sign`, { user, password })
                const data = await resp.json()
                if (!resp.ok) {
                    console.log(data);
                    handlerError([data.message])
                    return
                }
                if (data?.status === 'PENDING_TO_VERIFIED') {
                    usenavigate(`/confirmEmail/${data.data.id_user}/${data.data.fullname.split(' ')[0]}`)
                    return
                }
                window.localStorage.setItem('sessionId', parseInt(10000000 + Math.random() * 10000000))
                dispatch(setAuth(true))
                usenavigate(`/home/feed`)

            } catch (e) {
                handlerError([e.message])
            }
        }, userLoginWithGoogle: async (handlerError, credentials) => {
            try {
                const resp = await resource(`/api/v1/auth/sign_google_platform`, { credentials })
                const data = await resp.json()
                if (!resp.ok) {
                    // console.log(data);
                    handlerError([data.message])
                    return
                }
                dispatch(setAuth(true))
                usenavigate(`/home/feed`)

            } catch (e) {
                handlerError([e.message])
            }
        },
        sendEmail: async (handlerError, id_user, email, type) => {
            try {
                const resp = await resource(`/api/v1/auth/sendEmail/?type=${type}`, { id_user, email })
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
                const resp = await resource(`/api/v1/user/SendFriendReq/${id_user}`, undefined, 'POST')
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
                const resp = await resource(`/api/v1/user/data_update/${query}`, data_to_update, 'PATCH')
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
                const tkn = window.sessionStorage.getItem("tkn");
                const resp = await resource(`/api/v1/user/password_update`, { old_password, new_password }, 'POST', tkn)
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
                const tkn = window.sessionStorage.getItem("tkn");
                const formData = new FormData()
                formData.append('avatar_file', file)

                const resp = await resource(`/api/v1/user/avatar_update`, undefined, 'PATCH', tkn, formData)
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
                const resp = await resource(`/api/v1/user/restore_password`, { password }, 'POST', accesToken)
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
                const resp = await resource(`/api/v1/user/deleteFriend/${id_relation}/${query}`, undefined, 'DELETE')
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

        logout: async () => {
            try {
                const resp = await resource(`/api/v1/auth/logout`, undefined, 'DELETE')
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