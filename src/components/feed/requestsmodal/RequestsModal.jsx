/* eslint-disable react/prop-types */
import { PiArrowLeftBold } from "react-icons/pi";
import "./requestofriendsview.css";
import useUser from "../../../hooks/useUser";
import { UserContext } from "../../../context/userContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RequestModal = ({ closeView, userId }) => {
  const [requests, setRequests] = useState();
  const { setInfo } = useContext(UserContext);
  const { sendRequest, deleteRelation, getRequests } = useUser();
  const navigate = useNavigate();

  const handlerAcceptRequest = (userId) => {
    sendRequest((err) => {
      if (err) {
        return setInfo([err.message]);
      }
      setRequests(requests.filter((r) => r.id !== userId));
    }, userId);
  };

  const handlerDeleteRequest = (requestId) => {
    deleteRelation(
      (err) => {
        if (err) {
          return setInfo([err.message]);
        }
        setRequests(requests.filter((r) => r.requestId !== requestId));
      },
      requestId,
      true
    );
  };

  const actionSelectFriend = (requestingUserId) => {
    navigate(`/home/profile/view/${requestingUserId}`);
  };

  useEffect(() => {
    getRequests((err, data) => {
      if (err) {
        return setInfo([err.message]);
      }
      setRequests(data.data.requests);
    }, userId);
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
          {requests ? (
            <div className="container-requests">
              {(() => {
                if (requests.length === 0) {
                  return <p>No tienes solicitudes</p>;
                }
                return requests.map((requestingUser, index) => (
                  <div className="card_request" key={index}>
                    <div
                      className="data-user-request"
                      onClick={() => {
                        actionSelectFriend(requestingUser.id);
                        closeView();
                      }}
                    >
                      <img
                        className="avatar"
                        src={requestingUser.avatar}
                        alt=""
                      />
                      <span className="card_name_user">
                        {requestingUser.username}
                      </span>
                    </div>

                    <div className="container_button_option_request">
                      <div
                        onClick={() => {
                          handlerAcceptRequest(requestingUser.id);
                        }}
                        className="button_option_user button_option_request"
                      >
                        Aceptar
                      </div>
                      <div
                        onClick={() => {
                          handlerDeleteRequest(requestingUser.requestId);
                        }}
                        className="button_option_user button_option_request"
                      >
                        Rechazar
                      </div>
                    </div>
                  </div>
                ));
              })()}
            </div>
          ) : (
            <span className="loader"></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
