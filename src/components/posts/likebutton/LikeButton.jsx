/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import usePost from "../../../hooks/usePost";
import LikesModal from "../likesmodal/LikesModal";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import "./likebutton.css";

export default function LikeButton({ postId, likedbyme, countLikes }) {
  // const { setInfo } = useContext(UserContext);
  const [likes, setLikes] = useState(countLikes);
  const [usersLikeView, setUsersLikeView] = useState(false);
  const [liked, setLiked] = useState(likedbyme);

  const { sendLike } = usePost();

  const handlerLike = () => {
    sendLike((err) => {
      if (err) {
        setLiked(false);
        setLikes(countLikes);
      }
    }, postId);
  };

  useEffect(() => {}, []);

  return (
    <div className="container-button-option">
      {liked ? (
        <FaHeart
          style={{ color: "red" }}
          key={504}
          onClick={() => {
            setLiked(false);
            setLikes(likes <= 0 ? 0 : likes - 1);
            handlerLike();
          }}
          size={22}
        />
      ) : (
        <FaRegHeart
          key={504}
          style={{ color: "gray" }}
          onClick={() => {
            setLiked(true);
            setLikes(likes + 1);
            handlerLike();
          }}
          size={22}
        />
      )}
      <span
        className="count"
        onClick={() => {
          setUsersLikeView(true);
        }}
      >
        {likes}
      </span>
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
    </div>
  );
}
