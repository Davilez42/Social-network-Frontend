import React from "react";
import NavBarSide from "../navbarside/NavBarSide";
import CreateFormPosts from "../../posts/createformpost/CreateFormPost";
import MainViewPost from "../../posts/mainviewpost/MainViewPost";
import "./feedmain.css";
import ViewFriendsSide from "../viewfriendsside/ViewFriendsSide.jsx";
export default function FeedMain() {
  return (
    <>
      <ViewFriendsSide />
      <div className="container-feed-main">
        <CreateFormPosts />
        <MainViewPost />
      </div>
      <NavBarSide />
    </>
  );
}
