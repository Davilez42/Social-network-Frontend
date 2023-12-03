import { BiNavigation } from "react-icons/bi";
import formatDate from "../../../helpers/formatDate.js";
import { NavLink } from "react-router-dom";
import usePost from "../../../hooks/usePost";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { decryptDate } from "../../../helpers/encrypt.js";
import { UserContext } from "../../../context/userContext.jsx";
import { useContext } from "react";

export default function CommentsListView({ id_post, actionCreateComment }) {
  const { id_user, username, url_avatar } = decryptDate(
    useSelector((state) => state.user.userInfo)
  );
  const [comments, setComments] = useState();
  const { setInfo } = useContext(UserContext);
  const [text, setText] = useState("");
  const { getCommentsPost, sendComment } = usePost();

  const handlerSendComment = () => {
    if (text.trim() !== "") {
      actionCreateComment();
      sendComment(setInfo, id_post, text);
      setComments([
        { username, id_user, url_avatar, text, date_created: new Date() },
        ...comments,
      ]);
      setText("");
    }
  };

  useEffect(() => {
    if (!id_post) return;
    if (!comments) {
      getCommentsPost(setInfo, id_post, setComments);
    }
  }, []);

  return (
    <>
      <div className="container_comments">
        {(() => {
          if (comments) {
            if (comments.length === 0) {
              return <p className="info_message">Todavia no hay comentarios</p>;
            }
            return comments.map((comment, ind) => (
              <div key={ind} className="card_comment">
                <NavLink
                  className="container_avatar_owner"
                  to={`/home/profile/view/${comment.id_user}`}
                >
                  <img
                    src={comment.url_avatar}
                    className="avatar avatar_comment_owner"
                    alt=""
                  />
                </NavLink>
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
          }}
        />
      </div>
    </>
  );
}
