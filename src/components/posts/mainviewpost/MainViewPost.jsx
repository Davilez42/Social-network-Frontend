/* eslint-disable react/prop-types */
import "./mainviewposts.css";
import { GoBookmark } from "react-icons/go";
import CommentButton from "../commentbutton/CommentButton.jsx";
import { useNavigate } from "react-router-dom";
import LikeButton from "../likebutton/LikeButton.jsx";
import OptionsPostView from "../optionpostview/OptionsPostView.jsx";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
export default function MainViewPost({
  posts,
  info_author = true,
  loader = false,
}) {
  const usenavigate = useNavigate();
  useEffect(() => {}, []);
  return (
    <>
      <div className="container-posts">
        {posts.map((post) => (
          <div key={post._id} id={post._id} className="card_post">
            <div className="info_owner">
              {info_author ? (
                <>
                  <img
                    onClick={() => {
                      usenavigate(`/home/profile/view/${post.author._id}`);
                    }}
                    loading="lazy"
                    className="avatar avatar_post_owner"
                    src={post.author.avatar.url}
                    alt=""
                  />
                  <p
                    onClick={() => {
                      usenavigate(`/home/profile/view/${post.author._id}`);
                    }}
                  >
                    {post.author.username}
                  </p>
                </>
              ) : (
                <></>
              )}
              <OptionsPostView post={post} />
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
                <LikeButton likes={post.likes} id_post={post._id} />
              </div>
              <div className="option">
                <CommentButton
                  id_post={post._id}
                  count_comments={post.countComments}
                  deactivate_comments={post.config.deactive_comments}
                />
              </div>
              <div className="option option_saved_post">
                <GoBookmark size={25} />
              </div>
            </div>
          </div>
        ))}
        {loader ? (
          <div className="box_laoder">
            <span className="loader"></span>
          </div>
        ) : posts ? (
          <div className="box_info_end_posts">
            No hay mas publicaciones para mostrar
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
