/* eslint-disable react/prop-types */
import "./viewprofile.css";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillCheckCircle } from "react-icons/ai";

import FriendsModal from "../friendsmodal/FriendsModal";
import MainViewPost from "../../posts/mainviewpost/MainViewPost";

import useUser from "../../../hooks/useUser";
//import usePost from "../../../hooks/usePost";

import { TbLockOff } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFriendLocal,
  deleteRequestUserLocal,
  setRequestUserLocal,
} from "../../../features/user/userSlice";
import { UserContext } from "../../../context/userContext";
import { useContext } from "react";

import { decryptDate } from "../../../helpers/encrypt";

export default function ViewProfile({ mode_foreign = false }) {
  const navigate = useNavigate();
  const { setInfo } = useContext(UserContext);

  const { getInfoUser, sendRequestFriend, deleteRelation } = useUser(navigate);
  //const { getPosts } = usePost(navigate);

  const { id_user_view } = useParams();
  const [username_view, setUsername_view] = useState("");
  const [fullname_view, setFullname_view] = useState("");
  const [user_bio_view, setUser_Bio_view] = useState("");
  const [avatar_view, setAvatar_view] = useState("");

  const [friends_view, setFriends_view] = useState([]);
  const [posts_view, setPosts_view] = useState(null);
  const [verified_view, setVerified_view] = useState(false);

  const [profileView, setProfileView] = useState(true);
  const [reciveRequests, setReciveRequests] = useState(true);
  const [info_, setInfo_] = useState({});

  const [friendsModal, setFriendsModal] = useState(false);

  //Contexto del usuario
  //const [refresh, setRefresh] = useState(false);

  const {
    friends,
    requests,
    my_requests_sent,
    _id,
    fullname,
    username,
    bio,
    avatar,
    posts,
    verified,
  } = decryptDate(useSelector((state) => state.user.userInfo));

  const dispatch = useDispatch();

  useEffect(() => {
    if (!_id && !id_user_view) return;
    if (id_user_view && id_user_view !== _id) {
      getInfoUser(id_user_view, (err, data) => {
        if (err) {
          return setInfo([err.message]);
        }
        setUsername_view(data.data.user.username);
        setFullname_view(data.data.user.fullname);
        setAvatar_view(data.data.user.avatar.url);
        setUser_Bio_view(data.data.user.user_bio);
        setFriends_view(data.data.user.friends);
        setProfileView(data.data.user.user_preferences.profileView);
        setReciveRequests(data.data.user.user_preferences.receive_requests);
        setPosts_view(data.data.user.posts);
        setVerified_view(data.data.user.verified);
        setInfo_(data.data.info);
      });

      return;
    }

    setFullname_view(fullname);
    setAvatar_view(avatar.url);
    setUsername_view(username);
    setFriends_view(friends);
    setUser_Bio_view(bio);
    setPosts_view(posts);
    setProfileView(true);
    setVerified_view(verified);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id, mode_foreign, id_user_view]);

  const handlerActionSelectFriend = (id_user) => {
    navigate(`/home/profile/view/${id_user}`);
    setFriendsModal(false);
    //setRefresh(!refresh);
  };

  const handlerDeleteFriend = (id_relation) => {
    if (!id_user_view) return;
    deleteRelation((err) => {
      if (err) {
        return setInfo([err.message]);
      }
      setFriends_view(friends_view.filter((f) => f._id !== id_relation));
      dispatch(deleteFriendLocal(id_relation));
    }, id_relation);
    setFriends_view(friends_view.filter((f) => f.user[0] !== _id));
  };

  const handlerSendRequest = () => {
    sendRequestFriend((err, data) => {
      if (err) {
        return setInfo([err.message]);
      }
      dispatch(
        setRequestUserLocal({
          _id: data.data.id_request,
          user: {
            _id: id_user_view,
            avatar: {
              url: avatar_view,
            },
          },
        })
      );
    }, id_user_view);
  };
  const handlerDeleteRequest = (id_request) => {
    deleteRelation(
      (err) => {
        if (err) {
          return setInfo([err.message]);
        }
        dispatch(deleteRequestUserLocal(id_request));
      },
      id_request,
      true
    );
  };

  return (
    <>
      {friendsModal ? (
        <FriendsModal
          friends_view={friends_view}
          actionCloseAction={setFriendsModal}
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
              <div className="title_fullname">{fullname_view}</div>
              {verified_view ? (
                <AiFillCheckCircle
                  className="icon-check"
                  size={25}
                  color="green"
                />
              ) : (
                <></>
              )}
              {(() => {
                const id_user_v = id_user_view;

                if (!reciveRequests) {
                  return <></>;
                }
                if (_id === id_user_v || !id_user_view) {
                  return (
                    <NavLink
                      to="/home/profile/edit"
                      className="button_option_user btn-option-user-profile"
                    >
                      Editar Perfil
                    </NavLink>
                  );
                }
                const friend_found = (friends || []).find(
                  (f) => f.user._id === id_user_v
                );
                const req_found = (requests || []).find(
                  (f) => f.user._id === id_user_v
                );

                const req_sent_found = (my_requests_sent || []).find(
                  (f) => f.user._id === id_user_v
                );

                if (friend_found) {
                  return (
                    <div
                      onClick={() => {
                        handlerDeleteFriend(friend_found._id);
                      }}
                      className="button_option_user btn-option-user-profile"
                    >
                      Eliminar
                    </div>
                  );
                }

                if (req_found) {
                  return (
                    <div className="block-buttons-acp-rec">
                      <div
                        onClick={() => {
                          handlerDeleteRequest(
                            req_sent_found?._id || req_found?._id
                          );
                        }}
                        className="button_option_user"
                      >
                        Rechazar
                      </div>
                      <div
                        onClick={() => {
                          handlerSendRequest(id_user_v);
                        }}
                        className="button_option_user"
                      >
                        Aceptar
                      </div>
                    </div>
                  );
                }
                if (req_sent_found) {
                  return (
                    <div
                      onClick={() => {
                        handlerDeleteRequest(
                          req_sent_found?._id || req_found?._id
                        );
                      }}
                      className="button_option_user"
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
                    className="button_option_user"
                  >
                    Añadir
                  </div>
                );
              })()}
            </div>
            <div className="title_username">@{username_view}</div>

            <div className="info_perfil view_perfil">
              <div>
                <p className="item">{posts_view?.length | info_.countposts}</p>
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
                <p className="item">
                  {friends_view?.length | info_.countfriends}
                </p>
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
              return <MainViewPost posts={posts_view} info_author={false} />;
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
