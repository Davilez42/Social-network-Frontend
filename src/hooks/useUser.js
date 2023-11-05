
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
export default function useUser() {
    const usenavigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(["tkn"]);

    const logout = () => {
        removeCookie('tkn')
        window.sessionStorage.removeItem('tkn')
        usenavigate('/login')
    }

    const resource = async (route, body, method = 'POST', tkn, formData) => {
        const url = 'https://nt4mmhp7-8000.use2.devtunnels.ms'
        const contenttype = body ? { "Content-type": "application/json" } : null
        const resp = await fetch(url + route, {
            method,
            mode: 'cors',
            credentials: 'include',
            headers: {
                ...contenttype,
                "auth": `Bearer token:${tkn} `
            },
            body: body ? JSON.stringify(body) : formData
        })
        if ([404, 401, 403].includes(resp.status)) logout()
        return resp
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
        getInfoUser: async (handlerError, setUsername, setDate_born, setFullname, setPhoneNumber, setUrlavatar, setEmail, setUserBio) => {
            try {
                const tkn = window.sessionStorage.getItem("tkn");
                const resp = await resource(`/api/v1/user/getInfo`, undefined, 'POST', tkn)
                const data = await resp.json()
                if (resp.ok) {
                    console.log(data);
                    setFullname(data.fullname)
                    setPhoneNumber(data.phone_number)
                    setDate_born(data.date_born)
                    setUsername(data.username)
                    setDate_born(data.data_born)
                    setUrlavatar(data.url_avatar)
                    setEmail(data.email)
                    setUserBio(data.user_bio)
                } else {
                    handlerError([data.message])
                }
            } catch (error) {
                handlerError([error.message])
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
                handlerError([error.message])
            }
        },
        updatePassword: async (handlerError, old_password, new_password) => {
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

            }
        }
    }

}