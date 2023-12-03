/* eslint-disable react/prop-types */
import "./mainviewposts.css";
import { GoBookmark } from "react-icons/go";
import CommentsViewMain from "../commentsviewmain/CommentsViewMain.jsx";
import { useNavigate } from "react-router-dom";
import ButtonLike from "../buttonlike/ButtonLike.jsx";
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
          <div key={post.id_post} id={post.id_post} className="card_post">
            <div className="info_owner">
              {info_author ? (
                <>
                  <img
                    onClick={() => {
                      usenavigate(`/home/profile/view/${post.id_author}`);
                    }}
                    loading="lazy"
                    className="avatar avatar_post_owner"
                    src={post.url_avatar_author}
                    alt=""
                  />
                  <p
                    onClick={() => {
                      usenavigate(`/home/profile/view/${post.id_author}`);
                    }}
                  >
                    {post.username_author}
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
                  post.media_links.length === 1
                    ? { justifyContent: "center" }
                    : {}
                }
              >
                {post.media_links.map((media, ind) => {
                  if (!media) return <div key={post.id_post}></div>;
                  const format = media.split(".").pop().toLowerCase();
                  if (format === "mp4") {
                    return (
                      <video
                        loading="lazy"
                        key={ind + post.id_post}
                        src={media}
                        controls
                        className="video_media"
                      />
                    );
                  }
                  if (["jpeg", "jpg", "png"].includes(format)) {
                    return (
                      <img
                        key={ind + post.id_post}
                        loading="lazy"
                        src={media}
                        className="image_media"
                        alt=""
                      />
                    );
                  }
                  return <div key={post.id_post}></div>;
                })}
              </div>
            </div>
            <div className="info_post_options">
              <div className="option">
                <ButtonLike likes_post={post.likes} id_post={post.id_post} />
              </div>
              <div className="option">
                <CommentsViewMain
                  id_post={post.id_post}
                  count_comments={post.countcomments}
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
