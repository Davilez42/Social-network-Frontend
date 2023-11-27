/* eslint-disable no-unused-vars */
import resource from "../services/source";
import { useCookies } from 'react-cookie';
import PermissionInvalid from '../exceptions/PermissionInvalid';
import { useDispatch } from "react-redux";
import { setAuth } from "../features/auth/authSlice";

const usePost = (usenavigate) => {

    const dispatch = useDispatch()
    const logout = () => {
        dispatch(setAuth(false))
        usenavigate('/login')
    }

    return ({
        getPosts: async (handlerError, setPosts, optionsQuery) => {
            try {
                let query = []
                for (let key in optionsQuery) {
                    query.push(`${key}=${optionsQuery[key]}`)
                }
                const resp = await resource(`/api/v1/post/${query.length >= 0 ? '?' + query.join('&') : ''}`, undefined, 'GET')
                const data = await resp.json()
                if (!resp.ok) {
                    return handlerError([data.message])
                }
                //console.log(data.posts);
                setPosts(data.posts)

            } catch (e) {
                console.log(e);
                if (e instanceof PermissionInvalid) return logout()
            }
        },
        sendPost: async (handlerError, text, files, actionClear) => {
            try {
                const formData = new FormData();
                formData.append('text', text)
                for (const file of files) {
                    formData.append('media', file)
                }
                const resp = await resource('/api/v1/post/', undefined, 'PUT', undefined, formData)
                if (!resp.ok) {
                    const data = await resp.json()
                    handlerError([data.message])
                    return
                }
                usenavigate('/home/feed')
                handlerError(['¡Listo! Tu publicación se ha cargado correctamente.'])

            } catch (e) {
                if (e instanceof PermissionInvalid) {
                    if (e.code === 'ACCOUNT_BANNED' || e.code === 'INSUFFICIENT_PERMITS') {
                        handlerError([e.message])
                        return
                    }
                    logout()
                }

            } finally {
                actionClear()
            }
        }
        ,
        getCommentsPost: async (handlerError, id_post, setComments) => {

            try {
                const resp = await resource(`/api/v1/comment/getComments/${id_post}`, undefined, 'GET')
                const data = await resp.json()
                if (!resp.ok) {
                    handlerError(['No pudimos cargar los comentarios de este post'])
                }
                setComments(data.comments)
            } catch (e) {
                console.log(e);
                if (e instanceof PermissionInvalid) {
                    if (e.code === 'ACCOUNT_BANNED' || e.code === 'INSUFFICIENT_PERMITS') {
                        handlerError([e.message])
                        return
                    }
                    logout()
                }
            }

        },
        getInfoLikesPost: async (handlerError, id_post, actionReverse, actionSuccess) => {
            try {
                const resp = await resource(`/api/v1/post/${id_post}/likes`, undefined, 'GET')
                const data = await resp.json()
                if (!resp.ok) {
                    actionReverse()
                    handlerError([data.message])
                }
                console.log(data.likesPost);
                actionSuccess(data.likesPost)
            } catch (e) {
                console.log(e);
                if (e instanceof PermissionInvalid) {
                    if (e.code === 'ACCOUNT_BANNED' || e.code === 'INSUFFICIENT_PERMITS') {
                        handlerError([e.message])
                        return
                    }
                    logout()
                }
            }
        },
        sendComment: async (handlerError, id_post, text) => {
            try {
                const tkn = window.sessionStorage.getItem('tkn')
                const resp = await resource(`/api/v1/comment/createComment/${id_post}`, { text }, 'POST', tkn)

                const data = await resp.json()
                if (!resp.ok) {
                    console.log(data);
                }

            } catch (e) {
                console.log(e);
                if (e instanceof PermissionInvalid) {
                    if (e.code === 'ACCOUNT_BANNED' || e.code === 'INSUFFICIENT_PERMITS') {
                        handlerError([e.message])
                        return
                    }
                    logout()
                }
            }
        },
        sendLike: async (handlerError, id_post, actionReverse) => {
            try {
                const tkn = window.sessionStorage.getItem('tkn')
                const resp = await resource(`/api/v1/post/${id_post}/like`, undefined, 'PUT', tkn)
                const data = await resp.json()
                if (!resp.ok) {
                    actionReverse()
                }
            } catch (e) {
                console.log(e);
                if (e instanceof PermissionInvalid) {
                    if (e.code === 'ACCOUNT_BANNED' || e.code === 'INSUFFICIENT_PERMITS') {
                        handlerError([e.message])
                        return
                    }
                    logout()
                }
            }
        },
        reportPost: async (handlerError) => {
            try {
                //TODO backend mauricio
                const tkn = window.sessionStorage.getItem('tkn')
                const resp = await resource(`/api/v1/post/`, undefined, 'PUT', tkn)
                const data = await resp.json()
                if (!resp.ok) {
                    handlerError([data.message])
                }
            } catch (e) {
                console.log(e);
                if (e instanceof PermissionInvalid) {
                    if (e.code === 'ACCOUNT_BANNED' || e.code === 'INSUFFICIENT_PERMITS') {
                        handlerError([e.message])
                        return
                    }
                    logout()
                }
            }
        },
        modifyPost: async (handlerError, id_post, dataUpdate, actionRevert, actionSuccess) => {
            try {
                const resp = await resource(`/api/v1/post/${id_post}`, dataUpdate, 'PATCH')
                if (!resp.ok) {
                    actionRevert()
                    const data = await resp.json()
                    handlerError([data.message])
                }
                actionSuccess()
            } catch (e) {
                console.log(e);
                if (e instanceof PermissionInvalid) {
                    if (e.code === 'ACCOUNT_BANNED' || e.code === 'INSUFFICIENT_PERMITS') {
                        handlerError([e.message])
                        return
                    }
                    logout()
                }
            }
        },
        deletePost: async (handlerError, id_post, actionRevert, actionSuccess) => {
            try {
                const resp = await resource(`/api/v1/post/${id_post}`, undefined, 'DELETE')
                if (!resp.ok) {
                    const data = await resp.json()
                    actionRevert()
                    handlerError([data.message])
                }
                actionSuccess()
            } catch (e) {
                console.log(e);
                if (e instanceof PermissionInvalid) {
                    if (e.code === 'ACCOUNT_BANNED' || e.code === 'INSUFFICIENT_PERMITS') {
                        handlerError([e.message])
                        return
                    }
                    logout()
                }
            }
        }


    })
}
export default usePost