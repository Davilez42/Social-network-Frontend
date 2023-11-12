import comments_db from '../components/posts/posts_comments_db.json'
import resource from "../services/source";
import { useCookies } from 'react-cookie';
import PermissionInvalid from '../exceptions/PermissionInvalid';


const usePost = (usenavigate) => {
    const [cookies, setCookie, removeCookie] = useCookies(["tkn"]);
    const logout = () => {
        removeCookie('tkn')
        window.sessionStorage.removeItem('tkn')
        usenavigate('/login')
    }

    return ({
        getPosts: async (handlerError, setPosts, id_user, self = true) => {
            try {
                //alert(id_user)
                const query = id_user ? (self ? `?self_user=${id_user}` : `?by_user=${id_user}`) : ''

                const tkn = window.sessionStorage.getItem('tkn')
                const resp = await resource(`/api/v1/post/getPosts/${query}`, undefined, 'GET', tkn)
                const data = await resp.json()
                if (!resp.ok) {
                    return handlerError([data.message])

                }
                //console.log(data.posts);
                setPosts(data.posts)

            } catch (e) {
                if (e instanceof PermissionInvalid) return logout()
            }
        },
        sendPost: async (handlerError, text, files, actionClear) => {
            try {
                const tkn = window.sessionStorage.getItem('tkn')
                const formData = new FormData();
                console.log(text, files);
                formData.append('text', text)
                for (const file of files) {
                    formData.append('media', file)
                }
                const resp = await resource('/api/v1/post/createPost', undefined, 'POST', tkn, formData)

                if (!resp.ok) {
                    const data = await resp.json()
                    handlerError([data.message])
                    return
                }
                actionClear()
                usenavigate('/home/feed')
                handlerError(['¡Listo! Tu publicación se ha cargado correctamente.'])

            } catch (e) {
                if (e instanceof PermissionInvalid) {
                    if (e.code === 'ACCOUNT_BANNED' || e.code === 'INSUFFICIENT_PERMITS') {
                        handlerError([e.message])
                        actionClear()
                        return
                    }
                    logout()
                }

            }
        }
        ,
        getCommentsPost: async (id_post, setComments) => {
            setComments(comments_db.filter((coment) => coment.id_post === id_post))
        }
    })
}

export default usePost