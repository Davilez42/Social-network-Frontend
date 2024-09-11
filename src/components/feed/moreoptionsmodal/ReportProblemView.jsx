import "./reportproblemview.css";
import { PiArrowLeftBold } from "react-icons/pi";
export default function ReportProblemView({ actionClose }) {
  return (
    <>
      <div className="container_form_report_problem">
        <div
          className="back icon_back_more_options"
          onClick={() => {
            actionClose();
          }}
        >
          <PiArrowLeftBold size={24} />
        </div>
        <form
          action="/ruta-de-procesamiento-del-servidor"
          method="post"
          className="form_report_problem"
        >
          <h1> Cuentanos tu problema </h1>
          <h3> Estamos aqui para ayudar </h3>

          <label for="description">Descripción del Problema:</label>
          <textarea id="description" name="description" required></textarea>

          <button type="submit">Enviar Reporte</button>
        </form>
      </div>
    </>
  );
}
