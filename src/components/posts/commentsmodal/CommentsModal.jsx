/* eslint-disable react/prop-types */
import { PiArrowLeftBold } from "react-icons/pi";
import CommentsPost from "../commentspost/CommentsPost";
export default function CommentsModal({
  id_post,
  addCountComments,
  closeView,
  deactivate_comments,
}) {
  return (
    <div className="container_filter">
      <div className="container_view_comments">
        <div className="header_comments">
          <PiArrowLeftBold
            className="back_feed_main"
            onClick={() => {
              closeView();
            }}
            size={24}
          />
          <p>Comentarios</p>
        </div>
        <CommentsPost
          id_post={id_post}
          onCreateComment={() => addCountComments()}
          deactivate_comments={deactivate_comments}
        />
      </div>
    </div>
  );
}
