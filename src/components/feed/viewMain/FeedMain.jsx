import React, { useState, useEffect } from "react";
import NavBarSide from "../navbarside/NavBarSide";
import CreateFormPosts from "../../posts/createformpost/CreateFormPost";
import MainViewPost from "../../posts/mainviewpost/MainViewPost";
import "./feedmain.css";
import ViewFriendsSide from "../viewfriendsside/ViewFriendsSide.jsx";
import usePost from "../../../hooks/usePost.js";
export default function FeedMain() {
  const [posts, setPosts] = useState([]);
  const { getPosts } = usePost();

  useEffect(() => {
    getPosts(setPosts);
  }, []);

  return (
    <>
      <ViewFriendsSide />
      <div className="container-feed-main">
        <CreateFormPosts />
        <MainViewPost posts={posts} />
      </div>
      <NavBarSide />
    </>
  );
}
