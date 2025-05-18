import { useEffect, useState } from "react";
import axios from "axios";

import API_BASE_URL from "../../config/api";
import type { PostApiType, ProfileApiType } from "../../types";

import * as S from "./styles";

type ReplyProp = {
  openReplyMenu: boolean;
  setOpenReplyMenu: (value: boolean) => void;
  postId?: string;
  userId?: string;
};

function NewReply({
  openReplyMenu,
  setOpenReplyMenu,
  postId,
  userId,
}: ReplyProp) {
  const [replyMessage, setReplyMessage] = useState("");

  const [postInfo, setPostInfo] = useState<PostApiType>();
  const [publisherInfo, setPublisherInfo] = useState<ProfileApiType>();

  const [userInfo, setUserInfo] = useState<ProfileApiType>();

  const SubmitReply = () => {
    if (replyMessage) {
      axios
        .post(
          `${API_BASE_URL}/replies/`,
          {
            username: userInfo?.username,
            userat: userInfo?.userat,
            user: userInfo?.id,
            text: replyMessage,
            post: postId,
            profile: userInfo?.id,
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("Comentario enviado", res.data);
        })
        .catch((res) => {
          console.error("Erro no envio do comentario", res);
        });

      axios
        .patch(
          `${API_BASE_URL}/posts/${postId}/`,
          {
            comments: Number(postInfo?.comments) + 1,
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        )
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
    const fetchAsync = async () => {
      try {
        const [postRes, profileRes, userRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/posts/${postId}`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
          axios.get(`${API_BASE_URL}/profiles/${Number(userId)}`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
          axios.get(
            `${API_BASE_URL}/profiles/${localStorage.getItem("userId")}`,
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          ),
        ]);

        setPostInfo(postRes.data);
        setPublisherInfo(profileRes.data);
        setUserInfo(userRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAsync();
  }, [postId, userId]);

  return (
    <div>
      <S.Background
        style={{ display: openReplyMenu ? "block" : "none" }}
        onClick={() => setOpenReplyMenu(false)}
      />
      <S.Container style={{ display: openReplyMenu ? "block" : "none" }}>
        <S.Wrapper>
          <S.ProfileInfo>
            <S.ProfilePicture src={publisherInfo?.profile} />
            <S.Username>{publisherInfo?.username}</S.Username>
            <S.UserAt>@{publisherInfo?.userat}</S.UserAt>
          </S.ProfileInfo>
          <S.PostTextWrapper>
            <S.PostText>{postInfo?.text}</S.PostText>
          </S.PostTextWrapper>
          <S.LoggedUserInfo>
            <S.ProfilePicture src={userInfo?.profile} />
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
