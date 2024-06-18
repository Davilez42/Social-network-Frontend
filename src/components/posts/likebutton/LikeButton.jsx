/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { RiHeartFill } from "react-icons/ri";
import { UserContext } from "../../../context/userContext";
import { useContext } from "react";
import usePost from "../../../hooks/usePost";

import LikesModal from "../likesmodal/LikesModal";
import numberFormat from "../../../helpers/numberFormat";

export default function LikeButton({ id_post, likedbyme, countLikes }) {
  const { setInfo } = useContext(UserContext);
  const [iconlikeActive, setIconlikeActive] = useState(likedbyme);
  const [usersLikeView, setUsersLikeView] = useState(false);

  const { sendLike } = usePost();
  const [state_likes, setState_Like] = useState(countLikes);

  const handlerLike = (id_post) => {
    sendLike((err) => {
      if (err) {
        setIconlikeActive(false);
        return setInfo([err.message]);
      }
    }, id_post);
  };

  useEffect(() => {});

  return (
    <>
      {iconlikeActive ? (
        <RiHeartFill
          className="cursor-pointer"
          key={503}
          onClick={() => {
            setIconlikeActive(false);
            setState_Like(state_likes - 1);
            handlerLike(id_post);
          }}
          color="red"
          size={24}
        />
      ) : (
        <IoMdHeartEmpty
          className="cursor-pointer"
          key={504}
          onClick={() => {
            setState_Like(state_likes + 1);
            setIconlikeActive(true);
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
        <div className="counter cursor-pointer">
          {numberFormat(state_likes)}
        </div>
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
