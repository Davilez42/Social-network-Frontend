import { NavLink } from "react-router-dom";
import "./moreoptionsview.css";
import {
  GoSignOut,
  GoGear,
  GoUnread,
  GoUnverified,
  GoSponsorTiers,
} from "react-icons/go";
import useUser from "../../../hooks/useUser";
import { PiArrowLeftBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../features/auth/authSlice";

export default function MoreOptionsView({ actionClose }) {
  const dispatch = useDispatch();
  const { logout } = useUser();

  return (
    <>
      <div className="container_filter">
        <div className="container_more_options">
          <nav className="more_options_nav">
            <div
              className="back icon_back_create_view"
              onClick={() => {
                actionClose(false);
              }}
            >
              <PiArrowLeftBold size={30} />
            </div>
            <NavLink className="item_list_main item_more_option">
              <span className="box_icon">
                <GoSponsorTiers className="icon" size={25} />
              </span>
              <p>Ayuda</p>
            </NavLink>
            <NavLink className="item_list_main item_more_option">
              <span className="box_icon">
                <GoUnverified className="icon" size={25} />
              </span>
              <p>Acerca de nosotros</p>
            </NavLink>
            <NavLink className="item_list_main item_more_option">
              <span className="box_icon">
                <GoUnread className="icon" size={25} />
              </span>
              <p>Contactos</p>
            </NavLink>

            <NavLink
              className="item_list_main item_more_option"
              to="/home/profile/config"
              onClick={() => {
                actionClose(false);
              }}
            >
              <span className="box_icon">
                <GoGear className="icon" size={25} />
              </span>
              <p>Configuracion</p>
            </NavLink>

            <NavLink
              className="item_list_main item_more_option item_logout_more_options"
              to="/login"
              onClick={() => {
                window.localStorage.removeItem("sessionId");
                dispatch(setAuth(false));
                logout();
              }}
            >
              <span className="">
                <GoSignOut className="icon" size={25} />
              </span>
              <p>Salir</p>
            </NavLink>
          </nav>
        </div>
      </div>
    </>
  );
}
