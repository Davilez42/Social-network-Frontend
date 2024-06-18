/* eslint-disable react/prop-types */
import "./viewprofile.css";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillCheckCircle } from "react-icons/ai";

import FriendsModal from "../friendsmodal/FriendsModal";
import MainViewPost from "../../posts/mainviewpost/MainViewPost";

import useUser from "../../../hooks/useUser";
import usePost from "../../../hooks/usePost";

import { TbLockOff } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { UserContext } from "../../../context/userContext";
import { useContext } from "react";

import { decryptDate } from "../../../helpers/encrypt";

export default function ViewProfile({ mode_foreign = false }) {
  const navigate = useNavigate();
  const { setInfo } = useContext(UserContext);

  const { getInfoUser, sendRequestFriend, deleteRelation } = useUser(navigate);
  const { getPosts } = usePost(navigate);

  const { id_user_view } = useParams();
  const [username_view, setUsername_view] = useState("");
  const [fullname_view, setFullname_view] = useState("");
  const [user_bio_view, setUser_Bio_view] = useState("");
  const [avatar_view, setAvatar_view] = useState("");

  const [posts_view, setPosts_view] = useState(null);
  const [countPosts_view, setCountPosts_view] = useState(0);
  const [countFriends_view, setCountFriends_view] = useState(0);

  const [verified_view, setVerified_view] = useState(false);

  const [profileView, setProfileView] = useState(true);
  const [reciveRequests, setReciveRequests] = useState(true);

  const [friendsModal, setFriendsModal] = useState(false);

  const [buttonAddFriend, setButtonAddFriend] = useState(true);

  const [buttonDelRequest, setButtonDelRequest] = useState();
  const [buttonDelFriend, setButtonDelFriend] = useState();
  const [buttonRejectRequest, setButtonRejectRequest] = useState();

  const {
    id_user,
    fullname,
    username,
    bio,
    avatar,
    countPosts,
    countFriends,
    verified,
  } = decryptDate(useSelector((state) => state.user.userInfo));

  useEffect(() => {
    setPosts_view(undefined);
    if (!id_user && !id_user_view) return;
    if (id_user_view && id_user_view !== id_user) {
      getInfoUser(id_user_view, (err, data) => {
        if (err) {
          return setInfo([err.message]);
        }
        setUsername_view(data.data.user.username);
        setFullname_view(data.data.user.fullname);
        setAvatar_view(data.data.user.avatar.url);
        setUser_Bio_view(data.data.user.bio);
        setCountPosts_view(data.data.user.countPosts);
        setCountFriends_view(data.data.user.countFriends);
        setProfileView(data.data.user.user_preferences.profileView);
        setReciveRequests(data.data.user.user_preferences.receive_requests);
        setVerified_view(data.data.user.verified);
        setButtonDelFriend(data.data.user.friend);
        setButtonDelRequest(data.data.user.requestSent);
        setButtonRejectRequest(data.data.user.requestReceived);

        if (data.data.user.user_preferences.profileView) {
          getPosts(
            (err, data) => {
              if (err) {
                return setInfo([err.message]);
              }
              setPosts_view(data.data.posts);
            },
            {
              user: id_user_view,
            }
          );
        }
      });

      return;
    }
    setFullname_view(fullname);
    setAvatar_view(avatar.url);
    setUsername_view(username);
    setUser_Bio_view(bio);
    setCountFriends_view(countFriends);
    setCountPosts_view(countPosts);
    setProfileView(true);
    setVerified_view(verified);
    getPosts(
      (err, data) => {
        if (err) {
          return setInfo([err.message]);
        }
        setPosts_view(data.data.posts);
      },
      {
        user: id_user,
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_user, mode_foreign, id_user_view]);

  const handlerDeleteRelation = (id_relation, request = false) => {
    deleteRelation(
      (err) => {
        if (err) {
          return setInfo([err.message]);
        }
        if (!request) {
          setCountFriends_view(countFriends_view - 1);
        }
        setButtonAddFriend(undefined);
        setButtonDelFriend(undefined);
        setButtonDelRequest(undefined);
        setButtonRejectRequest(undefined);
        setButtonAddFriend(true);
      },
      id_relation,
      request
    );
  };

  const handlerSendRequest = () => {
    sendRequestFriend((err, data) => {
      if ((err, data)) {
        if (err) {
          return setInfo([err.message]);
        }
        if (data.data.id_request) {
          setButtonDelRequest(data.data);
        } else {
          setCountFriends_view(countFriends_view + 1);
          setButtonDelFriend(data.data);
        }

        return setInfo([err.message]);
      }
    }, id_user_view);
  };

  return (
    <>
      {friendsModal ? (
        <FriendsModal
          id_user={id_user_view ? id_user_view : id_user}
          closeView={() => {
            setFriendsModal(false);
          }}
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
              <div className="title_fullname">{fullname_view}</div>
              {verified_view ? (
                <AiFillCheckCircle
                  className="icon-check"
                  size={21}
                  color="green"
                />
              ) : (
                <></>
              )}
              {(() => {
                if (!reciveRequests && !buttonDelFriend) {
                  return <></>;
                }
                if (!id_user_view || id_user_view === id_user) {
                  return (
                    <NavLink
                      to="/home/profile/edit"
                      className="button_option_user btn-option-user-profile"
                    >
                      Editar Perfil
                    </NavLink>
                  );
                }

                if (buttonDelFriend) {
                  return (
                    <div
                      onClick={() => {
                        handlerDeleteRelation(buttonDelFriend.id_relation);
                      }}
                      className="button_option_user"
                    >
                      Eliminar
                    </div>
                  );
                }
                if (buttonDelRequest || buttonRejectRequest) {
                  return (
                    <div
                      onClick={() => {
                        handlerDeleteRelation(
                          buttonDelRequest?.id_request ||
                            buttonRejectRequest?.id_request,
                          true
                        );
                      }}
                      className="button_option_user"
                    >
                      {buttonDelRequest
                        ? "Cancelar Solicitud"
                        : " Rechazar Solicitud"}
                    </div>
                  );
                }

                if (buttonAddFriend) {
                  return (
                    <div
                      onClick={() => {
                        handlerSendRequest();
                      }}
                      className="button_option_user"
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
                <p className="item">{countPosts_view}</p>
                publicaciones
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (profileView) {
                    setFriendsModal(true);
                  }
                }}
              >
                <p className="item">{countFriends_view}</p>
                amigos
              </div>
            </div>

            <div className="box_user_bio">{user_bio_view}</div>
          </div>
        </div>

        <div className="container_self_posts">
          {(() => {
            if (!profileView) {
              return (
                <div className="box_info_perfil_private">
                  <TbLockOff size={50} />
                  Este perfil es privado
                </div>
              );
            }
            if (!posts_view) {
              return <span className="loader"></span>;
            }
            if (posts_view.length !== 0) {
              return <MainViewPost posts={posts_view} avatar_author={false} />;
            }
            return (
              <div className="box_info_perfil_not_posts">
                {mode_foreign
                  ? "Este usuario aun no tiene publicaciones"
                  : "Aun no tienes publicaciones"}
              </div>
            );
          })()}
        </div>
      </div>
    </>
  );
}
