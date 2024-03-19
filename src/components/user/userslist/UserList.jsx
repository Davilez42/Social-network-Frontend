/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { decryptDate } from "../../../helpers/encrypt";
import "./userlist.css";

export default function UserList({ users = [], actionSelectUser }) {
  const { friends, _id } = decryptDate(
    useSelector((state) => state.user.userInfo)
  );
  return (
    <div className="user-list">
      {users.map((friend, index) => (
        <div className="card_user_list" key={index}>
          <img
            className="avatar_user_list"
            src={friend.user.avatar.url}
            alt=""
            onClick={() => {
              actionSelectUser(friend.user._id);
            }}
          />
          <span
            className="card_name_user"
            onClick={() => {
              actionSelectUser(friend.user._id);
            }}
          >
            {friend.user.username}
          </span>
          <div className="container_button_option">
            {(() => {
              if (friends.some((f) => f.user._id === friend.user._id)) {
                return (
                  <div
                    onClick={() => {
                      alert("Esta funcion se encuentra en desarollo");
                    }}
                    className="button_option_user"
                  >
                    Eliminar
                  </div>
                );
              }
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
