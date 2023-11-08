import "./viewprofile.css";
import { NavLink, useNavigate } from "react-router-dom";
import MainViewPost from "../../posts/mainviewpost/MainViewPost";
import usePost from "../../../hooks/usePost";
import { useEffect, useState } from "react";
export default function ViewProfile() {
  const { getPosts } = usePost();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  //  <NavLink to="/home/profile/edit">Editar perfil</NavLink>

  useEffect(() => {
    getPosts(setPosts);
  });

  return (
    <>
      <div className="container_view_profile">
        <div className="container_data_user">
          <div className="container_avatar">
            <img
              className="avatar avatar_profile"
              src="https://media.istockphoto.com/id/1360028830/es/foto/mujer-joven-sonriendo-y-haciendo-gestos-para-copiar-el-espacio.jpg?s=612x612&w=0&k=20&c=6dOb0XPJ7pOnhki5XzV6D_m0PXOrDK0hfp0XSvXVfgo="
              alt=""
            />
          </div>
          <div className="container_info">
            <div className="title_fullname">Jose David Suarez Cardona</div>
            <div className="title_username">@DavidSuarez</div>

            <div className="info_perfil view_perfil">
              <div>
                <p className="item">{23}</p>
                Publicaciones
              </div>
              <div>
                <p className="item">{343}</p>
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

            <div>
              Soy una señora que tiene ni puta idea del por que estoy aqui
            </div>
          </div>
        </div>
        <div className="container_self_posts">
          <MainViewPost posts={posts} />
        </div>
      </div>
    </>
  );
}
