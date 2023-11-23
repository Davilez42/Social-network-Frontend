import { useState, useEffect, useContext } from "react";
import NavBarSide from "../navbarside/NavBarSide";
import MainViewPost from "../../posts/mainviewpost/MainViewPost";
import "./feedmain.css";
import ViewFriendsSide from "../viewfriendsside/ViewFriendsSide.jsx";
import usePost from "../../../hooks/usePost.js";
import { UserContext } from "../../../context/userContext.jsx";
import { useNavigate } from "react-router-dom";
export default function FeedMain() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { setInfo, reload, setReload } = useContext(UserContext);
  const { getPosts } = usePost(navigate);

  useEffect(() => {
    setReload(false);
    getPosts(setInfo, setPosts);
  }, [reload]);

  return (
    <>
      <div className="container-feed-side">
        <NavBarSide />
        <ViewFriendsSide />
      </div>

      <div className="container-feed-main">
        <MainViewPost posts={posts} />
      </div>
    </>
  );
}
