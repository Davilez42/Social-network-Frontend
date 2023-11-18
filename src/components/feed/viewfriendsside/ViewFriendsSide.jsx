/* eslint-disable react/no-unknown-property */
import { useContext } from "react";
import { UserContext } from "../../../context/userContext.jsx";
import { useNavigate } from "react-router-dom";
import "./viewfriendsside.css";

export default function ViewFriendsSide() {
  const { friends } = useContext(UserContext);
  const usernavigate = useNavigate();
  return (
    <>
      <div className="container-view-friends">
        <p className=" title_navbar_side ">Amigos</p>
        <div className="container_friends">
          {friends.map((friend, i) => (
            <div
              key={i}
              id_user={friend.user[0]}
              className="card_friend"
              onClick={() => {
                usernavigate(`/home/profile/view/${friend.user[0]}`);
              }}
            >
              <img
                className="avatar avatar_friend"
                src={friend.user[2]}
                alt=""
              />
              <p className="name_friend">{friend.user[1]}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
