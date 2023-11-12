import "./viewprofile.css";
import { NavLink, useNavigate } from "react-router-dom";
import MainViewPost from "../../posts/mainviewpost/MainViewPost";
import usePost from "../../../hooks/usePost";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { useParams } from "react-router-dom";
import useUser from "../../../hooks/useUser";

import { TbLockOff } from "react-icons/tb";

export default function ViewProfile({ mode_foreign = false }) {
  const navigate = useNavigate();
  const { getInfoUser } = useUser(navigate);
  const { getPosts } = usePost(navigate);
  const [posts, setPosts] = useState([]);
  const { id_user_view } = useParams();
  const [username_view, setUsername_view] = useState("");
  const [fullname_view, setFullname_view] = useState("");
  const [user_bio_view, setUser_Bio_view] = useState("");
  const [friends_view, setFriends_view] = useState([1, 2, 3, 3]);
  const [view_private, setView_Private] = useState(false);
  const [avatar_view, setAvatar_view] = useState("");

  const {
    friends,
    setInfo,
    id_user,
    fullname,
    username,
    user_bio,
    url_avatar,
  } = useContext(UserContext);

  useEffect(() => {
    if (!id_user && !id_user_view) return;

    // console.log(id_user, id_user_view);
    if (id_user_view && parseInt(id_user_view) !== id_user) {
      getPosts(setInfo, setPosts, id_user_view, false);
      getInfoUser(
        setInfo,
        setUsername_view,
        () => {},
        setFullname_view,
        () => {},
        setAvatar_view,
        () => {},
        setUser_Bio_view,
        () => {},
        setView_Private,
        id_user_view
      );
      return;
    }
    setFullname_view(fullname);
    setAvatar_view(url_avatar);
    setUsername_view(username);
    setFriends_view(friends);
    getPosts(setInfo, setPosts, id_user);
  }, [id_user]);

  return (
    <>
      <div className="container_view_profile">
        <div className="container_data_user">
          <div className="container_avatar">
            <img
              className="avatar avatar_profile"
              src={mode_foreign ? avatar_view : url_avatar}
              alt=""
            />
          </div>
          <div className="container_info">
            <div className="title_fullname">
              {mode_foreign ? fullname_view : fullname}
            </div>
            <div className="title_username">
              @{mode_foreign ? username_view : username}
            </div>

            <div className="info_perfil view_perfil">
              <div>
                <p className="item">{posts.length}</p>
                Publicaciones
              </div>
              <div>
                <p className="item">
                  {mode_foreign ? friends_view.length : friends.length}
                </p>
                Amigos
              </div>

              {!mode_foreign ? (
                <NavLink
                  to="/home/profile/edit"
                  className="button_edit_profile"
                  onClick={() => {}}
                >
                  Editar Perfil
                </NavLink>
              ) : (
                <NavLink
                  className="button_edit_profile"
                  onClick={() => {
                    alert("Funcion en proceso");
                  }}
                >
                  Añadir amigo
                </NavLink>
              )}
            </div>

            <div>{mode_foreign ? user_bio_view : user_bio}</div>
          </div>
        </div>

        <div className="container_self_posts">
          {posts.length !== 0 ? (
            <MainViewPost posts={posts} info_author={false} />
          ) : id_user !== parseInt(id_user_view) &&
            view_private &&
            mode_foreign ? (
            <div className="box_info_perfil_private">
              <TbLockOff size={50} />
              Este perfil es privado
            </div>
          ) : mode_foreign ? (
            <>
              <div className="box_info_perfil_not_posts">
                Este usuario aun no tiene publicaciones
              </div>
            </>
          ) : (
            <>
              <div className="box_info_perfil_not_posts">
                Aun no tienes publicaciones
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
