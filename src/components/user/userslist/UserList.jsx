/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { decryptDate } from "../../../helpers/encrypt";
import { useNavigate } from "react-router-dom";

import "./userlist.css";

export default function UserList({ users = [], closeView }) {
  const { _id } = decryptDate(useSelector((state) => state.user.userInfo));
  const usenavigate = useNavigate();

  return (
    <div className="user-list">
      {users.map((friend, index) => (
        <div className="card_user_list" key={index}>
          <div
            className="container-user"
            onClick={() => {
              closeView();
              usenavigate(`/home/profile/view/${friend.user._id}`);
            }}
          >
            <img className="avatar" src={friend.user.avatar.url} alt="" />

            <span
              className="card_name_user"
              onClick={() => {
                //actionSelectUser(friend.user._id);
              }}
            >
              {friend.user.username}
            </span>
          </div>
          <div className="container_button_option">
            {(() => {
              return friend.user._id !== _id ? (
                <div
                  onClick={() => {
                    alert("Esta funcion se encuentra en desarollo");
                  }}
                  className="button_option_user"
                >
                  Añadir
                </div>
              ) : (
                <></>
              );
            })()}
          </div>
        </div>
      ))}
    </div>
  );
}
