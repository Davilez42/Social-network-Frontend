import React from "react";
import NavBarSide from "../navbarside/NavBarSide";
import CreateFormPosts from "../../posts/createformpost/CreateFormPost";
import MainViewPost from "../../posts/mainviewpost/MainViewPost";
import "./feedmain.css";
export default function FeedMain() {
  return (
    <>
      <div className="container-feed-main">
        <CreateFormPosts />
        <MainViewPost />
      </div>
      <NavBarSide />
    </>
  );
}
