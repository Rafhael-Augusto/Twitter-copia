import { useEffect, useState } from "react";
import axios from "axios";

import API_BASE_URL from "../../config/api";
import type { PostApiType, ProfileApiType } from "../../types";

import * as S from "./styles";

type ReplyProp = {
  openReplyMenu: boolean;
  setOpenReplyMenu: React.Dispatch<React.SetStateAction<boolean>>;
  postId?: string;
};

function NewReply({ openReplyMenu, setOpenReplyMenu, postId }: ReplyProp) {
  const [replyMessage, setReplyMessage] = useState("");

  const [postInfo, setPostInfo] = useState<PostApiType>();
  const [publisherInfo, setPublisherInfo] = useState<ProfileApiType>();

  const SubmitReply = () => {
    if (replyMessage) {
      axios
        .post(`${API_BASE_URL}/replies/`, {
          username: "Rafhael Augusto",
          userat: "Rafhael",
          user: 1,
          text: replyMessage,
          post: postId,
          profile: 1,
        })
        .then((res) => {
          console.log("Comentario enviado", res.data);
        })
        .catch((res) => {
          console.error("Erro no envio do comentario", res);
        });

      axios
        .patch(`${API_BASE_URL}/posts/${postId}/`, {
          comments: Number(postInfo?.comments) + 1,
        })
        .then((res) => {
          console.log("Post atualizado", res);
        })
        .catch((res) => {
          console.error("Erro na atualizacao do post", res);
        });

      setOpenReplyMenu(false);
    }
  };

  useEffect(() => {
    axios.get(`${API_BASE_URL}/posts/${postId}`).then((res) => {
      setPostInfo(res.data);
    });

    if (postInfo) {
      axios.get(`${API_BASE_URL}/profiles/${postInfo?.user}`).then((res) => {
        setPublisherInfo(res.data);
      });
    }
  }, [postId, postInfo, postInfo?.user]);

  return (
    <div>
      <S.Background
        style={{ display: openReplyMenu ? "block" : "none" }}
        onClick={() => setOpenReplyMenu(false)}
      />
      <S.Container style={{ display: openReplyMenu ? "block" : "none" }}>
        <S.Wrapper>
          <S.ProfileInfo>
            <S.ProfilePicture src="/Logo.jpg" />
            <S.Username>{publisherInfo?.username}</S.Username>
            <S.UserAt>@{publisherInfo?.userat}</S.UserAt>
          </S.ProfileInfo>
          <S.PostTextWrapper>
            <S.PostText>{postInfo?.text}</S.PostText>
          </S.PostTextWrapper>
          <S.LoggedUserInfo>
            <S.MyCockDiv />
            <S.ProfilePicture src="/Logo.jpg" />
            <S.ReplyText
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Publique sua resposta"
            ></S.ReplyText>
          </S.LoggedUserInfo>

          <S.ReplyDiv>
            <S.ReplyButton
              onClick={SubmitReply}
              style={{
                backgroundColor: replyMessage
                  ? "rgba(255, 255, 255, 0.9)"
                  : "rgba(255, 255, 255, 0.3)",
                cursor: replyMessage ? "pointer" : "default",
              }}
            >
              Responder
            </S.ReplyButton>
          </S.ReplyDiv>
        </S.Wrapper>
      </S.Container>
    </div>
  );
}

export default NewReply;
