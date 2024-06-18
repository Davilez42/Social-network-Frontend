/* eslint-disable react/prop-types */
import { PiArrowLeftBold } from "react-icons/pi";
import "./requestofriendsview.css";
import useUser from "../../../hooks/useUser";
import { UserContext } from "../../../context/userContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RequestModal = ({ closeView, id_user }) => {
  const [requests, setRequests] = useState();
  const { setInfo } = useContext(UserContext);
  const { sendRequestFriend, deleteRelation, getRequests } = useUser();
  const navigate = useNavigate();

  const handlerAcceptRequest = (id_user) => {
    sendRequestFriend((err) => {
      if (err) {
        return setInfo([err]);
      }
      setRequests(requests.filter((r) => r._id !== id_user));
    }, id_user);
  };

  const handlerDeleteRequest = (id_request) => {
    deleteRelation(
      (err) => {
        if (err) {
          return setInfo([err]);
        }
        setRequests(requests.filter((r) => r._id !== id_request));
      },
      id_request,
      true
    );
  };

  const actionSelectFriend = (id_user) => {
    navigate(`/home/profile/view/${id_user}`);
  };

  useEffect(() => {
    getRequests((err, data) => {
      if (err) {
        return setInfo([err.message]);
      }
      setRequests(data.data.requests);
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
          {requests ? (
            <div className="container-requests">
              {(() => {
                if (requests.length === 0) {
                  return <p>No tienes solicitudes</p>;
                }
                return requests.map((request_user, index) => (
                  <div className="card_request" key={index}>
                    <div
                      className="data-user-request"
                      onClick={() => {
                        actionSelectFriend(request_user._id);
                        closeView();
                      }}
                    >
                      <img
                        className="avatar"
                        src={request_user.avatar.url}
                        alt=""
                      />
                      <span className="card_name_user">
                        {request_user.username}
                      </span>
                    </div>

                    <div className="container_button_option_request">
                      <div
                        onClick={() => {
                          handlerAcceptRequest(request_user._id);
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
