import { useState, useEffect, useContext } from "react";

import MainViewPost from "../../posts/mainviewpost/MainViewPost";
import "./feedmain.css";
import ViewFriendsSide from "../viewfriendsside/ViewFriendsSide.jsx";
import usePost from "../../../hooks/usePost.js";
import { UserContext } from "../../../context/userContext.jsx";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import InputSearch from "../inputsearch/InputSearch.jsx";
import UserListView from "../../user/userlistview/UserListView.jsx";
import { useSelector } from "react-redux";
import { decryptDate } from "../../../helpers/encrypt.js";

export default function FeedMain() {
  const { friends } = decryptDate(useSelector((state) => state.user.userInfo));

  const [posts, setPosts] = useState([]);
  const [morePosts, seGetMorePosts] = useState(false);
  const [getPostsFedd, setGetPostsFeed] = useState(true);

  const [inputSearchView, setViewInputSearch] = useState(false);

  const navigate = useNavigate();
  const { setInfo, reload, setReload } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const { getPosts } = usePost(navigate);

  useEffect(() => {
    if (getPostsFedd || reload) {
      setLoader(true);
      setReload(false);
      setPosts([]);
      setGetPostsFeed(false);
      getPosts(setInfo, (posts) => {
        setPosts(posts);
        setLoader(false);
      });
    }
    if (morePosts) {
      setLoader(true);
      getPosts(
        setInfo,
        (new_posts) => {
          setPosts([...posts, ...new_posts]);
          setLoader(false);
        },
        {
          cursorIdPost: posts[posts.length - 1].id_post,
        }
      );
      seGetMorePosts(false);
    }
    document
      .querySelector(".container-feed-posts")
      .addEventListener("scroll", (event) => {
        const percentageScroll =
          (event.target.scrollTop /
            (event.target.scrollHeight - event.target.clientHeight)) *
          100;
        //console.log(parseInt(percentageScroll));
        if (parseInt(percentageScroll) === 100) {
          //console.log("entra");
          seGetMorePosts(true);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, morePosts]);

  const handlerSerch = (querySearch) => {
    setPosts([]);
    getPosts(setInfo, setPosts, { querySearch });
  };

  return (
    <>
      <div className="container-feed-main">
        <div
          className="search-icon-feed-main"
          onClick={() => {
            setViewInputSearch(!inputSearchView);
          }}
        >
          <FaSearch size={20} />
        </div>

        {inputSearchView ? (
          <InputSearch
            actionClose={setViewInputSearch}
            actionSearch={handlerSerch}
          />
        ) : (
          <></>
        )}

        <div className="container-feed-posts">
          <MainViewPost posts={posts} loader={loader} />
        </div>

        <div className="container-feed-friends">
          <ViewFriendsSide />

          <div className="container_feed-users-recommended">
            <p>Personas que quizas conozcas </p>
            <UserListView users={friends.slice(0, 5)} />
          </div>
        </div>
      </div>
    </>
  );
}
