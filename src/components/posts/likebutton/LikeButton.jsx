/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { useContext } from "react";
import usePost from "../../../hooks/usePost";
import LikesModal from "../likesmodal/LikesModal";

export default function LikeButton({ postId, likedbyme }) {
  const { setInfo } = useContext(UserContext);
  const [usersLikeView, setUsersLikeView] = useState(false);
  const [liked, setLiked] = useState(likedbyme);
  const { sendLike } = usePost();

  const handlerLike = () => {
    sendLike((err) => {
      if (err) {
        setLiked(false);
        return setInfo([err.message]);
      }
    }, postId);
  };

  useEffect(() => {});

  return (
    <>
      <p
        className="text-option"
        key={504}
        onClick={() => {
          setLiked(!liked);
          handlerLike();
        }}
        size={24}
      >
        {liked ? "No me interesa" : "Me interesa"}
      </p>

      {usersLikeView ? (
        <LikesModal
          postId={postId}
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
