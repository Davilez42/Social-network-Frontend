/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { UserContext } from "../../../context/userContext";
import { useContext } from "react";
import usePost from "../../../hooks/usePost";

export default function ButtonLike({ id_post, likes_post }) {
  const { setInfo, id_user } = useContext(UserContext);
  const [state_button, setState_button] = useState(false);

  const { sendLike } = usePost();
  const [state_likes, setState_Like] = useState();

  const actionReverse = () => {
    setState_button(false);
  };

  const handlerLike = (id_post) => {
    sendLike(setInfo, id_post, actionReverse);
  };

  useEffect(() => {
    console.log(likes_post, id_user);
    setState_Like(likes_post.filter((d) => d !== null).length);
    if (likes_post.includes(parseInt(id_user))) {
      setState_button(true);
    }
  }, [id_user]);

  return (
    <>
      {state_button ? (
        <FcLike
          className="liked"
          key={503}
          onClick={() => {
            setState_button(false);
            setState_Like(state_likes - 1);
            handlerLike(id_post);
          }}
          size={30}
        />
      ) : (
        <AiOutlineHeart
          key={504}
          onClick={() => {
            setState_Like(state_likes + 1);
            setState_button(true);
            handlerLike(id_post);
          }}
          size={30}
        />
      )}
      <span>{state_likes}</span>
    </>
  );
}
