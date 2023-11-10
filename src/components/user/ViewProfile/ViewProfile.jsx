import "./viewprofile.css";
import { NavLink, useNavigate } from "react-router-dom";
import MainViewPost from "../../posts/mainviewpost/MainViewPost";
import usePost from "../../../hooks/usePost";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";

export default function ViewProfile() {
  const navigate = useNavigate();
  const { getPosts } = usePost(navigate);
  const [posts, setPosts] = useState([]);

  const {
    setInfo,
    id_user,
    fullname,
    username,
    user_bio,
    url_avatar,
    numberFriends,
    numberPosts,
  } = useContext(UserContext);

  useEffect(() => {
    if (!id_user) return;
    getPosts(setInfo, setPosts, id_user);
  }, [id_user]);

  return (
    <>
      <div className="container_view_profile">
        <div className="container_data_user">
          <div className="container_avatar">
            <img className="avatar avatar_profile" src={url_avatar} alt="" />
          </div>
          <div className="container_info">
            <div className="title_fullname">{fullname}</div>
            <div className="title_username">@{username}</div>

            <div className="info_perfil view_perfil">
              <div>
                <p className="item">{numberPosts}</p>
                Publicaciones
              </div>
              <div>
                <p className="item">{numberFriends}</p>
                Amigos
              </div>

              <NavLink
                to="/home/profile/edit"
                className="button_edit_profile"
                onClick={() => {}}
              >
                Editar Perfil
              </NavLink>
            </div>

            <div>{user_bio}</div>
          </div>
        </div>
        <div className="container_self_posts">
          <MainViewPost posts={posts} info_author={false} />
        </div>
      </div>
    </>
  );
}
