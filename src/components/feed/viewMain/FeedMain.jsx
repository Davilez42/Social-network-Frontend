/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import MainViewPost from "../../posts/mainviewpost/MainViewPost";
// import ViewFriendsSide from "../viewfriendsside/ViewFriendsSide.jsx";
import usePost from "../../../hooks/usePost.js";
import { UserContext } from "../../../context/userContext.jsx";
import { FaSearch } from "react-icons/fa";
import InputSearch from "../inputsearch/InputSearch.jsx";
import { useSelector } from "react-redux";
import "./feedmain.css";

export default function FeedMain() {
  // const { id } = useSelector((state) => state.user.userInfo);
  const { setInfo } = useContext(UserContext);
  const [loadMore, setLoadMore] = useState(false);
  const [loader, setLoader] = useState(false);
  const [cursor, setCursor] = useState(undefined);
  const [inputSearchView, setViewInputSearch] = useState(false);
  const [posts, setPosts] = useState([]);

  const { getPosts } = usePost();

  const getPostsHandler = (query) => {
    console.count("GetPosts");
    if (query) {
      setPosts([]);
    }
    getPosts(
      (err, data) => {
        setLoader(false);
        if (err) {
          return setInfo([err.message]);
        }
        setCursor(data.data.cursor);
        setPosts([...posts, ...data.data.posts]);
      },
      { cursor, query }
    );
  };

  const scrollHandler = (e) => {
    const container = e.target;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      console.info("scrool event");
      setLoadMore(true);
      setLoader(true);
    }
  };

  useEffect(() => {
    if (posts.length === 0 || loadMore) {
      setLoadMore(false);
      getPostsHandler();
    }

    document
      .querySelector(".container-feed-posts")
      ?.addEventListener("scroll", scrollHandler);

    return () => {
      document
        .querySelector(".container-feed-posts")
        ?.removeEventListener("scroll", scrollHandler);
    };
  }, [loadMore]);

  return (
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
          actionSearch={getPostsHandler}
        />
      ) : (
        <></>
      )}
      <div className="container-feed-posts">
        {posts.length > 0 ? (
          <MainViewPost posts={posts} activeReload={loader} />
        ) : (
          <div className="loader"></div>
        )}
      </div>
      {/*  <div className="container-feed-friends">
        {id ? <ViewFriendsSide userId={id} /> : <></>}
      </div> */}
    </div>
  );
}
