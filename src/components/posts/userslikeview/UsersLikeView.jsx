import { PiArrowLeftBold } from "react-icons/pi";
import UserListView from "../../user/userlistview/UserListView";
import { useEffect, useState } from "react";
import usePost from "../../../hooks/usePost";
import "./userslikeview.css";

export default function UsersLikeView({ id_post, actionCloseAction }) {
  const [users, setUsers] = useState();
  const { getInfoLikesPost } = usePost();

  useEffect(() => {
    getInfoLikesPost(
      () => {},
      id_post,
      () => {},
      (likesInfo) => {
        setUsers(likesInfo);
      }
    );
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
            actionCloseAction(false);
          }}
        >
          <PiArrowLeftBold size={30} />
        </div>

        <p className="title_container">Likes</p>
        <div className="friend-list-container ">
          <div className="user-list">
            {users ? (
              users.length !== 0 ? (
                <UserListView users={users} actionSelectUser={() => {}} />
              ) : (
                <div>Esta publicacion no tiene likes</div>
              )
            ) : (
              <span className="loader"></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
