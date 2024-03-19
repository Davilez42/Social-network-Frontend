/* eslint-disable react/prop-types */
import "./commentbutton.css";
import { useEffect, useState } from "react";

import { FaRegComment } from "react-icons/fa";
import CommentsModal from "../commentsmodal/CommentsModal";
// eslint-disable-next-line react/prop-types
export default function CommentButton({
  id_post,
  count_comments,
  deactivate_comments,
}) {
  const [countComments, setCountComments] = useState(count_comments);
  const [viewComments, setViewComments] = useState(false);

  useEffect(() => {}, []);

  return (
    <>
      <FaRegComment
        onClick={() => {
          setViewComments(true);
        }}
        size={22}
      />
      <span>{countComments}</span>

      {viewComments ? (
        <CommentsModal
          addCountComments={() => {
            setCountComments(countComments + 1);
          }}
          closeView={() => {
            setViewComments(false);
          }}
          deactivate_comments={deactivate_comments}
          id_post={id_post}
        />
      ) : (
        <></>
      )}
    </>
  );
}
