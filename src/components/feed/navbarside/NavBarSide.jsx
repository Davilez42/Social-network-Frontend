/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { GoPlusCircle, GoListUnordered } from "react-icons/go";
import { NavLink } from "react-router-dom";
import RequestModal from "../requestsmodal/RequestsModal";
import CreateFormPosts from "../../posts/createformpost/CreateFormPost";
import MoreOptionsView from "../moreoptionsmodal/MoreOptionsView";
import { useSelector } from "react-redux";
import { UserContext } from "../../../context/userContext";
import { AiFillCheckCircle } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { BsPeople } from "react-icons/bs";
import { IoPersonCircleOutline } from "react-icons/io5";
import "./navbarside.css";

export default function NavBarSide({ setNavBarSide }) {
  const { username, avatar, id, checkVerified } = useSelector(
    (state) => state.user.userInfo
  );

  const { setBackToInit, backToInit } = useContext(UserContext);
  const [request_Modal, setRequests_Modal] = useState(false);
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
      {request_Modal ? (
        <RequestModal
          userId={id}
          closeView={() => {
            setRequests_Modal();
          }}
        />
      ) : (
        <></>
      )}

      <nav className="list-items-main">
        <div
          className="container_side_avatar"
          onClick={() => {
            if (canNavbarSideOccult) setNavBarSide(false);
          }}
        >
          <NavLink to="/home/profile/view">
            <img src={avatar?.url} className="avatar" alt="" />
          </NavLink>
          <div className="container_alias">
            <p className="title_username">{username}</p>
          </div>

          {checkVerified ? (
            <AiFillCheckCircle size={15} color="green" />
          ) : (
            <></>
          )}
        </div>
        <NavLink
          to="/home/feed"
          className="item_list_main"
          onClick={() => {
            if (canNavbarSideOccult) setNavBarSide(false);
            setBackToInit(true);
          }}
        >
          <span className="box_icon">
            <GoHome className="icon" size={24} />
          </span>
          Inicio
        </NavLink>

        <NavLink
          to="/home/profile/view"
          className="item_list_main"
          onClick={() => {
            if (canNavbarSideOccult) setNavBarSide(false);
          }}
        >
          {" "}
          <span className="box_icon">
            <IoPersonCircleOutline className="icon" size={24} />
          </span>{" "}
          Perfil
        </NavLink>
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
            setRequests_Modal(!request_Modal);
          }}
        >
          <span className="box_icon">
            <BsPeople size={22} className="icon" />
          </span>
          {/* <div className="notificaction-count">{0}</div> */}
          Solicitudes
        </div>

        {/*         <div
          className="item_list_main"
          onClick={() => {
            setInfo(["Esta funcion se encuentra en desarrollo"]);
            if (canNavbarSideOccult) setNavBarSide(false);
          }}
        >
          <span className="box_icon">
            <GoPaperAirplane className="icon" size={22} />
          </span>{" "}
          <div className="notificaction-count">{1}</div>
          Mensajes
        </div> */}

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
          closeModal={() => {
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
