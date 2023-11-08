import "./viewcomments.css";
import { useContext, useEffect, useState } from "react";
import usePost from "../../../hooks/usePost";
import { PiArrowLeftBold } from "react-icons/pi";
import { BiNavigation } from "react-icons/bi";
import { UserContext } from "../../../context/userContext.js";
export default function ViewComments({ id_post, handlerClose }) {
  const { getCommentsPost } = usePost();
  const { username, url_avatar } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    getCommentsPost(id_post, setComments);
  }, []);

  const handlerSendComment = () => {
    setComments([
      {
        id_comment: "11",
        id_author: "11",
        text,
        date_creation: "2022-01-11",
        id_post: "6",
        url_avatar_author: url_avatar,
        username,
      },
      ...comments,
    ]);
  };
  return (
    <>
      <div className="container_view_comments">
        <div className="header_comments">
          <PiArrowLeftBold
            className="back_feed_main"
            onClick={() => {
              handlerClose(false);
            }}
            size={30}
          />
          <p>Comentarios</p>
        </div>

        <div className="container_comments">
          {comments.length !== 0 ? (
            comments.map((comment, ind) => (
              <div key={ind} className="card_comment">
                <div className="container_avatar_owner">
                  <img
                    src={comment.url_avatar_author}
                    className="avatar avatar_comment_owner"
                    alt=""
                  />
                </div>
                <div className="metadata">
                  <div className="box_username"> @{comment.username}</div>
                  <div className="comment">
                    <p>{comment.text}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="info_message">Todavia no hay comentarios</p>
          )}
        </div>

        <div className="cotainer_input_comment">
          <input
            type="text"
            className="input-field input_comment"
            name=""
            placeholder="Escribe un comentario..."
            id=""
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
          <BiNavigation
            size={30}
            onClick={() => {
              handlerSendComment();
            }}
          />
        </div>
      </div>
    </>
  );
}
