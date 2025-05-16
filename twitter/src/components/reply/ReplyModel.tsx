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
      </S.PostInfo>
    </S.Container>
  );
}

export default ReplyModel;
