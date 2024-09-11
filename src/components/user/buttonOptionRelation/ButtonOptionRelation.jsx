/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";

export default function ButtonOptionRelation({
  selfUserId,
  userIdView,
  relationId,
  requestSentId,
  requestReceivedId,
}) {
  const navigate = useNavigate();

  const { deleteRelation, sendRequest } = useUser(navigate);
  const { setInfo } = useContext(UserContext);
  const [action, setAction] = useState();
  const [text, setText] = useState("");

  const handlerSendRequest = (user) => {
    sendRequest((err, data) => {
      if (err) {
        return;
      }
      if (data.data.requestId) {
        setAction(() => () => handlerDeleteRelation(data.data.requestId, true));
      }
      if (data.data.relationId) {
        setAction(
          () => () => handlerDeleteRelation(data.data.relationId, false)
        );
      }
      setText("Cancelar");
    }, user);
  };
  const handlerDeleteRelation = (id, request = false) => {
    deleteRelation(
      (err) => {
        setText("Añadir");
        setAction(() => () => handlerSendRequest(userIdView));
      },
      id,
      request
    );
  };

  useEffect(() => {
    if (!userIdView || userIdView === selfUserId) {
      setText("Editar perfil");
      setAction(() => () => navigate("/home/profile/edit"));
    } else if (relationId) {
      setText("Eliminar");
      setAction(() => () => handlerDeleteRelation(relationId));
    } else if (requestReceivedId) {
      setText("Rechazar");
      setAction(() => () => handlerDeleteRelation(requestReceivedId, true));
    } else if (requestSentId) {
      setText("Cancelar");
      setAction(() => () => handlerDeleteRelation(requestSentId, true));
    } else {
      setText("Añadir");
      setAction(() => () => handlerSendRequest(userIdView));
    }
  }, [userIdView, selfUserId, relationId, requestReceivedId, requestSentId]);

  return (
    <div onClick={action} className="button_option_user">
      {text}
    </div>
  );
}
