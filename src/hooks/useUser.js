import { useCookies } from "react-cookie";
import resource from "../services/source";
import PermissionInvalid from "../exceptions/PermissionInvalid";
import AuthenticationRequired from "../exceptions/authenticationRequired";

export default function useUser(usenavigate) {
    const [cookies, setCookie, removeCookie] = useCookies(["tkn"]);
    const logout = () => {
        removeCookie('tkn')
        window.sessionStorage.removeItem('tkn')
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
        confirmVerifyCode: async (handlerError, id_user, code_verify) => {
            try {
                const resp = await resource(`/api/v1/auth/signup/confirmEmail/${id_user}`, { codigo_ingresado: code_verify })
                const data = await resp.json()
                console.log(data);
                if (!resp.ok) {
                    handlerError([data.message])
                    return
                }
                window.sessionStorage.setItem('tkn', data.tkn)
                usenavigate(`/home/feed`)
            } catch (e) {
                handlerError([e.message])
            }
        }
        ,
        getInfoUser: async (handlerError, setUsername, setDate_born, setFullname, setPhoneNumber, setUrlavatar, setEmail, setUserBio, setIdUser, setFriends, setConfPrivate, id_user_foreign) => {
            try {
                const query = id_user_foreign ? `?view_foreign=${id_user_foreign}` : ''

                const tkn = window.sessionStorage.getItem("tkn");
                //console.log('PETICION GETINFO', tkn);
                const resp = await resource(`/api/v1/user/getInfo/${query}`, undefined, 'POST', tkn)
                const data = await resp.json()
                if (resp.ok) {
                    setFullname(data.fullname)
                    setPhoneNumber(data.phone_number)
                    setDate_born(data.date_born)
                    setUsername(data.username)
                    setDate_born(data.date_born?.split('T')[0])
                    setUrlavatar(data.url_avatar)
                    setEmail(data.email)
                    setUserBio(data.user_bio)
                    setIdUser(data.id_user)
                    setFriends(data.friends)
                    setConfPrivate(data.view_private)
                } else {
                    handlerError([data.message])
                }
            } catch (e) {
                if (e instanceof AuthenticationRequired || e instanceof PermissionInvalid) return logout()
                handlerError([e.message])
            }
        },
        userLogin: async (handlerError, email, password) => {
            try {
                const resp = await resource(`/api/v1/auth/sign`, { email, password })
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
                window.sessionStorage.setItem(data.tkn ? 'tkn' : null, data.tkn || null)
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
                //console.log(data);
                window.sessionStorage.setItem(data.tkn ? 'tkn' : null, data.tkn || null)
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

        updateInfoUser: async (handlerError, data_to_update, type) => {
            try {
                const query = type ? `?data=${type}` : ''
                const tkn = window.sessionStorage.getItem("tkn");
                const resp = await resource(`/api/v1/user/data_update/${query}`, data_to_update, 'PATCH', tkn)
                const data = await resp.json()
                if (!resp.ok) {
                    handlerError([data.message])
                    return
                }

                handlerError(['Se han actualizado tus datos'])

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
        updateAvatarUser: async (handlerError, file) => {
            try {
                const tkn = window.sessionStorage.getItem("tkn");
                const formData = new FormData()
                formData.append('avatar_file', file)

                const resp = await resource(`/api/v1/user/avatar_update`, undefined, 'PATCH', tkn, formData)
                const data = await resp.json()
                if (!resp.ok) {
                    handlerError([data.message])
                    return
                }
                handlerError(['Se ha actualizado tu avatar'])
                usenavigate(`/home/profile/edit`)

            } catch (e) {
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
        }

    }

}