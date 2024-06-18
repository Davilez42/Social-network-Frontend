/* eslint-disable react/prop-types */
import "./mainviewposts.css";
import { GoBookmark } from "react-icons/go";
import CommentButton from "../commentbutton/CommentButton.jsx";
import { useNavigate } from "react-router-dom";
import LikeButton from "../likebutton/LikeButton.jsx";
import OptionsPostModal from "../optionsmodal/OptionsPostModal.jsx";
import { useEffect } from "react";
import formatDate from "../../../helpers/formatDate.js";
import { AiFillCheckCircle } from "react-icons/ai";

export default function MainViewPost({
  posts,
  avatar_author = true,
  activeReload,
}) {
  const usenavigate = useNavigate();
  useEffect(() => {}, []);
  return (
    <>
      <div className="container-posts">
        {(() => {
          if (!posts) return <></>;

          return posts.map((post, i) => (
            <div key={i} id={post._id} className="card_post">
              <div className="info_owner">
                <div className="block-user">
                  {avatar_author ? (
                    <img
                      onClick={() => {
                        usenavigate(
                          `/home/profile/view/${
                            (post.author[0] || post.author)?._id
                          }`
                        );
                      }}
                      loading="lazy"
                      className="avatar avatar_post_owner"
                      src={(post.author[0] || post.author)?.avatar.url}
                      alt=""
                    />
                  ) : (
                    <></>
                  )}
                  <p
                    className="text-username cursor-pointer"
                    onClick={() => {
                      usenavigate(`/home/profile/view/${post.author?._id}`);
                    }}
                  >
                    {(post.author[0] || post.author)?.username}{" "}
                  </p>
                  {(post.author[0] || post.author)?.verified ? (
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
                  {post.media.map((media, ind) => {
                    if (!media) return <div key={post._id}></div>;
                    const format = media.url.split(".").pop().toLowerCase();
                    if (format === "mp4") {
                      return (
                        <video
                          loading="lazy"
                          key={ind + post._id}
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
                          key={ind + post._idt}
                          loading="lazy"
                          src={media.url}
                          className="image_media"
                          alt=""
                        />
                      );
                    }
                    return <div key={post._id}></div>;
                  })}
                </div>
              </div>
              <div className="info_post_options">
                <div className="option">
                  <LikeButton
                    countLikes={post.countLikes}
                    likedbyme={post.likedbyme}
                    id_post={post._id}
                  />
                </div>
                <div className="option">
                  <CommentButton
                    id_post={post._id}
                    count_comments={post.countComments}
                    comments_disabled={post.config.comments_disabled}
                  />
                </div>
                <div className="option option_saved_post">
                  <GoBookmark size={25} />
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
    </>
  );
}
