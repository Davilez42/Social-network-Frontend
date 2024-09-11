/* eslint-disable react/prop-types */
import CommentButton from "../commentbutton/CommentButton.jsx";
import { useNavigate } from "react-router-dom";
import LikeButton from "../likebutton/LikeButton.jsx";
import OptionsPostModal from "../optionsmodal/OptionsPostModal.jsx";
import { useEffect } from "react";
import formatDate from "../../../helpers/formatDate.js";
import { AiFillCheckCircle } from "react-icons/ai";
import "./mainviewposts.css";

export default function MainViewPost({
  posts,
  authorAvatar = true,
  activeReload,
}) {
  const usenavigate = useNavigate();

  useEffect(() => {}, [posts]);

  return (
    <div className="container-posts">
      {(() => {
        if (!posts) return <></>;
        return posts.map((post, i) => (
          <div key={i} className="card_post">
            <div className="info_owner">
              <div className="block-user">
                {authorAvatar ? (
                  <img
                    onClick={() => {
                      usenavigate(`/home/profile/view/${post.authorId}`);
                    }}
                    loading="lazy"
                    className="avatar avatar_post_owner"
                    src={post.authorUrlAvatar}
                  />
                ) : (
                  <></>
                )}
                <p
                  className="text-username cursor-pointer"
                  onClick={() => {
                    usenavigate(`/home/profile/view/${post.authorId}`);
                  }}
                >
                  {post.authorUsername}
                </p>
                {post.authorCheckVerified ? (
                  <AiFillCheckCircle size={15} color="green" />
                ) : (
                  <></>
                )}
                <div className="text_time">{formatDate(post.createdAt)}</div>
              </div>
              <OptionsPostModal post={post} />
            </div>

            <div className="description_post">
              <p>{post.text}</p>
            </div>

            <div className="container_media_post">
              <div
                className="preview_media"
                style={
                  post.media.length === 1 ? { justifyContent: "center" } : {}
                }
              >
                {post.media.map((media) => {
                  if (!media) return <div key={post.id}></div>;
                  const format = media.url.split(".").pop().toLowerCase();
                  if (format === "mp4") {
                    return (
                      <video
                        loading="lazy"
                        key={media.url}
                        src={media.url}
                        controls
                        autoFocus
                        className="video_media"
                      />
                    );
                  }
                  if (["jpeg", "jpg", "png"].includes(format)) {
                    return (
                      <img
                        key={media.url}
                        loading="lazy"
                        src={media.url}
                        className="image_media"
                        alt=""
                      />
                    );
                  }
                  return <div key={post.id}></div>;
                })}
              </div>
            </div>
            <div className="info_post_options">
              <div className="option">
                <LikeButton
                  countLikes={post.countLikes}
                  likedbyme={post.liked}
                  postId={post.id}
                />
              </div>
              <div className="option">
                <CommentButton
                  postId={post.id}
                  countComments_={post.countComments}
                  disabledComments={post.comments}
                />
              </div>
            </div>
          </div>
        ));
      })()}
      <div className="box_info_end_posts">
        {activeReload || !posts ? (
          <div className="box_loader">
            <span className="loader"></span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
