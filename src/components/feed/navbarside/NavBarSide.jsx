import { useContext, useState } from "react";
import {
  GoPeople,
  GoPerson,
  GoPaperAirplane,
  GoSignOut,
  GoPlusCircle,
  GoListUnordered,
} from "react-icons/go";

import "./navbarside.css";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import { useCookies } from "react-cookie";
import RequestToFriendsView from "../requestoffriends/RequestToFriendsView";
import CreateFormPosts from "../../posts/createformpost/CreateFormPost";
import MoreOptionsView from "../moreoptionview/MoreOptionsView";

export default function NavBarSide() {
  const { username, url_avatar, friends, id_user } = useContext(UserContext);
  const [request_friends_view, setRequests_view_friends] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(["tkn"]);
  const [create_post_view, setCreate_post_View] = useState(false);
  const [more_options_view, setMore_options_view] = useState(false);

  return (
    <div className="container-navbar-side">
      {request_friends_view ? (
        <RequestToFriendsView
          requests_pending={friends.filter(
            (f) => f.friend_state === "pending" && f.user_requesting !== id_user
          )}
          actionCloseAction={setRequests_view_friends}
        />
      ) : (
        <></>
      )}

      <div className="container_side_avatar">
        <NavLink to="/home/profile/view">
          <img src={url_avatar} className="avatar loading" alt="" />
        </NavLink>
        <div className="container_alias">
          <p className="title_username">{username}</p>
        </div>
      </div>

      <nav className="list-items-main">
        <NavLink
          to="/home/profile/view"
          className="item_list_main"
          href="/perfil"
        >
          {" "}
          <span className="box_icon">
            <GoPerson className="icon" size={25} />
          </span>{" "}
          <p>Perfil</p>
        </NavLink>

        <div
          className="item_list_main"
          onClick={() => {
            setCreate_post_View(!create_post_view);
          }}
        >
          <span className="box_icon">
            <GoPlusCircle className="icon " size={25} />
          </span>
          <p>Crear publicacion</p>
        </div>

        <div
          className="item_list_main"
          onClick={() => {
            setRequests_view_friends(!request_friends_view);
          }}
        >
          <span className="box_icon">
            <GoPeople className="icon " size={25} />
          </span>
          <p>Solicitudes</p>
        </div>

        <NavLink className="item_list_main" href="/mensajes">
          <span className="box_icon">
            <GoPaperAirplane className="icon" size={25} />
          </span>{" "}
          <p>Mensajes</p>
        </NavLink>

        <div
          className="item_list_main"
          onClick={() => {
            setMore_options_view(!more_options_view);
          }}
        >
          <span className="box_icon">
            <GoListUnordered className="icon " size={27} />
          </span>
          <p>Mas</p>
        </div>
      </nav>
      {more_options_view ? (
        <MoreOptionsView actionClose={setMore_options_view} />
      ) : (
        <></>
      )}
      {create_post_view ? (
        <CreateFormPosts actionClose={setCreate_post_View} />
      ) : (
        <></>
      )}
    </div>
  );
}
