/* eslint-disable no-unused-vars */
import resource from "../services/source";
import { useSelector } from "react-redux";

const usePost = () => {
    const { token, userId } = useSelector(state => state.auth.userAuth)

    return ({
        getPosts: async (callback, optionsQuery) => {
            try {
                let query = []
                for (let key in optionsQuery) {
                    if (!optionsQuery[key]) {
                        continue
                    }
                    query.push(`${key}=${optionsQuery[key]}`)
                }

                const resp = await resource({
                    route: `/api/v1/post/${query.length >= 0 ? '?' + query.join('&') : ''}`,
                    method: 'GET',
                    tkn: token
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
                const resp = await resource({ route: `/api/v1/post`, method: 'POST', formData, tkn: token })
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
                const resp = await resource({ route: `/api/v1/post/${id_post}/comments`, method: 'GET', tkn: token })
                const data = await resp.json()
                if (!resp.ok) {
                    return callback(data.error)
                }
                callback(undefined, data)
            } catch (e) {

                return callback(e)
            }

        },
        getLikes: async (callback, from) => {
            try {
                const resp = await resource({ route: `/api/v1/like/${from}`, method: 'GET', tkn: token })
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
                const resp = await resource({ route: `/api/v1/post/${id_post}/commentby/${userId}`, body: { text }, tkn: token, method: 'PUT' })
                const data = await resp.json()
                if (!resp.ok) {
                    return callback(data.error)
                }
                callback(undefined, data)
            } catch (e) {

                return callback(e)
            }
        },
        sendLike: async (callback, postId) => {
            try {
                const resp = await resource({ route: `/api/v1/like/${postId}/post`, method: 'POST', tkn: token })
                const data = await resp.json()
                if (!resp.ok) {
                    return callback(data.error)
                }
                callback()
            } catch (e) {

                return callback(e)
            }
        },
        reportPost: async (callback, id_post, reason, type) => {
            try {
                const resp = await resource({ route: `/api/v1/post/${id_post}/report`, body: { code: type, reason }, method: 'POST', tkn: token })
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
                const resp = await resource({ route: `/api/v1/post/${id_post}`, body: dataUpdate, method: 'PATCH', tkn: token })
                if (!resp.ok) {

                    const data = await resp.json()
                    return callback(data.error)
                }
                callback()
            } catch (e) {
                callback(e)
            }
        },
        deletePost: async (callback, postId) => {
            try {
                const resp = await resource({ route: `/api/v1/post/${postId}`, method: 'DELETE', tkn: token })
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