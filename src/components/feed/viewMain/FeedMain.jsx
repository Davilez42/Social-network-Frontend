import React, { useState, useEffect, useContext } from "react";
import NavBarSide from "../navbarside/NavBarSide";
import CreateFormPosts from "../../posts/createformpost/CreateFormPost";
import MainViewPost from "../../posts/mainviewpost/MainViewPost";
import "./feedmain.css";
import ViewFriendsSide from "../viewfriendsside/ViewFriendsSide.jsx";
import usePost from "../../../hooks/usePost.js";
import { UserContext } from "../../../context/userContext.js";
import { useNavigate } from "react-router-dom";
export default function FeedMain() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { setInfo, reload, setReload } = useContext(UserContext);
  const { getPosts } = usePost(navigate);

  useEffect(() => {
    //console.log("RENDERIZA FEED PRINCIPAL");
    //setReload(false);
    //getPosts(setInfo, setPosts);
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
