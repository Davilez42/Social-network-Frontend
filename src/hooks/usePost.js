/* eslint-disable no-unused-vars */
import resource from "../services/source";
import PermissionInvalid from '../exceptions/PermissionInvalid';
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../features/auth/authSlice";
import { decryptDate } from "../helpers/encrypt";

const usePost = (usenavigate) => {

    const dispatch = useDispatch()
    const { csrftoken } = decryptDate(useSelector(state => state.auth.userAuth))

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
                const resp = await resource({
                    route: `/api/v1/post/${query.length >= 0 ? '?' + query.join('&') : ''}`,
                    method: 'GET',
                    tkn: csrftoken
                })
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
                const resp = await resource({ route: '/api/v1/post/', method: 'PUT', formData, tkn: csrftoken })
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
                const resp = await resource({ route: `/api/v1/comment/getComments/${id_post}`, method: 'GET', tkn: csrftoken })
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
                const resp = await resource({ route: `/api/v1/post/${id_post}/likes`, method: 'GET', tkn: csrftoken })
                const data = await resp.json()
                if (!resp.ok) {
                    actionReverse()
                    handlerError([data.message])
                }
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
                const resp = await resource({ route: `/api/v1/comment/createComment/${id_post}`, body: { text }, tkn: csrftoken })

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

                const resp = await resource({ route: `/api/v1/post/${id_post}/like`, method: 'PUT', tkn: csrftoken })
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
        reportPost: async (handlerError, id_post, reason, type_report, actionSucces) => {
            try {
                const resp = await resource({ route: `/api/v1/post/${id_post}/report`, body: { type_report, reason }, method: 'PUT', tkn: csrftoken })
                if (!resp.ok) {
                    const data = await resp.json()
                    handlerError([data.message])
                    return;
                }
                actionSucces()
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
                const resp = await resource({ route: `/api/v1/post/${id_post}`, body: dataUpdate, method: 'PATCH', tkn: csrftoken })
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
                const resp = await resource({ route: `/api/v1/post/${id_post}`, method: 'DELETE', tkn: csrftoken })
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