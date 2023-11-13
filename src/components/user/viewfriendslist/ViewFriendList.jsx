import React from "react";
import { PiArrowLeftBold } from "react-icons/pi";
import "./viewfriendlist.css";

const ViewFriendList = ({
  friends = [],
  actionCloseAction,
  actionSelectFriend,
}) => {
  return (
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
          {friends.map((friend, index) => (
            <div
              className="card_friend_friend_list"
              key={index}
              onClick={() => {
                actionSelectFriend(friend.user[0]);
              }}
            >
              <img className="avatar_friend_list" src={friend.user[2]} alt="" />
              {friend.user[1]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewFriendList;
