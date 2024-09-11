/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillCheckCircle } from "react-icons/ai";
import "./userlist.css";
import ButtonOptionRelation from "../buttonOptionRelation/ButtonOptionRelation";
import { useEffect } from "react";

export default function UserList({ users = [], closeView }) {
  const { id } = useSelector((state) => state.user.userInfo);
  const usenavigate = useNavigate();

  const redirectToUser = (id) => {
    closeView();
    usenavigate(`/home/profile/view/${id}`);
  };

  useEffect(() => {}, []);

  return (
    <div className="user-list">
      {(() => {
        return users.map((user, index) => (
          <div className="card_user_list" key={index}>
            <div
              className="container-user"
              onClick={() => {
                redirectToUser(user.id);
              }}
            >
              <img className="avatar" src={user.avatar} alt="" />

              <span className="card_name_user">{user.username}</span>

              {user.checkVerified ? (
                <AiFillCheckCircle size={15} color="green" />
              ) : (
                <></>
              )}
            </div>
            <div className="container_button_option">
              {id !== user.id ? (
                <ButtonOptionRelation
                  selfUserId={id}
                  userIdView={user.id}
                  relationId={user.relationExternalId}
                  requestReceivedId={user.requestReceivedExternalId}
                  requestSentId={user.requestSentExternalId}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        ));
      })()}
    </div>
  );
}
