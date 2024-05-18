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
  const { id_user } = decryptDate(useSelector((state) => state.user.userInfo));

  const [posts, setPosts] = useState();
  const { setInfo, back_to_init, setBack_to_inite } = useContext(UserContext);
  const [reload, setReload] = useState(true);
  const [cursor, setCursor] = useState();
  const [inQuery, setInQuery] = useState(false);
  const [inputSearchView, setViewInputSearch] = useState(false);

  const navigate = useNavigate();

  const { getPosts } = usePost(navigate);

  const getPostsHandler = (query) => {
    let querys_requests = {};
    if (query) {
      setCursor(1);
      setInQuery(true);
      setPosts(undefined);
      querys_requests[`query`] = query;
    }
    if (cursor) {
      querys_requests[`cursor`] = cursor;
    }
    if (back_to_init) {
      querys_requests = {};
      setPosts(undefined);
    }

    getPosts((err, data) => {
      if (err) {
        return setInfo([err.message]);
      }
      setReload(false);
      setCursor(data.data.cursor);

      if (query || !posts || back_to_init) {
        return setPosts(data.data.posts);
      }
      if (posts?.length > 0) {
        return setPosts([...posts, ...data.data.posts]);
      }
    }, querys_requests);
  };

  useEffect(() => {
    setInQuery(false);

    if (reload || back_to_init) {
      getPostsHandler();
      if (back_to_init) setBack_to_inite(false);
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
  }, [reload, back_to_init]);

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
          {(() => {
            if (!posts) {
              return (
                <div className="box_loader">
                  <span className="loader"></span>
                </div>
              );
            }
            if (posts.length === 0 && inQuery) {
              return <p>No hay resultados para la busqueda</p>;
            }

            return <MainViewPost posts={posts} activeReload={reload} />;
          })()}
        </div>
        <div className="container-feed-friends">
          {id_user ? <ViewFriendsSide id_user={id_user} /> : <></>}
        </div>
      </div>
    </>
  );
}
