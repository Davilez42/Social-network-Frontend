import "./mainviewposts.css";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { GoBookmark } from "react-icons/go";
import ViewComments from "../viewcomments/ViewComments.jsx";
import { useNavigate } from "react-router-dom";
import ButtonLike from "../buttonlike/ButtonLike.jsx";
export default function MainViewPost({ posts, info_author = true }) {
  const usenavigate = useNavigate();

  return (
    <>
      <div className="container-posts">
        {posts.length !== 0 ? (
          posts.map((post, ind) => (
            <div key={ind} className="card_post">
              <div
                className="info_owner"
                onClick={() => {
                  usenavigate(`/home/profile/view/${post.id_author}`);
                }}
              >
                {info_author ? (
                  <>
                    <img
                      loading="lazy"
                      className="avatar avatar_post_owner"
                      src={post.url_avatar_author}
                      alt=""
                    />
                    <p>{post.username_author}</p>
                  </>
                ) : (
                  <></>
                )}
                <BiDotsHorizontalRounded
                  className="list_options_post"
                  size={30}
                />
              </div>

              <div className="description_post">
                <p>{post.text}</p>
              </div>

              <div className="container_media_post">
                <div
                  className="preview_media"
                  style={
                    post.media_links.length === 1
                      ? { justifyContent: "center" }
                      : {}
                  }
                >
                  {post.media_links.map((media, ind) => {
                    if (!media) return <></>;
                    const format = media.split(".").pop().toLowerCase();
                    if (format === "mp4") {
                      return (
                        <video
                          loading="lazy"
                          key={ind}
                          src={media}
                          controls
                          className="video_media"
                        />
                      );
                    }
                    if (["jpeg", "jpg", "png"].includes(format)) {
                      return (
                        <img
                          key={ind}
                          loading="lazy"
                          src={media}
                          className="image_media"
                          alt=""
                        />
                      );
                    }
                    return <></>;
                  })}
                </div>
              </div>
              <div className="info_post_options">
                <div className="option">
                  <ButtonLike likes_post={post.likes} id_post={post.id_post} />
                </div>
                <div className="option">
                  <ViewComments
                    key={501}
                    id_post={post.id_post}
                    count_comments={post.countcomments}
                  />
                </div>
                <div className="option option_saved_post">
                  <GoBookmark size={25} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <span className="loader"></span>
        )}
      </div>
    </>
  );
}
