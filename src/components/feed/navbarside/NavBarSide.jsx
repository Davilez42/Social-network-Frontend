import { useState, useContext, useEffect } from "react";
import {
  GoPeople,
  GoPerson,
  GoPaperAirplane,
  GoHomeFill,
  GoPlusCircle,
  GoListUnordered,
} from "react-icons/go";
import { SiHomebridge } from "react-icons/si";
import "./navbarside.css";
import { NavLink } from "react-router-dom";
import RequestToFriendsView from "../requestoffriends/RequestToFriendsView";
import CreateFormPosts from "../../posts/createformpost/CreateFormPost";
import MoreOptionsView from "../moreoptionview/MoreOptionsView";
import logo2 from "../../../assets/logo2.png";
import { useSelector } from "react-redux";
import { decryptDate } from "../../../helpers/encrypt";
import { UserContext } from "../../../context/userContext";
import { GoBookmark } from "react-icons/go";

// eslint-disable-next-line react/prop-types
export default function NavBarSide({ setNavBarSide }) {
  const { username, avatar, _id } = decryptDate(
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
          id_user={_id}
          closeView={() => {
            setRequests_view_friends();
          }}
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

      <nav className="list-items-main">
        <div
          className="container_side_avatar"
          onClick={() => {
            if (canNavbarSideOccult) setNavBarSide(false);
          }}
        >
          <NavLink to="/home/profile/view">
            <img src={avatar?.url} className="avatar loading" alt="" />
          </NavLink>
          <div className="container_alias">
            <p className="title_username">{username}</p>
          </div>
        </div>
        <NavLink
          to="/home/feed"
          className="item_list_main"
          onClick={() => {
            if (canNavbarSideOccult) setNavBarSide(false);
          }}
        >
          {" "}
          <span className="box_icon">
            <SiHomebridge className="icon" size={24} />
          </span>{" "}
          Inicio
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
            <GoPerson className="icon" size={24} />
          </span>{" "}
          Perfil
        </NavLink>
        <div
          className="item_list_main item-requests"
          onClick={() => {
            setRequests_view_friends(!request_friends_view);
          }}
        >
          <span className="box_icon">
            <GoBookmark size={22} className="icon" />
          </span>
          guardados
        </div>

        <div
          className="item_list_main"
          onClick={() => {
            setCreate_post_View(!create_post_view);
          }}
        >
          <span className="box_icon">
            <GoPlusCircle className="icon " size={21} />
          </span>
          Crear publicacion
        </div>

        <div
          className="item_list_main item-requests"
          onClick={() => {
            setRequests_view_friends(!request_friends_view);
          }}
        >
          <span className="box_icon">
            <GoPeople size={22} className="icon" />
          </span>
          <div className="notificaction-count">{2}k</div>
          Solicitudes
        </div>

        <div
          className="item_list_main"
          onClick={() => {
            setInfo(["Esta funcion se encuentra en desarrollo"]);
            if (canNavbarSideOccult) setNavBarSide(false);
          }}
        >
          <span className="box_icon">
            <GoPaperAirplane className="icon" size={22} />
          </span>{" "}
          <div className="notificaction-count">{2}k</div>
          Mensajes
        </div>

        <div
          className="item_list_main item-more"
          onClick={() => {
            setMore_options_view(!more_options_view);
          }}
        >
          <span className="box_icon">
            <GoListUnordered className="icon " size={22} />
          </span>
          Mas
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
