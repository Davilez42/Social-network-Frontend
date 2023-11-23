/* eslint-disable react/prop-types */
import "./viewprofile.css";
import { NavLink, useNavigate } from "react-router-dom";
import MainViewPost from "../../posts/mainviewpost/MainViewPost";
import usePost from "../../../hooks/usePost";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { useParams } from "react-router-dom";
import useUser from "../../../hooks/useUser";

import { TbLockOff } from "react-icons/tb";
import ViewFriendList from "../viewfriendslist/ViewFriendList";

export default function ViewProfile({ mode_foreign = false }) {
  const navigate = useNavigate();
  const { getInfoUser, sendRequestFriend } = useUser(navigate);
  const { getPosts } = usePost(navigate);

  const { id_user_view } = useParams();
  const [username_view, setUsername_view] = useState("");
  const [fullname_view, setFullname_view] = useState("");
  const [user_bio_view, setUser_Bio_view] = useState("");
  const [avatar_view, setAvatar_view] = useState("");

  const [friends_view, setFriends_view] = useState([]);
  const [posts_view, setPosts_view] = useState(null);

  const [view_private, setView_Private] = useState(false);
  const [activate_view_friends, setActivate_view_friend] = useState(false);
  const [sendRequest, setSendRequest] = useState(false);
  //Contexto del usuario
  const [refresh, setRefresh] = useState(false);

  const {
    friends,
    setInfo,
    id_user,
    fullname,
    username,
    user_bio,
    url_avatar,
    setFriends,
  } = useContext(UserContext);

  useEffect(() => {
    if (!id_user && !id_user_view) return;
    if (id_user_view && parseInt(id_user_view) !== id_user) {
      console.log("conecta");
      getPosts(setInfo, setPosts_view, id_user_view, false);
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
        setFriends_view,
        setView_Private,
        id_user_view
      );
      return;
    }
    setFullname_view(fullname);
    setAvatar_view(url_avatar);
    setUsername_view(username);
    setFriends_view(friends.filter((f) => f.friend_state === "accepted"));
    setUser_Bio_view(user_bio);
    getPosts(setInfo, setPosts_view, id_user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_user, refresh]);

  const handlerActionSelectFriend = (id_user) => {
    navigate(`/home/profile/view/${id_user}`);
    setActivate_view_friend(false);
    setRefresh(!refresh);
  };

  const actionRevert = () => {
    setFriends(friends.filter((f) => f.user[0] !== parseInt(id_user_view)));
  };

  const handlerSendRequest = () => {
    if (!id_user_view) return;
    sendRequestFriend(setInfo, id_user_view, actionRevert);
  };

  const handlerDeleteRequest = () => {
    if (!id_user_view) return;
    setFriends(friends.filter((f) => f.user[0] !== parseInt(id_user_view)));
    setSendRequest(false);
  };

  return (
    <>
      {activate_view_friends ? (
        <ViewFriendList
          friends_view={friends_view}
          actionCloseAction={setActivate_view_friend}
          actionSelectFriend={handlerActionSelectFriend}
        />
      ) : (
        <></>
      )}
      <div className="container_view_profile">
        <div className="container_data_user">
          <div className="container_avatar">
            <img className="avatar avatar_profile" src={avatar_view} alt="" />
          </div>
          <div className="container_info">
            <div className="box_fullname">
              <span className="title_fullname">{fullname_view}</span>

              {(() => {
                const id_user_v = parseInt(id_user_view);
                if (id_user === id_user_v || !id_user_view) {
                  return (
                    <NavLink
                      to="/home/profile/edit"
                      className="button_edit_profile"
                    >
                      Editar Perfil
                    </NavLink>
                  );
                } else {
                  const friend_found = friends.filter(
                    (f) => f.user[0] === id_user_v
                  );
                  console.log(friend_found);
                  if (friend_found.length !== 0) {
                    if (friend_found[0].friend_state === "accepted") {
                      return (
                        <div
                          onClick={() => {
                            alert("Esta funcion se encuentra en desarollo");
                          }}
                          className="button_option_friend"
                        >
                          Eliminar amigo
                        </div>
                      );
                    }
                    if (friend_found[0].friend_state === "pending") {
                      if (friend_found[0].user_requesting === id_user)
                        return (
                          <div
                            onClick={() => {
                              handlerDeleteRequest();
                            }}
                            className="button_option_friend"
                          >
                            Cancelar solicitud
                          </div>
                        );

                      return (
                        <div
                          onClick={() => {
                            handlerSendRequest();
                            setRefresh(!refresh);
                          }}
                          className="button_option_friend"
                        >
                          Aceptar solicitud
                        </div>
                      );
                    }
                  }
                  //||friends_view.some((f) =>f.user[0] === parseInt(id_user_view) && f.friend_state === "pending")
                  return sendRequest ? (
                    <div
                      onClick={() => {
                        handlerDeleteRequest();
                      }}
                      className="button_option_friend"
                    >
                      Cancelar solicitud
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setSendRequest(true);
                        handlerSendRequest();
                      }}
                      className="button_option_friend"
                    >
                      Añadir amigo
                    </div>
                  );
                }
              })()}
            </div>
            <div className="title_username">@{username_view}</div>

            <div className="info_perfil view_perfil">
              <div>
                <p className="item">{posts_view?.length || 0}</p>
                publicaciones
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setActivate_view_friend(!activate_view_friends);
                }}
              >
                <p className="item">{friends_view.length}</p>
                amigos
              </div>
            </div>

            <div className="box_user_bio">{user_bio_view}</div>
          </div>
        </div>

        <div className="container_self_posts">
          {(() => {
            if (!posts_view) {
              return <span className="loader"></span>;
            } else if (posts_view.length !== 0) {
              return <MainViewPost posts={posts_view} info_author={false} />;
            } else if (view_private && mode_foreign) {
              return (
                <div className="box_info_perfil_private">
                  <TbLockOff size={50} />
                  Este perfil es privado
                </div>
              );
            } else {
              return (
                <div className="box_info_perfil_not_posts">
                  {mode_foreign
                    ? "Este usuario aun no tiene publicaciones"
                    : "Aun no tienes publicaciones"}
                </div>
              );
            }
          })()}
        </div>
      </div>
    </>
  );
}
