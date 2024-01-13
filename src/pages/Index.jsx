import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import { useSelector } from "react-redux";
import { decryptDate } from "../helpers/encrypt";

export default function Index() {
  const navigate = useNavigate();
  const location = useLocation();
  //console.log(useSelector((state) => state.auth.userAuth));
  const userAuth = useSelector((state) => state.auth.userAuth);
  const { session } =
    typeof userAuth === "string" ? decryptDate(userAuth) : userAuth;

  useEffect(() => {
    const handler = (path) => {
      navigate(`${path}`);
    };
    if (location.pathname === "/") {
      if (session) {
        handler("/home/feed");
      } else {
        handler("/login");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div>{<Outlet />}</div>

      <footer id="info-footer">
        © 2023 SnapWire . Todos los derechos reservados. Asegúrate de respetar
        las normas comunitarias. Para más detalles, consulta nuestros términos
        de servicio y política de privacidad. ¡Disfruta de tu experiencia en
        nuestra comunidad! © 2023 SnapWire.
      </footer>
    </div>
  );
}
