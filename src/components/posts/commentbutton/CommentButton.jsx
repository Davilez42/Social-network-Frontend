/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CommentsModal from "../commentsmodal/CommentsModal";
import { FaRegComment } from "react-icons/fa6";

export default function CommentButton({
  postId,
  countComments_,
  disabledComments,
}) {
  const [countComments, setCountComments] = useState(countComments_);
  const [commentsModal, setCommentsModal] = useState(false);

  useEffect(() => {});

  return (
    <div className="container-button-option">
      <FaRegComment
        onClick={() => {
          setCommentsModal(true);
        }}
        style={{ color: "gray" }}
        size={22}
      />
      <span className="count">{countComments_}</span>
      {commentsModal ? (
        <CommentsModal
          addCountComments={() => {
            setCountComments(countComments + 1);
          }}
          closeView={() => {
            setCommentsModal(false);
          }}
          disabledComments={disabledComments}
          postId={postId}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
