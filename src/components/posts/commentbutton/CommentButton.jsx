/* eslint-disable react/prop-types */
import "./commentbutton.css";
import { useEffect, useState } from "react";
import { GoComment } from "react-icons/go";
import CommentsModal from "../commentsmodal/CommentsModal";
// eslint-disable-next-line react/prop-types
export default function CommentButton({
  id_post,
  count_comments,
  comments_disabled,
}) {
  const [countComments, setCountComments] = useState(count_comments);
  const [commentsModal, setCommentsModal] = useState(false);

  useEffect(() => {});

  return (
    <>
      <GoComment
        size={22}
        className="cursor-pointer"
        onClick={() => {
          setCommentsModal(true);
        }}
      />
      <span
        className="counter cursor-pointer"
        onClick={() => {
          setCommentsModal(true);
        }}
      >
        {countComments}
      </span>

      {commentsModal ? (
        <CommentsModal
          addCountComments={() => {
            setCountComments(countComments + 1);
          }}
          closeView={() => {
            setCommentsModal(false);
          }}
          comments_disabled={comments_disabled}
          id_post={id_post}
        />
      ) : (
        <></>
      )}
    </>
  );
}
