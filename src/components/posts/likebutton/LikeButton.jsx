/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { UserContext } from "../../../context/userContext";
import { useContext } from "react";

import usePost from "../../../hooks/usePost";
import { useSelector } from "react-redux";
import { decryptDate } from "../../../helpers/encrypt";
import "./likebutton.css";
import LikesModal from "../likesmodal/LikesModal";

export default function LikeButton({ id_post, likes }) {
  const { _id } = decryptDate(useSelector((state) => state.user.userInfo));
  const { setInfo } = useContext(UserContext);
  const [state_button, setState_button] = useState(false);
  const [usersLikeView, setUsersLikeView] = useState(false);

  const { sendLike } = usePost();
  const [state_likes, setState_Like] = useState(likes.length);

  const handlerLike = (id_post) => {
    sendLike((err) => {
      if (err) {
        setState_button(false);
        return setInfo([err.message]);
      }
    }, id_post);
  };

  useEffect(() => {
    if (likes.some((l) => l.user === _id)) {
      setState_button(true);
    }
  }, [_id]);

  return (
    <>
      {state_button ? (
        <FaHeart
          className="like"
          key={503}
          onClick={() => {
            setState_button(false);
            setState_Like(state_likes - 1);
            handlerLike(id_post);
          }}
          color="red"
          size={24}
        />
      ) : (
        <FaRegHeart
          className="like"
          key={504}
          onClick={() => {
            setState_Like(state_likes + 1);
            setState_button(true);
            handlerLike(id_post);
          }}
          size={24}
        />
      )}
      <span
        onClick={() => {
          setUsersLikeView(true);
        }}
      >
        {state_likes}
      </span>
      {usersLikeView ? (
        <LikesModal
          id_post={id_post}
          closeView={() => {
            setUsersLikeView(false);
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
}
