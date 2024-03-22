/* eslint-disable no-unused-vars */
import resource from "../services/source";
import { useSelector } from "react-redux";
import { decryptDate } from "../helpers/encrypt";

const usePost = () => {


    const { csrftoken, id_user } = decryptDate(useSelector(state => state.auth.userAuth))


    return ({
        getPosts: async (callback, optionsQuery) => {
            try {
                console.log(optionsQuery);
                let query = []
                for (let key in optionsQuery) {
                    query.push(`${key}=${optionsQuery[key]}`)
                }
                const resp = await resource({
                    route: `/api/v1/post/${query.length >= 0 ? '?' + query.join('&') : ''}`,
                    method: 'GET',
                    tkn: csrftoken
                })
                const data = await resp.json()
                if (!resp.ok) {
                    return callback(data.error)
                }
                callback(undefined, data)

            } catch (e) {
                callback(e)
            }
        },
        sendPost: async (callback, text, files) => {
            try {
                const formData = new FormData();
                formData.append('text', text)
                for (const file of files) {
                    formData.append('media', file)
                }
                const resp = await resource({ route: `/api/v1/post/${id_user}`, method: 'PUT', formData, tkn: csrftoken })
                if (!resp.ok) {
                    const data = await resp.json()
                    return callback(data.error)
                }
                callback()

            } catch (e) {
                return callback(e)
            }
        }
        ,
        getCommentsPost: async (callback, id_post) => {

            try {
                const resp = await resource({ route: `/api/v1/post/${id_post}/comments`, method: 'GET', tkn: csrftoken })
                const data = await resp.json()
                if (!resp.ok) {
                    return callback(data.error)
                }
                callback(undefined, data)
            } catch (e) {

                return callback(e)
            }

        },
        getLikesPost: async (callback, id_post) => {
            try {
                const resp = await resource({ route: `/api/v1/post/${id_post}/likes`, method: 'GET', tkn: csrftoken })
                const data = await resp.json()
                if (!resp.ok) {
                    return callback(data.error)
                }
                callback(undefined, data)
            } catch (e) {
                return callback(e)
            }
        },
        createComment: async (callback, id_post, text) => {
            try {
                const resp = await resource({ route: `/api/v1/post/${id_post}/commentby/${id_user}`, body: { text }, tkn: csrftoken, method: 'PUT' })
                const data = await resp.json()
                if (!resp.ok) {
                    return callback(data.error)
                }
                callback(undefined, data)
            } catch (e) {

                return callback(e)
            }
        },
        sendLike: async (callback, id_post) => {
            try {

                const resp = await resource({ route: `/api/v1/post/${id_post}/likeby/${id_user}`, method: 'PUT', tkn: csrftoken })
                const data = await resp.json()
                if (!resp.ok) {
                    return callback(data.error)
                }
                callback()
            } catch (e) {

                return callback(e)
            }
        },
        reportPost: async (callback, id_post, reason, type_report, actionSucces) => {
            try {
                const resp = await resource({ route: `/api/v1/post/${id_post}/report`, body: { type_report, reason }, method: 'PUT', tkn: csrftoken })
                if (!resp.ok) {
                    const data = await resp.json()
                    return callback(data.error)
                }
                callback()
            } catch (e) {
                callback(e)
            }
        },
        modifyPost: async (callback, id_post, dataUpdate) => {
            try {
                const resp = await resource({ route: `/api/v1/post/${id_post}`, body: dataUpdate, method: 'PATCH', tkn: csrftoken })
                if (!resp.ok) {

                    const data = await resp.json()
                    return callback(data.error)
                }
                callback()
            } catch (e) {
                callback(e)
            }
        },
        deletePost: async (callback, id_post) => {
            try {
                const resp = await resource({ route: `/api/v1/post/${id_post}`, method: 'DELETE', tkn: csrftoken })
                if (!resp.ok) {
                    const data = await resp.json()
                    return callback(data.error)
                }
                callback()
            } catch (e) {
                callback(e)
            }
        }


    })
}
export default usePost