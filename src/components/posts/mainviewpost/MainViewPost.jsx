import React, { useEffect, useState } from "react";
import { AiTwotoneHeart } from "react-icons/ai";
import "./mainviewposts.css";
import {
  BiHeart,
  BiCommentDetail,
  BiDotsHorizontalRounded,
} from "react-icons/bi";
import ViewComments from "../viewcomments/ViewComments.jsx";

export default function MainViewPost({ posts, info_author = true }) {
  const [stateComments, setStateComments] = useState(false);
  const [postSelect, setPostSelect] = useState();

  const handlerLike = (id_post) => {
    console.log(stateComments);
    console.log("LIKE POST ", id_post);
  };

  return (
    <>
      {stateComments ? (
        <ViewComments
          key={501}
          id_post={postSelect}
          handlerClose={setStateComments}
        />
      ) : (
        <></>
      )}
      <div className="container-posts">
        {posts.map((post, ind) => (
          <div key={ind} className="card_post">
            <div className="info_owner">
              {info_author ? (
                <>
                  <img
                    loading="lazy"
                    className="avatar avatar_post_owner"
                    src={post.url_avatar_author}
                    alt=""
                  />
                  <p>{post.username_author}</p>
                </>
              ) : (
                <></>
              )}
              <BiDotsHorizontalRounded
                className="list_options_post"
                size={30}
              />
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
                  if (!media) return;
                  const format = media.split(".").pop().toLowerCase();
                  if (format === "mp4") {
                    return (
                      <video
                        loading="lazy"
                        key={ind}
                        src={media}
                        controls
                        className="video_media"
                      />
                    );
                  }
                  if (["jpeg", "jpg"].includes(format)) {
                    return (
                      <img
                        key={ind}
                        loading="lazy"
                        src={media}
                        className="image_media"
                        alt=""
                      />
                    );
                  }
                })}
              </div>
            </div>
            <div className="info_post_options">
              <div className="option">
                {false ? (
                  <AiTwotoneHeart
                    key={503}
                    onClick={() => handlerLike(post.id_post)}
                    size={30}
                    color="red"
                  />
                ) : (
                  <BiHeart
                    key={504}
                    onClick={() => handlerLike(post.id_post)}
                    size={30}
                  />
                )}
                <p>{parseInt(Math.random() * 1000)}</p>
              </div>
              <div>
                <BiCommentDetail
                  className="option"
                  onClick={() => {
                    setPostSelect(post.id_post);
                    setStateComments(true);
                  }}
                  size={30}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
