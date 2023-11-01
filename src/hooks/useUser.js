
import { useNavigate } from "react-router-dom"

export default function useUser() {
    const useavigate = useNavigate()
    const resource = async (route, body) => {
        const url = 'http://localhost:8000'
        return await fetch(url + route, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
    }

    return {
        registerUser: async (handlerError, username, password, fullname, date_born, email, phone_number) => {
            try {

                const resp = await resource('/api/v1/user/signup', {
                    username, password, fullname, date_born, email, phone_number
                })
                const data = await resp.json()
                if (resp.ok) {
                    useavigate(`/confirmEmail/${data.id_user}/${fullname.split(' ')[0]}`)
                    return
                }
                handlerError([data.message])
            } catch (error) {
                handlerError([error.message])
            }
        },
        confirmVerifyCode: async (handlerError, id_user, code_verify) => {
            try {
                const resp = await resource(`/api/v1/user/signup/confirmEmail/${id_user}`, { codigo_ingresado: code_verify })
                const data = await resp.json()
                if (resp.ok) {
                    //useavigate(`/profile/edit/${id_user}`)
                } else {
                    handlerError([data.message])
                }
            } catch (error) {
                handlerError([error.message])
            }
        }
        ,
        getInfoUser: async (handlerError, id_user, setUsername, setDate_born, setFullname, setPhoneNumber, setUrlavatar, setEmail) => {

            try {
                const resp = await resource(`/api/v1/user/getInfo/${id_user}`)
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
                if (resp.ok) {
                    // useavigate(`/profile/edit/${data.data.id_user}`)
                } else {
                    handlerError([data.message])
                }
            } catch (error) {

            }


        }
    }

}