import { useState } from "react";
import usePost from "../../../hooks/usePost.js";
import { UserContext } from "../../../context/userContext.jsx";
import { useContext } from "react";
import { PiArrowLeftBold } from "react-icons/pi";
import "./formreportview.css";

// eslint-disable-next-line react/prop-types
export default function FormReportView({ actionSend, id_post }) {
  const { setInfo } = useContext(UserContext);
  const { reportPost } = usePost();
  const [reason, setReason] = useState("");

  const handlerSendReport = (type_report) => {
    if (!type_report && reason === "") {
      actionSend();
      setInfo(["Debe selecionar un tipo o escribir una razon"]);
      return;
    }
    reportPost(setInfo, id_post, reason, type_report, () => {
      setInfo(["Tu denuncia ha sido enviada"]);
      actionSend();
    });
  };

  return (
    <div className="container_form_report">
      <div className="box_back_form_report">
        <PiArrowLeftBold
          className="back_feed_main"
          onClick={() => {
            actionSend();
          }}
          size={25}
        />
      </div>
      <div className="form_container_type_report">
        <div
          className="item_type_report"
          onClick={() => {
            handlerSendReport(4);
          }}
        >
          Desnudos o contenido sexual
        </div>
        <hr className="hr_option_post" />
        <div
          className="item_type_report"
          onClick={() => {
            handlerSendReport(3);
          }}
        >
          Spam
        </div>
        <hr className="hr_option_post" />
        <div
          className="item_type_report"
          onClick={() => {
            handlerSendReport(1);
          }}
        >
          Fraude o estafa
        </div>
        <hr className="hr_option_post" />
        <div
          className="item_type_report"
          onClick={() => {
            handlerSendReport(2);
          }}
        >
          Acoso o bullying
        </div>
        <hr className="hr_option_post" />
        <div
          className="item_type_report"
          onClick={() => {
            handlerSendReport(6);
          }}
        >
          Racismo o odio
        </div>
        <hr className="hr_option_post" />
      </div>

      <div className="container_input_reason">
        <label htmlFor="input_reason">otra razon</label>
        <textarea
          id="input_reason"
          type="area"
          onChange={(event) => {
            setReason(event.target.value);
          }}
        />
      </div>

      <div
        className="button button_send_report"
        onClick={() => {
          handlerSendReport();
        }}
      >
        enviar
      </div>
    </div>
  );
}
