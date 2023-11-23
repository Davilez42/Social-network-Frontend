import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./index.css";
export default function Index() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const handler = () => {
      navigate("/login");
    };
    if (location.pathname === "/") {
      handler();
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
