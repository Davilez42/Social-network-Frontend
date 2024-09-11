import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";

export default function Index() {
  const navigate = useNavigate();
  const location = useLocation();

  const { session } = useSelector((state) => state.auth.userAuth);

  const handlerRedirect = (path) => {
    navigate(`${path}`);
  };

  useEffect(() => {
    if (session) {
      handlerRedirect("/home/feed");
    } else if (location.pathname === "/") {
      handlerRedirect("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="block-index">
      {<Outlet />}

      <footer id="info-footer">
        © 2023 SnapWire . Todos los derechos reservados. Asegúrate de respetar
        las normas comunitarias. Para más detalles, consulta nuestros términos
        de servicio y política de privacidad. ¡Disfruta de tu experiencia en
        nuestra comunidad! © 2023 SnapWire.
      </footer>
    </div>
  );
}
