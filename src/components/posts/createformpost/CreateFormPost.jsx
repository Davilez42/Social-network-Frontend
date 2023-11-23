import { useState, useEffect } from "react";
import "./createformpost.css";
import { BiNavigation } from "react-icons/bi";
import { FcPicture } from "react-icons/fc";
import usePost from "../../../hooks/usePost";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import { PiArrowLeftBold } from "react-icons/pi";

// eslint-disable-next-line react/prop-types
export default function CreateFormPosts({ actionClose }) {
  const usenavigate = useNavigate();
  const { sendPost } = usePost(usenavigate);
  const [urlPreviewMedia, setUrlPreviewMedia] = useState([]);
  const [text, setText] = useState("");
  const [stateContainerPost, setStateContainerPost] = useState("none"); //variable bandera para desplegar vista de preview
  const { setInfo, reload, setReload, url_avatar } = useContext(UserContext);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [canSend, setCanSend] = useState(true);

  const clearForm = () => {
    setMediaFiles([]);
    setCanSend(true);
    setUrlPreviewMedia([]);
    setText("");
    setReload(!reload);
    setStateContainerPost("none");
    actionClose(false);
  };

  const handlerSendPost = () => {
    if ((text.trim() !== "" || mediaFiles.length !== 0) && canSend) {
      setCanSend(false);
      sendPost(setInfo, text, mediaFiles, clearForm);
    } else {
      actionClose(false);
      setInfo(["Debes de ingresar un texto o subir un archivo"]);
    }
  };

  useEffect(() => {}, [text]);
  return (
    <>
      <div className="container_filter">
        <div className="container-form-create-post">
          <div
            className="back icon_back_create_view"
            onClick={() => {
              actionClose();
            }}
          >
            <PiArrowLeftBold size={30} />
          </div>
          <img src="" alt="" />
          <div className="container_data">
            <img src={url_avatar} alt="" className="avatar avatar_form_post" />

            <div className="container_inputs_form_posts">
              <input
                type="text"
                className="input-field input_text_post"
                placeholder="Publica algo aqui...."
                value={text}
                onChange={(event) => {
                  setText(event.target.value);
                }}
              />
            </div>
            <BiNavigation
              className="butto_send_post"
              size={30}
              onClick={handlerSendPost}
            />
          </div>

          <div
            className="container_images_posts"
            style={{ display: stateContainerPost }}
          >
            {urlPreviewMedia.map((media, ind) => {
              if (media.type === "video") {
                return (
                  <video
                    loading="lazy"
                    key={ind}
                    src={media.url_preview}
                    controls
                    className="image_post_upload"
                  />
                );
              }
              if (media.type === "image") {
                return (
                  <img
                    key={ind}
                    loading="lazy"
                    src={media.url_preview}
                    className="image_post_upload"
                    alt=""
                  />
                );
              }
            })}
          </div>
          <div className="options_form_posts">
            <label
              className="label_input_file  input_file_post"
              htmlFor="input_file"
            >
              <FcPicture size={30} />
              Foto/Video
            </label>
            <input
              id="input_file"
              type="file"
              className="input-field input-file"
              onChange={(event) => {
                const file = event.target.files[0];
                //VERIFICO EL TYPO DE ARCHIVO
                const type = file.type.split("/");
                if (type[0] !== "image" && type[0] !== "video") {
                  setInfo([
                    "Solo debes de subir archivos formato imagen o video",
                  ]);
                  return;
                }
                setUrlPreviewMedia([
                  ...urlPreviewMedia,
                  {
                    url_preview: URL.createObjectURL(file),
                    type: type[0],
                  },
                ]);
                setStateContainerPost("");
                setMediaFiles([...mediaFiles, file]);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
