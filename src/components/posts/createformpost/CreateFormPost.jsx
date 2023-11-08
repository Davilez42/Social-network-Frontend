import { useState } from "react";
import "./createformpost.css";
import { BiNavigation } from "react-icons/bi";
import usePost from "../../../hooks/usePost";
export default function CreateFormPosts() {
  const { sendPost } = usePost();
  const [images, setImage] = useState([]);
  const [text, setText] = useState("");
  const [stateContainerPost, setStateContainerPost] = useState("none");

  const handlerSendPost = () => {
    sendPost({
      id_user: "1",
      url_image:
        "https://images.unsplash.com/photo-1694428348190-4b84337af29c?auto=format&fit=crop&q=80&w=1527&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text,
      likes: 1923,
      id_post: 1,
      url_avatar_autor:
        "https://images.unsplash.com/photo-1652519728126-18439b8560da?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8fA%3D%3D",
      username_owner: "davielzzzz",
    });
  };

  return (
    <>
      <div className="container-form-create-post">
        <img src="" alt="" />
        <div className="container_data">
          <input
            type="text"
            className="input-field input_text_post"
            placeholder="Publica algo aqui...."
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
          <BiNavigation size={30} onClick={handlerSendPost} />
        </div>
        <div className="container_inputs_file_post ">
          <label
            className="label_input_file  input_image_post"
            htmlFor="input_file"
          >
            Selecciona un foto
          </label>
          <input
            id="input_file"
            type="file"
            className="input-field input-file"
            onChange={(event) => {
              const file = event.target.files[0];
              setStateContainerPost("");
              setImage([...images, URL.createObjectURL(file)]);
            }}
          />
          <div
            className="container_images_posts"
            style={{ display: stateContainerPost }}
          >
            {images.map((image, ind) => (
              <img key={ind} className="image_post_upload" src={image} alt="" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
