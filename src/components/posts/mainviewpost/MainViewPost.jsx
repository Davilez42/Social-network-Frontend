import React, { useEffect, useState } from "react";
import { AiTwotoneHeart } from "react-icons/ai";
import "./mainviewposts.css";
import {
  BiHeart,
  BiCommentDetail,
  BiDotsHorizontalRounded,
} from "react-icons/bi";
import ViewComments from "../viewcomments/ViewComments.jsx";

export default function MainViewPost({ posts }) {
  const [stateComments, setStateComments] = useState(false);
  const [postSelect, setPostSelect] = useState();

  const handlerLike = (id_post) => {
    console.log(stateComments);
    console.log("LIKE POST ", id_post);
  };

  return (
    <>
      {stateComments ? (
        <ViewComments id_post={postSelect} handlerClose={setStateComments} />
      ) : (
        <></>
      )}
      <div className="container-posts">
        {posts.map((post, ind) => (
          <div className="card_post">
            <div className="info_owner">
              <img
                loading="lazy"
                className="avatar avatar_post_owner"
                src={post.url_avatar_autor}
                alt=""
              />
              <p>{post.username_owner}</p>
              <BiDotsHorizontalRounded
                className="list_options_post"
                size={30}
              />
            </div>

            <div className="description_post">
              <p>{post.text}</p>
            </div>

            <div className="container_image_post">
              <img className="image_post" src={post.url_image} alt="" />
            </div>
            <div className="info_post_options">
              <div className="option">
                {false ? (
                  <AiTwotoneHeart
                    onClick={() => handlerLike(post.id_post)}
                    size={30}
                    color="red"
                  />
                ) : (
                  <BiHeart
                    onClick={() => handlerLike(post.id_post)}
                    size={30}
                  />
                )}
                <p>{post.likes}</p>
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
