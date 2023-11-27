/* eslint-disable react/prop-types */
import { PiArrowLeftBold } from "react-icons/pi";
import "./viewfriendlist.css";
import UserListView from "../userlistview/UserListView";
const ViewFriendList = ({
  friends_view = [],
  actionCloseAction,
  actionSelectFriend,
}) => {
  return (
    <div className="container_filter">
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
            <UserListView
              users={friends_view}
              actionSelectUser={actionSelectFriend}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFriendList;
