/* eslint-disable react/prop-types */
import { PiArrowLeftBold } from "react-icons/pi";
import "./friendsmodal.css";
import UserList from "../userslist/UserList";
import { useState } from "react";
import { useEffect } from "react";

import useUser from "../../../hooks/useUser";
export default function FriendsModal({ id_user, closeView }) {
  const [friends, setFriends] = useState();
  const { getFriends } = useUser();
  useEffect(() => {
    getFriends((err, data) => {
      if (err) {
        return alert("error al traer amigos");
      }
      console.log(data);
      setFriends(data.data.friends);
    }, id_user);
  }, []);
  return (
    <div className="container_filter">
      <div className="container_modal_user_list">
        <div className="header-modal">
          <PiArrowLeftBold
            className="header-modal__icon-back-modal"
            onClick={closeView}
            size={24}
          />
          <div className="header-modal__box-tittle">
            <p>Amigos</p>
          </div>
        </div>
        <div className="friend-list-container">
          <div className="friend-list">
            {friends ? (
              <UserList users={friends} closeView={closeView} />
            ) : (
              <span className="loader"></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
