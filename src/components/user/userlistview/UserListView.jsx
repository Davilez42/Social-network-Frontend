/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { decryptDate } from "../../../helpers/encrypt";
import "./userlistview.css";

export default function UserListView({ users, actionSelectUser }) {
  const { friends, id_user } = decryptDate(
    useSelector((state) => state.user.userInfo)
  );
  return (
    <>
      {users.map((friend, index) => (
        <div className="card_user_list" key={index}>
          <img
            className="avatar_user_list"
            src={friend.user[2]}
            alt=""
            onClick={() => {
              actionSelectUser(friend.user[0]);
            }}
          />
          <span
            className="card_name_user"
            onClick={() => {
              actionSelectUser(friend.user[0]);
            }}
          >
            {friend.user[1]}
          </span>
          <div className="container_button_option">
            {(() => {
              if (friends.some((f) => f.user[0] === friend.user[0])) {
                return (
                  <div
                    onClick={() => {
                      alert("Esta funcion se encuentra en desarollo");
                    }}
                    className="button_option_friend"
                  >
                    Eliminar amigo
                  </div>
                );
              }
              return friend.user[0] !== id_user ? (
                <div
                  onClick={() => {
                    alert("Esta funcion se encuentra en desarollo");
                  }}
                  className="button_option_friend"
                >
                  Añadir amigo
                </div>
              ) : (
                <></>
              );
            })()}
          </div>
        </div>
      ))}
    </>
  );
}
