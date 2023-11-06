import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import "./viewfriendsside.css";

export default function ViewFriendsSide() {
  const { friends } = useContext(UserContext);

  return (
    <>
      <div className="container-view-friends">
        <p className=" title_navbar_side ">Amigos</p>
        <div className="container_friends">
          {friends.map((friend, i) => (
            <div key={i} id_user={friend.id_user} className="card_friend">
              <img
                className="avatar avatar_friend"
                src={friend.url_avatar}
                alt=""
              />
              <p className="name_friend">{friend.fullname}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
