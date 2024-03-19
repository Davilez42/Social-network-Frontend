/* eslint-disable react/prop-types */
import { PiArrowLeftBold } from "react-icons/pi";
import UserList from "../../user/userslist/UserList.jsx";
import { useEffect, useState } from "react";
import usePost from "../../../hooks/usePost";
import "./likesmodal.css";

export default function LikesModal({ id_post, closeView }) {
  const [users, setUsers] = useState();
  const { getLikesPost } = usePost();

  useEffect(() => {
    getLikesPost((err, data) => {
      if (err) {
        return alert(err.message);
      }
      setUsers(data.data.likes);
    }, id_post);
  }, []);

  return (
    <div className="container_filter">
      <div
        id="userlikesInfo_container"
        className="container_friend_list_profile"
      >
        <div
          className="back"
          onClick={() => {
            closeView();
          }}
        >
          <PiArrowLeftBold size={24} />
        </div>

        <p className="title_container">Likes</p>
        <div className="friend-list-container ">
          {users ? (
            users.length !== 0 ? (
              <UserList users={users} actionSelectUser={() => {}} />
            ) : (
              <div>Esta publicacion no tiene likes</div>
            )
          ) : (
            <span className="loader"></span>
          )}
        </div>
      </div>
    </div>
  );
}
