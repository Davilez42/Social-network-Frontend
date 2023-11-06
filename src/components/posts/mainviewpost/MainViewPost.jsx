import React, { useEffect, useState } from "react";

import posts_db from "../posts_db.json";
import { AiTwotoneHeart } from "react-icons/ai";
import "./mainviewposts.css";
import {
  BiHeart,
  BiCommentDetail,
  BiDotsHorizontalRounded,
} from "react-icons/bi";
export default function MainViewPost() {
  const [posts, setPosts] = useState(posts_db);

  const handlerLike = (id_post) => {
    console.log("LIKE POST ", id_post);
  };
  return (
    <>
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
                <BiCommentDetail className="option" size={30} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
