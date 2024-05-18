/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { decryptDate } from "../../../helpers/encrypt";
import { useNavigate } from "react-router-dom";
import { AiFillCheckCircle } from "react-icons/ai";

import "./userlist.css";

export default function UserList({ users = [], closeView }) {
  const { _id } = decryptDate(useSelector((state) => state.user.userInfo));
  const usenavigate = useNavigate();

  const redirect_to_user = (id_user) => {
    closeView();
    usenavigate(`/home/profile/view/${id_user}`);
  };

  return (
    <div className="user-list">
      {users.map((user, index) => (
        <div className="card_user_list" key={index}>
          <div
            className="container-user"
            onClick={() => {
              redirect_to_user(user._id);
            }}
          >
            <img className="avatar" src={user.avatar.url} alt="" />

            <span className="card_name_user">{user.username}</span>

            {user.verified ? (
              <AiFillCheckCircle size={15} color="green" />
            ) : (
              <></>
            )}
          </div>
          <div className="container_button_option">
            {(() => {
              if (user._id === _id) {
                return <></>;
              }

              if (user.myfriend) {
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
              return (
                <div
                  onClick={() => {
                    alert("Esta funcion se encuentra en desarollo");
                  }}
                  className="button_option_user"
                >
                  Añadir
                </div>
              );
            })()}
          </div>
        </div>
      ))}
    </div>
  );
}
