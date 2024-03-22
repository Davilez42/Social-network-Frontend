/* eslint-disable react/prop-types */
import "./optionspostview.css";
import { PiArrowLeftBold } from "react-icons/pi";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";

import { decryptDate } from "../../../helpers/encrypt";
import usePost from "../../../hooks/usePost";
import { UserContext } from "../../../context/userContext";
import FormReportView from "./FormReportView";
import PostPreviewView from "../postpreview/PostPreviewView";

export default function OptionsPostView({ post }) {
  const { deletePost } = usePost();
  const { setInfo } = useContext(UserContext);
  const { _id } = decryptDate(useSelector((state) => state.user.userInfo));
  const [optionsView, setOptionsView] = useState(false);
  const [formReportView, setReportView] = useState(false);
  const [posteditview, setPosteditview] = useState(false);

  const handlerDeletePost = () => {
    deletePost((err) => {
      if (err) {
        return setInfo(err.message);
      }
      setOptionsView(false);
      setInfo(["La publicacion ha sido eliminada"]);
    }, post._id);
  };
  const handlerArchivePost = () => {};

  return (
    <div className="block-options-post">
      <BiDotsHorizontalRounded
        className="cursor-pointer"
        onClick={() => {
          setOptionsView(true);
        }}
        size={25}
      />

      {optionsView ? (
        <div
          className="container_filter"
          onClick={() => {
            setOptionsView(false);
          }}
        >
          <div className="container-options-post-modal">
            <div className="header-modal">
              <PiArrowLeftBold
                className="header-modal__icon-back-modal"
                onClick={() => {
                  setOptionsView(false);
                }}
                size={20}
              />
            </div>

            <div className="box-options-post">
              <div
                className="item_option_post item_denunciar"
                onClick={() => {
                  setReportView(true);
                  setOptionsView(false);
                }}
              >
                Denunciar
              </div>

              {post.author._id === _id || post.author === _id ? (
                <>
                  <div
                    className="item_option_post"
                    onClick={() => {
                      handlerArchivePost();
                    }}
                  >
                    Archivar
                  </div>

                  <div
                    className="item_option_post"
                    onClick={() => {
                      setOptionsView(false);
                      setPosteditview(true);
                    }}
                  >
                    Editar
                  </div>

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
        </div>
      ) : (
        <></>
      )}

      {formReportView ? (
        <div className="container_filter">
          <FormReportView
            actionSend={() => {
              setOptionsView(false);
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
              setOptionsView(true);
              setPosteditview(false);
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
