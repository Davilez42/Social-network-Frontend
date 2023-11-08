

import posts_db from "../components/posts/posts_db.json";
import comments_db from '../components/posts/posts_comments_db.json'

const usePost = () => {


    return ({
        getPosts: async (setPosts) => {
            setPosts(posts_db)
        },
        getCommentsPost: async (id_post, setComments) => {
            setComments(comments_db.filter((coment) => coment.id_post === id_post))
        },
        sendPost: async (post) => {
            console.log(post);
        }
    })
}

export default usePost