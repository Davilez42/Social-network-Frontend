/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { decryptDate } from "../../../helpers/encrypt";
import { useNavigate } from "react-router-dom";
import { AiFillCheckCircle } from "react-icons/ai";

import "./userlist.css";
/* import useUser from "../../../hooks/useUser"; */
export default function UserList({ users = [], closeView }) {
  const { id_user } = decryptDate(useSelector((state) => state.user.userInfo));

  /*   const { sendRequestFriend } = useUser(); */
  const usenavigate = useNavigate();

  /*   const sendRequest = (id) => {
    sendRequestFriend((error, data) => {
      if (error) {
        return alert("error");
      }
      setDeleteFriend(true);
      console.log(data);
    });
  }; */

  const redirectToUser = (id) => {
    closeView();
    usenavigate(`/home/profile/view/${id}`);
  };

  return (
    <div className="user-list">
      {(() => {
        return users.map((user, index) => (
          <div className="card_user_list" key={index}>
            <div
              className="container-user"
              onClick={() => {
                redirectToUser(user._id);
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
                if (user._id === id_user) {
                  return <></>;
                }

                if (user.friends[0]) {
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
                      // sendRequest(user._id);
                    }}
                    className="button_option_user"
                  >
                    Añadir
                  </div>
                );
              })()}
            </div>
          </div>
        ));
      })()}
    </div>
  );
}
