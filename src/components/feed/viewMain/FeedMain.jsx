import { useState, useEffect, useContext } from "react";

import MainViewPost from "../../posts/mainviewpost/MainViewPost";
import "./feedmain.css";
import ViewFriendsSide from "../viewfriendsside/ViewFriendsSide.jsx";
import usePost from "../../../hooks/usePost.js";
import { UserContext } from "../../../context/userContext.jsx";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import InputSearch from "../inputsearch/InputSearch.jsx";
import { useSelector } from "react-redux";
import { decryptDate } from "../../../helpers/encrypt.js";

export default function FeedMain() {
  const { _id } = decryptDate(useSelector((state) => state.user.userInfo));

  const [posts, setPosts] = useState();
  const [reload, setReload] = useState(true);
  const [cursor, setCursor] = useState();
  const [inputSearchView, setViewInputSearch] = useState(false);

  const navigate = useNavigate();
  const { setInfo } = useContext(UserContext);
  const { getPosts } = usePost(navigate);

  const getPostsHandler = (query) => {
    const querys_requests = {};
    if (query) {
      setCursor(1);
      querys_requests[`query`] = query;
    }
    if (cursor) {
      querys_requests[`cursor`] = cursor;
    }

    getPosts((err, data) => {
      if (err) {
        return setInfo([err.message]);
      }
      setReload(false);
      setCursor(data.data.cursor);

      if (query || !posts) {
        return setPosts(data.data.posts);
      }
      if (posts?.length > 0) {
        return setPosts([...posts, ...data.data.posts]);
      }
    }, querys_requests);
  };

  useEffect(() => {
    if (reload) {
      getPostsHandler();
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
          setReload(true);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const handlerSerch = (query) => {
    getPostsHandler(query);
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
          <MainViewPost posts={posts} activeReload={reload} />
        </div>
        <div className="container-feed-friends">
          <ViewFriendsSide id_user={_id} />
        </div>
      </div>
    </>
  );
}
