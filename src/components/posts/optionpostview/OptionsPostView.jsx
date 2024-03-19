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
import FormReportView from "./FormReportView";
import PostPreviewView from "../postpreview/PostPreviewView";

export default function OptionsPostView({ post }) {
  const { deletePost } = usePost();
  const { setInfo } = useContext(UserContext);
  const { _id } = decryptDate(useSelector((state) => state.user.userInfo));
  const [options_view, setOptions_View] = useState(false);
  const [formReportView, setReportView] = useState(false);
  const [posteditview, setPosteditview] = useState(false);

  const handlerDeletePost = () => {
    deletePost((err) => {
      if (err) {
        return setInfo(err.message);
      }
      setOptions_View(false);
      setInfo(["La publicacion ha sido eliminada"]);
    }, post._id);
  };
  const handlerArchivePost = () => {};

  return (
    <>
      <BiDotsHorizontalRounded
        onClick={() => {
          setOptions_View(true);
        }}
        className="list_options_post"
        size={25}
      />

      {options_view ? (
        <div
          className="container_filter"
          onClick={() => {
            setOptions_View(false);
          }}
        >
          <div className="box-options-post">
            <div className="box_back">
              <PiArrowLeftBold
                className="back_feed_main"
                onClick={() => {
                  setOptions_View(false);
                }}
                size={20}
              />
            </div>
            <hr className="hr_option_post" />
            <div
              className="item_option_post item_denunciar"
              onClick={() => {
                setReportView(true);
                setOptions_View(false);
              }}
            >
              Denunciar
            </div>

            {post.author._id === _id || post.author === _id ? (
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

                <div
                  className="item_option_post"
                  onClick={() => {
                    setOptions_View(false);
                    setPosteditview(true);
                  }}
                >
                  Editar
                </div>

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

      {formReportView ? (
        <div className="container_filter">
          <FormReportView
            actionSend={() => {
              setOptions_View(false);
              setReportView(false);
            }}
            id_post={post._id}
          />
        </div>
      ) : (
        <></>
      )}

      {posteditview ? (
        <div className="container_filter">
          <PostPreviewView
            post={post}
            modeEdit={true}
            actionClose={() => {
              setOptions_View(true);
              setPosteditview(false);
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
