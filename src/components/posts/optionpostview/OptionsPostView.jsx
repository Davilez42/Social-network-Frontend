/* eslint-disable react/prop-types */
import "./optionspostview.css";
import { PiArrowLeftBold } from "react-icons/pi";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUserPost,
  archiveUserPost,
} from "../../../features/user/userSlice";
import { decryptDate } from "../../../helpers/encrypt";
import usePost from "../../../hooks/usePost";
import { UserContext } from "../../../context/userContext";
export default function OptionsPostView({ post }) {
  const dispatch = useDispatch();
  const { deletePost, modifyPost } = usePost();
  const { setInfo, setReload, reload } = useContext(UserContext);
  const { id_user, userPosts } = decryptDate(
    useSelector((state) => state.user.userInfo)
  );
  const [options_view, setOptions_View] = useState(false);

  const handlerDeletePost = () => {
    deletePost(
      setInfo,
      post.id_post,
      () => {},
      () => {
        dispatch(deleteUserPost(post.id_post));
        setReload(!reload);
        console.log(userPosts);
      }
    );
    setOptions_View(false);
  };
  const handlerArchivePost = () => {
    modifyPost(
      setInfo,
      post.id_post,
      { post_visibility: false },
      () => {},
      () => {
        setReload(!reload);
        dispatch(archiveUserPost(post.id_post));
      }
    );
    setOptions_View(false);
  };

  useEffect(() => {}, []);
  return (
    <>
      <BiDotsHorizontalRounded
        onClick={() => {
          setOptions_View(true);
        }}
        className="list_options_post"
        size={30}
      />

      {options_view ? (
        <div className="container_filter">
          <div className="box-options-post">
            <div className="box_back">
              <PiArrowLeftBold
                className="back_feed_main"
                onClick={() => {
                  setOptions_View(false);
                }}
                size={30}
              />
            </div>
            <hr className="hr_option_post" />
            <div className="item_option_post item_denunciar">Denunciar</div>

            {post.id_author === id_user ? (
              <>
                <hr className="hr_option_post" />
                <div
                  className="item_option_post"
                  onClick={() => {
                    handlerArchivePost();
                  }}
                >
                  Archivar
                </div>
                <hr className="hr_option_post" />
                <div className="item_option_post">Editar</div>
                <hr className="hr_option_post" />
                <div
                  className="item_option_post"
                  onClick={() => {
                    handlerDeletePost();
                  }}
                >
                  Eliminar
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
