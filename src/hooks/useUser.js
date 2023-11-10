import { useCookies } from "react-cookie";
import resource from "../services/source";
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

                const resp = await resource('/api/v1/user/signup', {
                    username, password, fullname, date_born, email, phone_number
                })
                const data = await resp.json()
                if (!resp.ok) {
                    handlerError(data.message)
                    return
                }
                usenavigate(`/confirmEmail/${data.id_user}/${fullname.split(' ')[0]}`)

            } catch (error) {
                handlerError([error.message])

            }
        },
        confirmVerifyCode: async (handlerError, id_user, code_verify) => {
            try {
                const resp = await resource(`/api/v1/user/signup/confirmEmail/${id_user}`, { codigo_ingresado: code_verify })
                const data = await resp.json()
                console.log(data);
                if (!resp.ok) {
                    handlerError([data.message])
                    return
                }
                window.sessionStorage.setItem('tkn', data.tkn)
                usenavigate(`/home/feed`)
            } catch (error) {
                handlerError([error.message])
            }
        }
        ,
        getInfoUser: async (handlerError, setUsername, setDate_born, setFullname, setPhoneNumber, setUrlavatar, setEmail, setUserBio, setIdUser) => {
            try {
                const tkn = window.sessionStorage.getItem("tkn");
                console.log('PETICION GETINFO', tkn);
                const resp = await resource(`/api/v1/user/getInfo`, undefined, 'POST', tkn)
                const data = await resp.json()
                if (resp.ok) {
                    console.log(data);
                    setFullname(data.fullname)
                    setPhoneNumber(data.phone_number)
                    setDate_born(data.date_born)
                    setUsername(data.username)
                    setDate_born(data.date_born.split('T')[0])
                    setUrlavatar(data.url_avatar)
                    setEmail(data.email)
                    setUserBio(data.user_bio)
                    setIdUser(data.id_user)
                } else {
                    handlerError([data.message])
                }
            } catch (error) {
                handlerError([error.message])
                logout()
            }
        },
        userLogin: async (handlerError, email, password) => {
            try {
                const resp = await resource(`/api/v1/user/sign`, { email, password })
                const data = await resp.json()
                if (!resp.ok) {
                    console.log(data);
                    if (data?.status === 'PENDING_TO_VERIFIED') {
                        usenavigate(`/confirmEmail/${data.data.id_user}/${data.data.fullname.split(' ')[0]}`)
                        return
                    }
                    handlerError([data.message])
                    return
                }
                window.sessionStorage.setItem(data.tkn ? 'tkn' : null, data.tkn || null)
                usenavigate(`/home/feed`)

            } catch (error) {
                handlerError([error.message])
            }
        }, userLoginWithGoogle: async (handlerError, credentials) => {
            try {
                const resp = await resource(`/api/v1/user/sign_google_platform`, { credentials })
                const data = await resp.json()
                if (!resp.ok) {
                    console.log(data);
                    handlerError([data.message])
                    return
                }
                console.log(data);
                window.sessionStorage.setItem(data.tkn ? 'tkn' : null, data.tkn || null)
                usenavigate(`/home/feed`)

            } catch (error) {
                handlerError([error.message])
            }
        },
        sendEmailVerified: async (handlerError, id_user) => {
            try {
                const resp = await resource(`/api/v1/user/sendEmail_verified`, { id_user })
                const data = await resp.json()
                if (!resp.ok) {
                    handlerError([data.message])
                }
            } catch (error) {
                handlerError([error.message])
            }
        },
        updateInfoUser: async (handlerError, data_to_update) => {
            try {
                const tkn = window.sessionStorage.getItem("tkn");
                const resp = await resource(`/api/v1/user/data_update`, data_to_update, 'PATCH', tkn)
                const data = await resp.json()
                if (!resp.ok) {
                    handlerError([data.message])
                    return
                }

                handlerError(['Se han actualizado tus dato '])
                usenavigate(`/home/profile/edit`)
            } catch (error) {
                console.log(error.message);
                logout()
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
            } catch (error) {
                console.log(error.message);
                logout()
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

            } catch (error) {
                console.log(error.message);
                logout()
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
            } catch (error) {
                console.log(error.message);
                logout()
            }
        },

        sendEmailPaswordRecovery: async (handlerError, email) => {
            try {
                const resp = await resource(`/api/v1/user/sendEmail_recoveryPassword`, { email }, 'POST')
                const data = await resp.json()
                if (!resp.ok) {
                    handlerError([data.message])
                    return
                }
            } catch (error) {
                console.log(error.message);
                logout()
            }

        }
    }

}