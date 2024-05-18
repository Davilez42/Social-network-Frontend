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
        id="container-info-likes"
        className=" container_friend_list_profile "
      >
        <div className="header-modal">
          <PiArrowLeftBold
            className="header-modal__icon-back-modal"
            onClick={closeView}
            size={24}
          />
          <div className="header-modal__box-tittle">
            <p>Likes</p>
          </div>
        </div>

        <div className="friend-list-container">
          {users ? (
            users.length !== 0 ? (
              <UserList users={users} closeView={closeView} />
            ) : (
              <p className="text-has-not">Esta publicacion no tiene likes</p>
            )
          ) : (
            <span className="loader"></span>
          )}
        </div>
      </div>
    </div>
  );
}
