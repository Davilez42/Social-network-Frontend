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
          {friends?.map((friend, i) => (
            <div
              key={i}
              id={friend.user._id}
              className="card_friend"
              onClick={() => {
                usernavigate(`/home/profile/view/${friend.user._id}`);
              }}
            >
              <img
                className="avatar avatar_friend"
                src={friend.user.avatar.url}
                alt=""
              />
              <p className="name_friend">{friend.user.username}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
