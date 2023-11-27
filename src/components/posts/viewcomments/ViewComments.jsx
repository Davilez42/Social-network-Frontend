import "./viewcomments.css";
import { useContext, useEffect, useState } from "react";
import usePost from "../../../hooks/usePost";
import { PiArrowLeftBold } from "react-icons/pi";
import { BiNavigation } from "react-icons/bi";
import { UserContext } from "../../../context/userContext.jsx";
import { FaRegComment } from "react-icons/fa";

import formatDate from "../../../helpers/formatDate.js";
// eslint-disable-next-line react/prop-types
export default function ViewComments({ id_post, count_comments }) {
  const { getCommentsPost, sendComment } = usePost();
  const { username, url_avatar, setInfo, id_user } = useContext(UserContext);
  const [comments, setComments] = useState();
  const [countComments, setCountComments] = useState(parseInt(count_comments));
  const [state_view, setSate_view] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!id_post) return;
    if (!comments && state_view) {
      getCommentsPost(setInfo, id_post, setComments);
    }
  }, [state_view]);

  const handlerSendComment = () => {
    if (text.trim() !== "") {
      sendComment(setInfo, id_post, text);
      setComments([
        { username, id_user, url_avatar, text, date_created: new Date() },
        ...comments,
      ]);
      setText("");
    }
  };
  return (
    <>
      <FaRegComment
        onClick={() => {
          setSate_view(true);
        }}
        size={22}
      />
      <span>{countComments}</span>

      {state_view ? (
        <div className="container_filter">
          <div className="container_view_comments">
            <div className="header_comments">
              <PiArrowLeftBold
                className="back_feed_main"
                onClick={() => {
                  setSate_view(false);
                }}
                size={30}
              />
              <p>Comentarios</p>
            </div>

            <div className="container_comments">
              {(() => {
                if (comments) {
                  if (comments.length === 0) {
                    return (
                      <p className="info_message">Todavia no hay comentarios</p>
                    );
                  }
                  return comments.map((comment, ind) => (
                    <div key={ind} className="card_comment">
                      <div className="container_avatar_owner">
                        <img
                          src={comment.url_avatar}
                          className="avatar avatar_comment_owner"
                          alt=""
                        />
                      </div>
                      <div className="metadata">
                        <div className="box_username">
                          {" "}
                          @{comment.username}{" "}
                          <span className="time_comment">
                            {formatDate(comment.date_created)}
                          </span>
                        </div>

                        <div className="comment">
                          <p>{comment.text}</p>
                        </div>
                      </div>
                    </div>
                  ));
                }

                return <span className="loader"></span>;
              })()}
            </div>
            <div className="cotainer_input_comment">
              <input
                type="text"
                className="input-field input_comment"
                name=""
                placeholder="Escribe un comentario..."
                id=""
                value={text}
                onChange={(event) => {
                  setText(event.target.value);
                }}
              />
              <BiNavigation
                className="button_send_Comments"
                size={30}
                onClick={() => {
                  handlerSendComment();
                  setCountComments(countComments + 1);
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
