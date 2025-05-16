import { useNavigate } from "react-router-dom";

import type { ReplyApiType } from "../../types";

import * as S from "./styles";

type Comment = {
  comment: ReplyApiType;
};

function ReplyModel({ comment }: Comment) {
  const navigate = useNavigate();

  const visitProfile = () => {
    navigate(`/${comment.userat}/${comment.user}/profile`);
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
            <S.PostUserInteract hovercolor="249, 54, 128, 0.4"></S.PostUserInteract>
          </S.PostInteract>
        </S.PostAttachment>
      </S.PostInfo>
    </S.Container>
  );
}

export default ReplyModel;
