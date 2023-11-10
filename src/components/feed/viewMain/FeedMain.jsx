import React, { useState, useEffect, useContext } from "react";
import NavBarSide from "../navbarside/NavBarSide";
import CreateFormPosts from "../../posts/createformpost/CreateFormPost";
import MainViewPost from "../../posts/mainviewpost/MainViewPost";
import "./feedmain.css";
import ViewFriendsSide from "../viewfriendsside/ViewFriendsSide.jsx";
import usePost from "../../../hooks/usePost.js";
import { UserContext } from "../../../context/userContext.js";
export default function FeedMain() {
  const [posts, setPosts] = useState([]);
  const { setInfo, reload, setReload } = useContext(UserContext);
  const { getPosts } = usePost();

  useEffect(() => {
    console.log("RENDERIZA FEED PRINCIPAL");
    if (reload) {
      setReload(false);
      getPosts(setInfo, setPosts);
    }
  }, [reload]);

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
