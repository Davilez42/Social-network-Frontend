/* eslint-disable react/prop-types */
import { BiNavigation } from "react-icons/bi";
import formatDate from "../../../helpers/formatDate.js";
import { NavLink } from "react-router-dom";
import usePost from "../../../hooks/usePost.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { decryptDate } from "../../../helpers/encrypt.js";
import { UserContext } from "../../../context/userContext.jsx";
import { useContext } from "react";
import "./commentpost.css";
export default function CommentsPost({
  id_post,
  deactivate_comments,
  onCreateComment,
}) {
  const { _id, username, avatar } = decryptDate(
    useSelector((state) => state.user.userInfo)
  );
  const [comments, setComments] = useState();
  const { setInfo } = useContext(UserContext);
  const [text, setText] = useState("");
  const { getCommentsPost, createComment } = usePost();

  const handlerSendComment = () => {
    if (text.trim() !== "") {
      onCreateComment();
      createComment(
        (err, data) => {
          if (err) {
            if (err.code === 107) {
              return setInfo(["El usuario ha desactivado los comentarios"]);
            }
            return setInfo([err.message]);
          }
          const comment_created = data.data;
          comment_created.user = { avatar, _id, username };
          setComments([comment_created, ...comments]);
        },
        id_post,
        text
      );

      setText("");
    }
  };

  useEffect(() => {
    if (!id_post) return;
    if (!comments && !deactivate_comments) {
      getCommentsPost((err, data) => {
        if (err) {
          return setInfo([err]);
        }
        setComments(data.data.comments.reverse());
      }, id_post);
    } else {
      setComments([]);
    }
  }, []);
  return (
    <div className="block-comments">
      <div className="container_comments">
        {(() => {
          if (comments) {
            if (deactivate_comments) {
              return <p className="info_message">Comentarios desactivados</p>;
            }
            if (comments.length === 0) {
              return <p className="info_message">Todavia no hay comentarios</p>;
            }
            return comments.map((comment, i) => (
              <div key={i} className="card_comment">
                <NavLink
                  className="container_avatar_owner"
                  to={`/home/profile/view/${comment.user._id}`}
                >
                  <img
                    src={comment.user.avatar.url}
                    className="avatar avatar_comment_owner"
                    alt=""
                  />
                </NavLink>
                <div className="metadata">
                  <div className="box_username">
                    {" "}
                    @{comment.user.username}{" "}
                    <span className="time_comment">
                      {formatDate(comment.createdAt)}
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
      {!deactivate_comments ? (
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handlerSendComment();
              }
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
      ) : (
        <></>
      )}
    </div>
  );
}
