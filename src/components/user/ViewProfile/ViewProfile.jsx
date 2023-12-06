/* eslint-disable react/prop-types */
import "./viewprofile.css";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import ViewFriendList from "../viewfriendslist/ViewFriendList";
import MainViewPost from "../../posts/mainviewpost/MainViewPost";

import useUser from "../../../hooks/useUser";
import usePost from "../../../hooks/usePost";

import { TbLockOff } from "react-icons/tb";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  setUserPosts,
  deleteRelationFriendLocal,
  deleteRequestUserLocal,
  setRequestUserLocal,
} from "../../../features/user/userSlice";
import { UserContext } from "../../../context/userContext";
import { useContext } from "react";

import { decryptDate } from "../../../helpers/encrypt";

export default function ViewProfile({ mode_foreign = false }) {
  const navigate = useNavigate();
  const { setInfo } = useContext(UserContext);

  const { getInfoUser, sendRequestFriend, deleteRelationFriend } =
    useUser(navigate);
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
  const [sendRequest, setSendRequest] = useState(true);
  //Contexto del usuario
  //const [refresh, setRefresh] = useState(false);

  const {
    friends,
    id_user,
    fullname,
    username,
    user_bio,
    url_avatar,
    userPosts,
  } = decryptDate(useSelector((state) => state.user.userInfo));

  const dispatch = useDispatch();

  useEffect(() => {
    if (!id_user && !id_user_view) return;
    if (id_user_view && parseInt(id_user_view) !== id_user) {
      getPosts(setInfo, setPosts_view, { by_user: id_user_view });
      getInfoUser(setInfo, id_user_view, (user) => {
        setUsername_view(user.username);
        setFullname_view(user.fullname);
        setAvatar_view(user.url_avatar);
        setUser_Bio_view(user.user_bio);
        setFriends_view(user.friends);
        setView_Private(user.view_private);
      });
      return;
    }
    setFullname_view(fullname);
    setAvatar_view(url_avatar);
    setUsername_view(username);
    setFriends_view(friends.filter((f) => f.friend_state === "accepted"));
    setUser_Bio_view(user_bio);
    if (!userPosts) {
      //*OPTIMIZACION DE PUBLICACIONES DEL PROPIO USUARIO
      getPosts(
        setInfo,
        (posts) => {
          setPosts_view(posts);
          dispatch(setUserPosts(posts));
        },
        { by_user: id_user }
      );
    } else {
      setPosts_view(userPosts.filter((p) => p.post_visibility));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_user, mode_foreign, id_user_view]);

  const handlerActionSelectFriend = (id_user) => {
    navigate(`/home/profile/view/${id_user}`);
    setActivate_view_friend(false);
    //setRefresh(!refresh);
  };

  const handlerDeleteFriend = (id_relation) => {
    if (!id_user_view) return;
    deleteRelationFriend(
      setInfo,
      id_relation,
      () => {},
      () => {
        dispatch(deleteRelationFriendLocal(id_relation));
      },
      false
    );
    setFriends_view(friends_view.filter((f) => f.user[0] !== id_user));
  };

  const handlerSendRequest = () => {
    if (!id_user_view) return;
    sendRequestFriend(
      setInfo,
      id_user_view,
      () => {
        setSendRequest(false);
      },
      () => {
        dispatch(
          setRequestUserLocal([id_user_view, username_view, avatar_view])
        );
        setSendRequest(false);
      }
    );
  };
  const handlerDeleteRequest = (id_user_delete) => {
    console.log(id_user_delete);
    deleteRelationFriend(
      setInfo,
      id_user_delete,
      () => {
        setSendRequest(true);
      },
      () => {
        setSendRequest(true);
        dispatch(deleteRequestUserLocal(id_user_delete));
      },
      true
    );
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
                  const friend_found = (friends || []).find(
                    (f) => parseInt(f.user[0]) === id_user_v
                  );

                  if (friend_found) {
                    const { friend_state, user_requesting } = friend_found;

                    if (friend_state === "accepted") {
                      return (
                        <div
                          onClick={() => {
                            setSendRequest(true);
                            handlerDeleteFriend(friend_found.id_relation);
                          }}
                          className="button_option_friend"
                        >
                          Eliminar
                        </div>
                      );
                    }
                    if (friend_state === "pending") {
                      if (user_requesting === id_user) {
                        return (
                          <div
                            onClick={() => {
                              handlerDeleteRequest(id_user_v);
                            }}
                            className="button_option_friend"
                          >
                            Cancelar solicitud
                          </div>
                        );
                      }
                      return (
                        <div
                          onClick={() => {
                            handlerSendRequest();
                          }}
                          className="button_option_friend"
                        >
                          Aceptar
                        </div>
                      );
                    }
                  }
                  //||friends_view.some((f) =>f.user[0] === parseInt(id_user_view) && f.friend_state === "pending")
                  return !sendRequest ? (
                    <div
                      onClick={() => {
                        handlerDeleteRequest(id_user_v);
                      }}
                      className="button_option_friend"
                    >
                      Cancelar solicitud
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        handlerSendRequest();
                      }}
                      className="button_option_friend"
                    >
                      Añadir
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
