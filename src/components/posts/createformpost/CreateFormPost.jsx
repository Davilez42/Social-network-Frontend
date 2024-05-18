import { useState, useEffect } from "react";
import "./createformpost.css";
import usePost from "../../../hooks/usePost";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import { PiArrowLeftBold } from "react-icons/pi";
import { IoMdImages } from "react-icons/io";
import { IoAddSharp } from "react-icons/io5";
import { BsSend } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";

// eslint-disable-next-line react/prop-types
export default function CreateFormPosts({ actionClose }) {
  const usenavigate = useNavigate();
  const { sendPost } = usePost(usenavigate);
  const [urlPreviewMedia, setUrlPreviewMedia] = useState([]);
  const [text, setText] = useState("");
  const { setInfo } = useContext(UserContext);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const handlerSendPost = () => {
    if (text.trim() !== "" || mediaFiles.length !== 0) {
      setLoading(true);
      sendPost(
        (err) => {
          setLoading(false);
          if (err) {
            return setInfo([err.message]);
          }
          actionClose();
        },
        text,
        mediaFiles
      );
    } else {
      setInfo(["Debes de ingresar un texto o subir una imagen"]);
    }
  };

  useEffect(() => {}, [urlPreviewMedia]);
  return (
    <div className="container_filter">
      <div className="container-form-create-post">
        <div className="header-modal">
          <PiArrowLeftBold
            className="header-modal__icon-back-modal"
            onClick={() => {
              actionClose(false);
            }}
            size={24}
          />
          <div className="header-modal__box-tittle">
            <p>Publicar</p>
          </div>
        </div>

        <div className="container_data">
          <textarea
            type="text"
            className="input-field input_text_post"
            placeholder="Escribe algo aqui ..."
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
        </div>

        <div className="container-posts-preview">
          <IoMdImages className="icon-images" size={200} />

          {urlPreviewMedia.map((media, ind) => {
            return (
              <div key={ind} className="card-media-preview">
                <div className="block-effect-preview">
                  <TiDelete
                    className="cursor-pointer"
                    onClick={() => {
                      setMediaFiles([
                        ...mediaFiles.slice(0, ind),
                        ...mediaFiles.slice(ind + 1),
                      ]);
                      setUrlPreviewMedia([
                        ...urlPreviewMedia.slice(0, ind),
                        ...urlPreviewMedia.slice(ind + 1),
                      ]);
                    }}
                    size={34}
                  />
                </div>
                {media.type === "video" ? (
                  <video
                    loading="lazy"
                    key={ind}
                    src={media.url_preview}
                    controls
                    className="image_post_upload"
                  />
                ) : (
                  <img
                    key={ind}
                    loading="lazy"
                    src={media.url_preview}
                    className="image_post_upload"
                    alt=""
                  />
                )}
              </div>
            );
          })}
          <div className="cardAdd">
            <div className="bg-gray">
              <label className="label-input-file" htmlFor="input_file"></label>
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
                  setMediaFiles([...mediaFiles, file]);
                }}
              />
              <IoAddSharp className="icon-add" size={70} />
            </div>
          </div>
        </div>
        <div
          className="button-send"
          onClick={() => {
            handlerSendPost();
          }}
        >
          {loading ? <span className="loading2"></span> : <BsSend size={30} />}
        </div>
      </div>
    </div>
  );
}
