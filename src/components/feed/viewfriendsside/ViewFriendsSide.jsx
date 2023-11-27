import { useNavigate } from "react-router-dom";
import "./viewfriendsside.css";
import { useSelector } from "react-redux";
import { decryptDate } from "../../../helpers/encrypt";

export default function ViewFriendsSide() {
  const { friends } = decryptDate(useSelector((state) => state.user.userInfo));
  const usernavigate = useNavigate();
  return (
    <>
      <div className="container-view-friends">
        <p className=" title_navbar_side ">Amigos</p>
        <div className="container_friends">
          {friends
            ?.filter((f) => f.friend_state === "accepted")
            .map((friend, i) => (
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
