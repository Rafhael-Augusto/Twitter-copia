import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import axios from "axios";
import API_BASE_URL from "../../config/api";

type Comment = {
  comment: {
    id: number;
    text: string;
    attachment: string;
    likes: string;
    post: number;
    user_id: number;
    userat: string;
    username: string;
  };
};

function ReplyModel({ comment }: Comment) {
  const navigate = useNavigate();

  const visitProfile = () => {
    navigate(`/${comment.userat}/${comment.id}/profile`);
  };

  const likeComment = () => {
    axios

      .patch(`${API_BASE_URL}/replies/${comment.id}/`, {
        likes: comment.likes + 1,
      })
      .then((res) => {
        console.log("Post atualizado", res.data);
      })
      .catch((res) => {
        console.error("Erro na atualizacao do post", res);
      });
  };

  return (
    <S.Container>
      <S.ProfileInfo>
        <S.ProfilePicture
          onClick={visitProfile}
          src="https://i.pinimg.com/736x/d1/70/99/d17099bc26cf4cb9db8fbef0d6d6f8ca.jpg"
          alt="Profile Picture"
        />
        <S.UserName onClick={visitProfile}>{comment.username}</S.UserName>
      </S.ProfileInfo>

      <S.PostInfo>
        <S.PostText>{comment.text}</S.PostText>
        <S.PostAttachment>
          {comment.attachment ? (
            <img
              style={{ marginTop: "4px" }}
              loading="lazy"
              src={comment.attachment}
              alt="Post Image"
            />
          ) : (
            ""
          )}

          <S.PostInteract
            style={{ marginTop: comment.attachment ? "10px" : "0px" }}
          >
            <S.PostUserInteract hovercolor="249, 54, 128, 0.4">
              <div onClick={likeComment} style={{ position: "relative" }}>
                <img src="/heart.svg" alt="Like Post" />
                <S.UserInteractHover
                  toppos={70}
                  hovercolor="249, 54, 128, 0.4"
                />
              </div>
              <span>{comment.likes}</span>
            </S.PostUserInteract>
          </S.PostInteract>
        </S.PostAttachment>
      </S.PostInfo>
    </S.Container>
  );
}

export default ReplyModel;
