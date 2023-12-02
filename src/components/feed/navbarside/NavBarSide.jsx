import { useState, useContext, useEffect } from "react";
import {
  GoPeople,
  GoPerson,
  GoPaperAirplane,
  GoHomeFill,
  GoPlusCircle,
  GoListUnordered,
} from "react-icons/go";

import "./navbarside.css";
import { NavLink } from "react-router-dom";
import RequestToFriendsView from "../requestoffriends/RequestToFriendsView";
import CreateFormPosts from "../../posts/createformpost/CreateFormPost";
import MoreOptionsView from "../moreoptionview/MoreOptionsView";
import logo2 from "../../../assets/logo2.png";
import { useSelector } from "react-redux";
import { decryptDate } from "../../../helpers/encrypt";
import { UserContext } from "../../../context/userContext";
import solic from "../../../assets/solic.png";

// eslint-disable-next-line react/prop-types
export default function NavBarSide({ setNavBarSide }) {
  const { username, url_avatar, id_user, friends } = decryptDate(
    useSelector((state) => state.user.userInfo)
  );

  const { setInfo, setReload, reload } = useContext(UserContext);

  const [request_friends_view, setRequests_view_friends] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [create_post_view, setCreate_post_View] = useState(false);
  const [canNavbarSideOccult, setCanNavbarSideOccult] = useState(false);
  const [more_options_view, setMore_options_view] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 600) {
      setCanNavbarSideOccult(true);
    }
  }, []);

  return (
    <div className="container-navbar-side">
      {request_friends_view ? (
        <RequestToFriendsView
          requests_pending={friends?.filter(
            (f) => f.friend_state === "pending" && f.user_requesting !== id_user
          )}
          actionCloseAction={setRequests_view_friends}
        />
      ) : (
        <></>
      )}
      <div className="container_logo_navbar">
        <NavLink to="/home/feed" className="item">
          <img
            className="logo_snapwire_main"
            src={logo2}
            alt=""
            onClick={() => {
              if (canNavbarSideOccult) setNavBarSide(false);
              setReload(!reload);
            }}
          />
        </NavLink>
      </div>

      <div
        className="container_side_avatar"
        onClick={() => {
          if (canNavbarSideOccult) setNavBarSide(false);
        }}
      >
        <NavLink to="/home/profile/view">
          <img src={url_avatar} className="avatar loading" alt="" />
        </NavLink>
        <div className="container_alias">
          <p className="title_username">{username}</p>
        </div>
      </div>

      <nav className="list-items-main">
        <NavLink
          to="/home/feed"
          className="item_list_main"
          onClick={() => {
            if (canNavbarSideOccult) setNavBarSide(false);
          }}
        >
          {" "}
          <span className="box_icon">
            <GoHomeFill className="icon" size={25} />
          </span>{" "}
          <p>Inicio</p>
        </NavLink>

        <NavLink
          to="/home/profile/view/"
          className="item_list_main"
          onClick={() => {
            if (canNavbarSideOccult) setNavBarSide(false);
          }}
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
            {friends?.filter(
              (f) =>
                f.friend_state === "pending" && f.user_requesting !== id_user
            ).length !== 0 ? (
              <img
                src={solic}
                className="icon notificacion_active_request"
                size={25}
              />
            ) : (
              <GoPeople size={25} className="icon" />
            )}
          </span>
          <p>Solicitudes</p>
        </div>

        <div
          className="item_list_main"
          onClick={() => {
            setInfo(["Esta funcion se encuentra en desarrollo"]);
            if (canNavbarSideOccult) setNavBarSide(false);
          }}
        >
          <span className="box_icon">
            <GoPaperAirplane className="icon" size={25} />
          </span>{" "}
          <p>Mensajes</p>
        </div>

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
        <MoreOptionsView
          actionClose={() => {
            if (canNavbarSideOccult) setNavBarSide(false);
            setMore_options_view(!more_options_view);
          }}
        />
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
