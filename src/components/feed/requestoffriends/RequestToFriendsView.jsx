/* eslint-disable react/prop-types */
import { PiArrowLeftBold } from "react-icons/pi";
import "./requestofriendsview.css";
import useUser from "../../../hooks/useUser";
import { UserContext } from "../../../context/userContext";
import { useDispatch } from "react-redux";
import { useContext, useState } from "react";
import {
  setFriendLocal,
  deleteRequestUserLocal,
} from "../../../features/user/userSlice";

const RequestToFriendsView = ({ requests_pending = [], actionCloseAction }) => {
  const [requestsFriend, setRequestsFriend] = useState(requests_pending);
  // const { friends } = decryptDate(useSelector((state) => state.user.userInfo));
  const { setInfo } = useContext(UserContext);
  const dispatch = useDispatch();

  const { sendRequestFriend, deleteRelation } = useUser();

  const handlerAcceptRequest = (request_user) => {
    sendRequestFriend((err, data) => {
      if (err) {
        return setInfo([err]);
      }
      dispatch(
        setFriendLocal({
          _id: data.id_relation,
          user: request_user.user,
        })
      );
      setRequestsFriend(
        requestsFriend.filter((r) => r._id !== request_user._id)
      );
    }, request_user.user._id);
  };

  const handlerDeleteRequest = (id_request) => {
    deleteRelation(
      (err) => {
        if (err) {
          return setInfo([err]);
        }
        setRequestsFriend(requestsFriend.filter((r) => r._id !== id_request));
        dispatch(deleteRequestUserLocal(id_request));
      },
      id_request,
      true
    );
  };

  const actionSelectFriend = () => {};

  return (
    <div className="container_filter">
      <div id="request_container" className="container_friend_list_profile">
        <div
          className="back"
          onClick={() => {
            actionCloseAction(false);
          }}
        >
          <PiArrowLeftBold size={30} />
        </div>

        <p className="title_container">Solicitudes</p>
        <div className="friend-list-container">
          <div className="friend-list">
            {requestsFriend.length !== 0 ? (
              requestsFriend.map((request_user, index) => (
                <div
                  className="card_user_list"
                  key={index}
                  onClick={() => {
                    actionSelectFriend(request_user.user._id);
                  }}
                >
                  <img
                    className="avatar_user_list"
                    src={request_user.user.avatar.url}
                    alt=""
                  />
                  <span className="card_name_user">
                    {request_user.user.username}
                  </span>

                  <div className="container_button_option_request">
                    <div
                      onClick={() => {
                        handlerAcceptRequest(request_user);
                      }}
                      className="button_option_user button_option_request"
                    >
                      Aceptar
                    </div>
                    <div
                      onClick={() => {
                        handlerDeleteRequest(request_user._id);
                      }}
                      className="button_option_user button_option_request"
                    >
                      Rechazar
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No tienes Solicitudes</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestToFriendsView;
