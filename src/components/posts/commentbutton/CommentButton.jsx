/* eslint-disable react/prop-types */
import "./commentbutton.css";
import { useEffect, useState } from "react";
import CommentsModal from "../commentsmodal/CommentsModal";

export default function CommentButton({
  postId,
  count_comments,
  comments_disabled,
}) {
  const [countComments, setCountComments] = useState(count_comments);
  const [commentsModal, setCommentsModal] = useState(false);

  useEffect(() => {});

  return (
    <div className="text-option">
      opinar
      {commentsModal ? (
        <CommentsModal
          addCountComments={() => {
            setCountComments(countComments + 1);
          }}
          closeView={() => {
            setCommentsModal(false);
          }}
          comments_disabled={comments_disabled}
          postId={postId}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
