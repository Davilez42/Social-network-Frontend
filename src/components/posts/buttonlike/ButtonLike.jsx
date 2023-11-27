/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { UserContext } from "../../../context/userContext";
import { useContext } from "react";

import usePost from "../../../hooks/usePost";
import { useSelector } from "react-redux";
import { decryptDate } from "../../../helpers/encrypt";

import UsersLikeView from "../userslikeview/UsersLikeView";

export default function ButtonLike({ id_post, likes_post }) {
  const { id_user } = decryptDate(useSelector((state) => state.user.userInfo));
  const { setInfo } = useContext(UserContext);
  const [state_button, setState_button] = useState(false);
  const [usersLikeView, setUsersLikeView] = useState(false);

  const { sendLike } = usePost();
  const [state_likes, setState_Like] = useState();

  const actionReverse = () => {
    setState_button(false);
  };

  const handlerLike = (id_post) => {
    sendLike(setInfo, id_post, actionReverse);
  };

  useEffect(() => {
    // console.log(likes_post, id_user);
    setState_Like(likes_post.filter((d) => d !== null).length);
    if (likes_post.includes(parseInt(id_user))) {
      setState_button(true);
    }
  }, [id_user]);

  return (
    <>
      {state_button ? (
        <FaHeart
          className="liked"
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
        <UsersLikeView id_post={id_post} actionCloseAction={setUsersLikeView} />
      ) : (
        <></>
      )}
    </>
  );
}
