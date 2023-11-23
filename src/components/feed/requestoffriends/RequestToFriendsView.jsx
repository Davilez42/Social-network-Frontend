/* eslint-disable react/prop-types */
import { PiArrowRightBold } from "react-icons/pi";
import "./requestofriendsview.css";
import useUser from "../../../hooks/useUser";
import { UserContext } from "../../../context/userContext";

import { useContext, useState } from "react";
const RequestToFriendsView = ({ requests_pending = [], actionCloseAction }) => {
  const [requestsFriend, setRequestsFriend] = useState(requests_pending);

  const { setInfo, friends, setFriends } = useContext(UserContext);
  const { sendRequestFriend } = useUser();
  const handlerAcceptRequest = (request_user) => {
    setRequestsFriend(
      //elimino de la vista de solicitudes
      requestsFriend.filter((r) => r.user[0] !== request_user.user[0])
    );
    setFriends(
      //mapeo la lista de amigos para que muestre el usuario en amigos
      friends.map((r) => {
        const aux = r;
        if (r.user[0] === request_user.user[0]) {
          aux.friend_state = "accepted";
        }
        return aux;
      })
    );

    console.log(requestsFriend);
    sendRequestFriend(setInfo, request_user.user[0], () => {});
  };

  const actionSelectFriend = () => {};

  return (
    <div className="container_filter">
      <div id="request_container" className="container_friend_list_profile">
        <div
          className="back icon_back_request_view"
          onClick={() => {
            actionCloseAction(false);
          }}
        >
          <PiArrowRightBold size={30} />
        </div>

        <p className="title_container">Solicitudes</p>
        <div className="friend-list-container">
          <div className="friend-list">
            {requestsFriend.length !== 0 ? (
              requestsFriend.map((request_user, index) => (
                <div
                  className="card_friend_friend_list"
                  key={index}
                  onClick={() => {
                    actionSelectFriend(request_user.user[0]);
                  }}
                >
                  <img
                    className="avatar_friend_list"
                    src={request_user.user[2]}
                    alt=""
                  />
                  <span className="card_name_user">{request_user.user[1]}</span>

                  <div className="container_button_option_request">
                    <div
                      onClick={() => {
                        handlerAcceptRequest(request_user);
                      }}
                      className="button_option_friend button_option_request"
                    >
                      Aceptar
                    </div>
                    <div
                      onClick={() => {
                        alert("Esta funcion se encuentra en desarollo");
                      }}
                      className="button_option_friend button_option_request"
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
