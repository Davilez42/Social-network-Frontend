import "./commentsviewmain.css";
import { useEffect, useState } from "react";

import { PiArrowLeftBold } from "react-icons/pi";

import { FaRegComment } from "react-icons/fa";
import CommentsListView from "../commentslistview/CommentsListView.jsx";

// eslint-disable-next-line react/prop-types
export default function CommentsViewMain({ id_post, count_comments }) {
  const [countComments, setCountComments] = useState(parseInt(count_comments));
  const [state_view, setSate_view] = useState(false);

  useEffect(() => {}, []);

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
            <CommentsListView
              actionCreateComment={() => {
                setCountComments(countComments + 1);
              }}
              id_post={id_post}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
