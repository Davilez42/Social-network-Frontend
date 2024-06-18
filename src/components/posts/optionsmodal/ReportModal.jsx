import { useState } from "react";
import usePost from "../../../hooks/usePost.js";
import { UserContext } from "../../../context/userContext.jsx";
import { useContext } from "react";
import { PiArrowLeftBold } from "react-icons/pi";
import "./reportmodal.css";
import types from "./Snapwire.Type_report.json";
// eslint-disable-next-line react/prop-types
export default function ReportModal({ id_post, closeView }) {
  const { setInfo } = useContext(UserContext);
  const { reportPost } = usePost();
  const [reason, setReason] = useState("");

  const handlerSendReport = (code, reason) => {
    reportPost(
      (error) => {
        if (error) {
          return setInfo([error.message]);
        }
        closeView();
      },
      id_post,
      reason,
      code
    );
  };

  return (
    <div className="container-report-modal">
      <div className="header-modal">
        <PiArrowLeftBold
          className="header-modal__icon-back-modal"
          onClick={closeView}
          size={24}
        />
        <div className="header-modal__box-tittle">
          <p>Reportar</p>
        </div>
      </div>
      <div className="block-report-types">
        {types.map((t, i) => (
          <div
            key={i}
            className="block-report-types__item"
            onClick={() => {
              handlerSendReport(t.id);
            }}
          >
            {t.description}
          </div>
        ))}
      </div>
      <hr />
      <div className="container-other-reason">
        <label className="label-other-reason" htmlFor="input_reason">
          Otra razon
        </label>
        <textarea
          id="input_reason"
          type="area"
          onChange={(event) => {
            setReason(event.target.value);
          }}
          value={reason}
        />
      </div>
      <div
        className="button button-send-report"
        onClick={() => {
          if (reason.trim() === "") {
            return setInfo(["Escribe una razon"]);
          }
          handlerSendReport(undefined, reason);
        }}
      >
        enviar
      </div>{" "}
    </div>
  );
}
