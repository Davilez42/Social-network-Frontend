/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import "./viewfriendsside.css";
import { useState } from "react";
import { useEffect } from "react";
import useUser from "../../../hooks/useUser";

export default function ViewFriendsSide({ id_user }) {
  const [friends, setFriends] = useState([]);
  const [tittle, setTittle] = useState(false);
  const usernavigate = useNavigate();

  const { getFriends } = useUser();
  useEffect(() => {
    getFriends((err, data) => {
      if (err) {
        return alert("error al traer amigos");
      }
      if (data.data.friends.length > 0) {
        setTittle(true);
      }
      setFriends(data.data.friends);
    }, id_user);
  }, []);
  return (
    <div className="container-view-friends">
      {tittle ? <p className=" title_navbar_side">Amigos</p> : <></>}
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
  );
}
