/* eslint-disable react/prop-types */
import { PiArrowLeftBold } from "react-icons/pi";
import CommentsPost from "../commentspost/CommentsPost";
import "./commentsmodal.css";
export default function CommentsModal({
  postId,
  addCountComments,
  closeView,
  disabledComments,
}) {
  return (
    <div className="container_filter">
      <div className="container_view_comments">
        <div className="header-modal">
          <PiArrowLeftBold
            className="header-modal__icon-back-modal"
            onClick={closeView}
            size={24}
          />
          <div className="header-modal__box-tittle">
            <p>Comentarios</p>
          </div>
        </div>
        <CommentsPost
          postId={postId}
          onCreateComment={() => addCountComments()}
          disabledComments={disabledComments}
        />
      </div>
    </div>
  );
}
