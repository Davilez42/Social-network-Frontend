/* eslint-disable react/prop-types */
import "./viewprofile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillCheckCircle } from "react-icons/ai";
import FriendsModal from "../friendsmodal/FriendsModal";
import MainViewPost from "../../posts/mainviewpost/MainViewPost";
import useUser from "../../../hooks/useUser";
import { TbLockOff } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserContext } from "../../../context/userContext";
import { useContext } from "react";
import ButtonOptionRelation from "../buttonOptionRelation/ButtonOptionRelation";
// import usePost from "../../../hooks/usePost";

export default function ViewProfile({ mode_foreign = false }) {
  const {
    id,
    fullname,
    username,
    bio,
    avatar,
    countPosts,
    countFriends,
    checkVerified,
  } = useSelector((state) => state.user.userInfo);

  const navigate = useNavigate();
  const { setInfo } = useContext(UserContext);
  const { getInfoUser } = useUser(navigate);
  // const { getPosts } = usePost(navigate);

  const { userIdView } = useParams();
  const [usernameView, setUsernameView] = useState("");
  const [fullnameView, setFullnameView] = useState("");
  const [userBioView, setUserBioView] = useState("");
  const [avatarView, setAvatarView] = useState("");
  const [postsView, setPostsView] = useState(undefined);
  const [countPostsView, setCountPostsView] = useState(0);
  const [countFriendsView, setCountFriendsView] = useState(0);
  const [checkVerifiedView, setCheckVerifiedView] = useState(false);
  const [profileViewView, setProfileView] = useState(true);
  const [reciveRequestsView, setReciveRequestsView] = useState(true);

  const [requestSentIdView, setRequestSentIdView] = useState(null);
  const [relationIdView, setRelationIdView] = useState(null);
  const [requestReceivedIdView, setRequestReceivedIdView] = useState(null);

  const [friendsModal, setFriendsModal] = useState(false);

  useEffect(() => {
    if (userIdView && userIdView !== id) {
      getInfoUser(userIdView, (err, data) => {
        if (err) {
          return setInfo([err.message]);
        }
        setUsernameView(data.data.user.username);
        setFullnameView(data.data.user.fullname);
        setAvatarView(data.data.user.avatar.url);
        setUserBioView(data.data.user.bio);
        setCountPostsView(data.data.user.countPosts);
        setCountFriendsView(data.data.user.countFriends);
        setProfileView(data.data.user.profileView);
        setReciveRequestsView(data.data.user.receiveRequests);
        setCheckVerifiedView(data.data.user.checkVerified);
        setRelationIdView(data.data.user.myFriend?.relationId);
        setRequestSentIdView(data.data.user.requestSent?.requestId);
        setRequestReceivedIdView(data.data.user.requestReceived?.requestId);
      });
    } else {
      setFullnameView(fullname);
      setAvatarView(avatar.url);
      setUsernameView(username);
      setUserBioView(bio);
      setCountFriendsView(countFriends);
      setCountPostsView(countPosts);
      setProfileView(true);
      setCheckVerifiedView(checkVerified);
      setRelationIdView(null);
      setRequestSentIdView(null);
      setRequestReceivedIdView(null);
    }
    setPostsView([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, mode_foreign, userIdView]);

  return (
    <>
      {friendsModal ? (
        <FriendsModal
          userId={userIdView ?? id}
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
            <img className="avatar avatar_profile" src={avatarView} alt="" />
          </div>
          <div className="container_info">
            <div className="box_fullname">
              <div className="title_fullname">{fullnameView}</div>
              {checkVerifiedView ? (
                <AiFillCheckCircle
                  className="icon-check"
                  size={21}
                  color="green"
                />
              ) : (
                <></>
              )}
              {reciveRequestsView ? (
                <ButtonOptionRelation
                  selfUserId={id}
                  userIdView={userIdView}
                  relationId={relationIdView}
                  requestSentId={requestSentIdView}
                  requestReceivedId={requestReceivedIdView}
                />
              ) : (
                <></>
              )}
            </div>
            <div className="title_username">@{usernameView}</div>
            <div className="info_perfil view_perfil">
              <div>
                <p className="item">{countPostsView}</p>
                publicaciones
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (profileViewView) {
                    setFriendsModal(true);
                  }
                }}
              >
                <p className="item">{countFriendsView}</p>
                interesados
              </div>
            </div>

            <div className="box_user_bio">{userBioView}</div>
          </div>
        </div>

        <div className="container_self_posts">
          {(() => {
            if (!profileViewView) {
              return (
                <div className="box_info_perfil_private">
                  <TbLockOff size={50} />
                  Este perfil es privado
                </div>
              );
            }
            if (!postsView) {
              return <span className="loader"></span>;
            }
            if (postsView.length !== 0) {
              return <MainViewPost posts={postsView} avatar_author={false} />;
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
