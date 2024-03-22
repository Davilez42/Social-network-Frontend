/* eslint-disable react/prop-types */
import { PiArrowLeftBold } from "react-icons/pi";
import "./requestofriendsview.css";
import useUser from "../../../hooks/useUser";
import { UserContext } from "../../../context/userContext";
import { useContext, useEffect, useState } from "react";

const RequestToFriendsView = ({ closeView, id_user }) => {
  const [requestsFriend, setRequestsFriend] = useState();
  const { setInfo } = useContext(UserContext);
  const { sendRequestFriend, deleteRelation, getRequests } = useUser();

  const handlerAcceptRequest = (request_user) => {
    sendRequestFriend((err) => {
      if (err) {
        return setInfo([err]);
      }
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
      },
      id_request,
      true
    );
  };

  const actionSelectFriend = () => {};

  useEffect(() => {
    getRequests((err, data) => {
      if (err) {
        return setInfo([err.message]);
      }
      setRequestsFriend(data.data.requests);
    }, id_user);
  }, []);

  return (
    <div className="container_filter">
      <div className="requests-modal">
        <div className="header-modal">
          <PiArrowLeftBold
            className="header-modal__icon-back-modal"
            onClick={closeView}
            size={24}
          />
          <div className="header-modal__box-tittle">
            <p>Solicitudes</p>
          </div>
        </div>
        <div className="block-requests">
          {requestsFriend ? (
            <div className="container-requests">
              {requestsFriend.map((request_user, index) => (
                <div
                  className="card_request"
                  key={index}
                  onClick={() => {
                    actionSelectFriend(request_user.user._id);
                  }}
                >
                  <div className="data-user-request">
                    <img
                      className="avatar"
                      src={request_user.user.avatar.url}
                      alt=""
                    />
                    <span className="card_name_user">
                      {request_user.user.username}
                    </span>
                  </div>

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
              ))}
            </div>
          ) : (
            <span className="loader"></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestToFriendsView;
