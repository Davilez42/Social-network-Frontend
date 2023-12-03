/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import "./postpreview.css";
import { PiArrowLeftBold } from "react-icons/pi";
import ButtonLike from "../buttonlike/ButtonLike";
import { useNavigate } from "react-router-dom";
import CommentsListView from "../commentslistview/CommentsListView";
import usePost from "../../../hooks/usePost";
import { UserContext } from "../../../context/userContext";
import { useDispatch } from "react-redux";
import { updateDescriptionPost } from "../../../features/user/userSlice";
export default function PostPreviewView({
  post,
  actionClose,
  modeEdit = false,
}) {
  const dispatch = useDispatch();
  const usenavigate = useNavigate();
  const { setInfo } = useContext(UserContext);
  const [descriptionPost_edit, setDescriptionPost_edit] = useState("");
  const { modifyPost } = usePost();

  useEffect(() => {
    setDescriptionPost_edit(post.text);
    console.log(post);
  }, []);

  const handlerUpdateDescription = () => {
    modifyPost(
      setInfo,
      post.id_post,
      { text: descriptionPost_edit },
      () => {},
      () => {
        dispatch(
          updateDescriptionPost({
            id_post: post.id_post,
            text: descriptionPost_edit,
          })
        );
        setInfo(["Se ha modificado tu publicacion"]);
      }
    );
  };

  return (
    <>
      <div className="container_filter">
        <div className="container_preview_post">
          <div className="box_back back_preview_image">
            <PiArrowLeftBold
              className="back_feed_main"
              onClick={() => {
                actionClose();
              }}
              size={30}
            />
          </div>
          <div className="container_data_post">
            <div className="container_media">
              <div className="media_preview">
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

            <div className="container_info_post">
              <div className="info_owner info_post_preview">
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
                <ButtonLike id_post={post.id_post} likes_post={post.likes} />
              </div>

              <div className="container_comments_post_preview">
                <CommentsListView id_post={post.id_post} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
