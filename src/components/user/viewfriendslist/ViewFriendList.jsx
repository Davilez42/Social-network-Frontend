/* eslint-disable react/prop-types */
import { PiArrowLeftBold } from "react-icons/pi";
import "./viewfriendlist.css";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
const ViewFriendList = ({
  friends_view = [],
  actionCloseAction,
  actionSelectFriend,
}) => {
  const { friends, id_user } = useContext(UserContext);
  return (
    <div className="container_filter">
      <div className="container_friend_list_profile">
        <div
          className="back"
          onClick={() => {
            actionCloseAction(false);
          }}
        >
          <PiArrowLeftBold size={30} />
        </div>

        <p className="title_container">Amigos</p>
        <div className="friend-list-container">
          <div className="friend-list">
            {friends_view.map((friend, index) => (
              <div
                className="card_friend_friend_list"
                key={index}
                onClick={() => {
                  actionSelectFriend(friend.user[0]);
                }}
              >
                <img
                  className="avatar_friend_list"
                  src={friend.user[2]}
                  alt=""
                />
                <span className="card_name_user">{friend.user[1]}</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFriendList;
