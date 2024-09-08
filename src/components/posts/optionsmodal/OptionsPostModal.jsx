/* eslint-disable react/prop-types */
import "./optionspostview.css";
import { PiArrowLeftBold } from "react-icons/pi";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";

import usePost from "../../../hooks/usePost";
import { UserContext } from "../../../context/userContext";
import ReportModal from "./ReportModal";
import PostPreviewView from "../postpreview/PostPreviewView";

export default function OptionsPostModal({ post }) {
  const { id } = useSelector((state) => state.user.userInfo);
  const { setInfo } = useContext(UserContext);
  const [optionsView, setOptionsView] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [posteditview, setPosteditview] = useState(false);
  const { deletePost } = usePost();

  const handlerDeletePost = () => {
    deletePost((err) => {
      if (err) {
        return setInfo([err.message]);
      }
      setOptionsView(false);
    }, post.id);
  };

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
                className="item_option_post item-danger"
                onClick={() => {
                  setOptionsView(false);
                  setReportModal(true);
                }}
              >
                Reportar
              </div>

              {post.authorId === id ? (
                <>
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
                    className="item_option_post item-danger"
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

      {reportModal ? (
        <div className="container_filter">
          <ReportModal
            id_post={post._id}
            closeView={() => {
              setReportModal(false);
            }}
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
