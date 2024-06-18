/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import "./postpreview.css";
import { PiArrowLeftBold } from "react-icons/pi";
import ButtonLike from "../likebutton/LikeButton";
import { useNavigate } from "react-router-dom";
import usePost from "../../../hooks/usePost";
import { UserContext } from "../../../context/userContext";

import CommentsPost from "../commentspost/CommentsPost";
export default function PostPreviewView({
  post,
  actionClose,
  modeEdit = false,
}) {
  const usenavigate = useNavigate();
  const { setInfo } = useContext(UserContext);
  const [descriptionPost_edit, setDescriptionPost_edit] = useState("");
  const { modifyPost } = usePost();
  console.log(post);
  useEffect(() => {
    setDescriptionPost_edit(post.text);
  }, []);

  const handlerUpdateDescription = () => {
    modifyPost(
      (err, data) => {
        if (err) {
          return setInfo([err.message]);
        }
      },
      post.id_post,
      { text: descriptionPost_edit }
    );
  };

  return (
    <div className="container_preview_post">
      <div className="box_back">
        <PiArrowLeftBold
          className="back_feed_main"
          onClick={() => {
            actionClose();
          }}
          size={25}
        />
      </div>
      <div className="container_data_post">
        <div className="container_media">
          <div className="media_preview">
            {post.media.map((media, ind) => {
              if (!media) return <div key={post.id_post}></div>;
              const format = media.url.split(".").pop().toLowerCase();
              if (format === "mp4") {
                return (
                  <video
                    loading="lazy"
                    key={ind + post._id}
                    src={media.url}
                    controls
                    className="video_media media_post_preview"
                  />
                );
              }
              if (["jpeg", "jpg", "png"].includes(format)) {
                return (
                  <img
                    key={ind + post._id}
                    loading="lazy"
                    src={media.url}
                    className="image_media media_post_preview"
                    alt=""
                  />
                );
              }
              return <div key={post._id}></div>;
            })}
          </div>
        </div>

        <div className="container_info_post">
          <div className="info_owner info_post_preview">
            <img
              onClick={() => {
                usenavigate(`/home/profile/view/${post.author.avatar.url}`);
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
          </div>

          {modeEdit ? (
            <div className="container_inputs_edit">
              <textarea
                onChange={(event) => {
                  setDescriptionPost_edit(event.target.value);
                }}
                className="input_text_edit_post"
                value={descriptionPost_edit}
              />
              <div
                className="button button_saved_text_post"
                onClick={handlerUpdateDescription}
              >
                guardar
              </div>
            </div>
          ) : (
            <div className="description_post_preview">
              <p>{descriptionPost_edit}</p>
            </div>
          )}

          <div className="options_post_preview">
            <ButtonLike
              id_post={post._id}
              countLikes={post.countLikes}
              likedbyme={post.likedbyme}
            />
          </div>

          <div className="container_comments_post_preview">
            <CommentsPost
              id_post={post._id}
              deactivate_comments={post.config.deactivate_comments}
              onCreateComment={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
