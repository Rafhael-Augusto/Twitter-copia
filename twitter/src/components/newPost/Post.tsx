import { useNavigate } from "react-router-dom";

import * as S from "./styles";
import axios from "axios";
import API_BASE_URL from "../../config/api";

type PostApi = {
  post_info: {
    id: number;
    text: string;
    attachment: string;
    comments: number;
    likes: number;
    views: number;
    created_at: number;
    user: number;
    username: string;
    user_at: string;
    post_edited: boolean;
  };
};

function Post({ post_info }: PostApi) {
  const navigate = useNavigate();

  const addViewToPost = () => {
    axios
      .patch(`${API_BASE_URL}/posts/${post_info.id}/`, {
        views: post_info.views + 1,
      })
      .then((res) => {
        console.log("Post atualizado", res.data);
      })
      .catch((res) => {
        console.error("Erro na atualizacao do post", res);
      });
  };

  const OpenPost = () => {
    navigate(`/${post_info.user_at}/status/${post_info.user}/${post_info.id}`);

    addViewToPost();
  };

  return (
    <>
      <S.Container onClick={OpenPost}>
        <S.ProfileInfo>
          <S.ProfilePicture
            src="https://i.pinimg.com/736x/d1/70/99/d17099bc26cf4cb9db8fbef0d6d6f8ca.jpg"
            alt="Profile Picture"
          />
          <div style={{ position: "relative" }}>
            <S.UserName>{post_info.username}</S.UserName>
            <S.EditedPost
              style={{ display: post_info.post_edited ? "block" : "none" }}
            >
              <span style={{ position: "absolute" }}>(editado)</span>
            </S.EditedPost>
            <S.OpenOptions>. . .</S.OpenOptions>
          </div>
        </S.ProfileInfo>

        <S.PostInfo>
          <S.PostText>{post_info.text}</S.PostText>
          <S.PostAttachment>
            {post_info.attachment ? (
              <img
                style={{ marginTop: "4px" }}
                loading="lazy"
                src={post_info.attachment}
                alt="Post Image"
              />
            ) : (
              ""
            )}

            <S.PostInteract>
              <S.PostUserInteract hovercolor="29, 146, 227, 0.4">
                <div style={{ position: "relative" }}>
                  <img src="/message.svg" alt="Post Comments" />
                </div>
                <span>{post_info.comments}</span>
              </S.PostUserInteract>
              <S.PostUserInteract hovercolor="249, 54, 128, 0.4">
                <div style={{ position: "relative" }}>
                  <img src="/heart.svg" alt="Like Post" />
                </div>
                <span>{post_info.likes}</span>
              </S.PostUserInteract>
              <S.PostUserInteract hovercolor="0, 186, 124, 0.4">
                <div style={{ position: "relative" }}>
                  <img src="/eye.svg" alt="Post Views" />
                </div>
                <span>{post_info.views}</span>
              </S.PostUserInteract>
              <S.PostUserInteract>
                <div style={{ position: "relative" }}>
                  <img src="/bookmark.svg" alt="Save post" />
                </div>
              </S.PostUserInteract>
            </S.PostInteract>
          </S.PostAttachment>
        </S.PostInfo>
      </S.Container>
    </>
  );
}

export default Post;
