import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import LeftSide from "../leftSide/LeftSide";
import WhoToFollow from "../whoToFollow/WhoToFollow";
import NewReply from "../writeNewReply/WriteNewReply";
import ReplyModel from "../reply/ReplyModel";

import API_BASE_URL from "../../config/api";
import type { PostApiType, ReplyApiType, ProfileApiType } from "../../types";

import * as S from "./styles";

function ReadPost() {
  const navigate = useNavigate();

  const [postInfo, setPostInfo] = useState<PostApiType>();
  const [repliesInfo, setRepliesInfo] = useState<[ReplyApiType]>();
  const [date, setDate] = useState("");

  const [openMenu, setOpenMenu] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [newEditMessage, setNewEditedMessage] = useState("");

  const [openReplyMenu, setOpenReplyMenu] = useState(false);

  const [userInfo, setUserInfo] = useState<ProfileApiType>();

  const { postId } = useParams();

  const returnHome = () => {
    navigate("/home");
  };

  const visitProfile = () => {
    navigate(`/${postInfo?.user_at}/${postInfo?.user}/profile`);
  };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const [userRes, postRes, repliesRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/profiles/1/`),
          axios.get(`${API_BASE_URL}/posts/${postId}/`),
          axios.get(`${API_BASE_URL}/replies/`),
        ]);

        setUserInfo(userRes.data);
        setPostInfo(postRes.data);
        setRepliesInfo(repliesRes.data);
      } catch (err) {
        console.log("Erro ao buscar dados", err);
      } finally {
        if (postInfo) {
          const date = new Date(postInfo.created_at);
          const formatted = date.toLocaleDateString("pt-BR");
          setDate(formatted);
        }
      }
    };

    fetchInfo();
    const interval = setInterval(fetchInfo, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchPostInfo = () => {
      axios.get(`${API_BASE_URL}/posts/${postId}/`).then((res) => {
        setNewEditedMessage(res.data.text);
      });
    };

    fetchPostInfo();
  }, []);

  const likePost = () => {
    if (postInfo) {
      const updatePost = () => {
        if (userInfo && !userInfo.posts_liked.includes(postInfo.id)) {
          const updatedList = [...userInfo.posts_liked, postInfo.id];

          axios
            .patch(`${API_BASE_URL}/posts/${postId}/`, {
              likes: postInfo.likes + 1,
            })
            .then((res) => {
              console.log("Post atualizado", res.data);
            })
            .catch((res) => {
              console.error("Erro na atualizacao do post", res);
            });

          axios.get(`${API_BASE_URL}/posts/${postId}/`).then((res) => {
            setPostInfo(res.data);
          });

          axios.patch(`${API_BASE_URL}/profiles/${userInfo.id}/`, {
            posts_liked: updatedList,
          });
        } else if (userInfo && userInfo.posts_liked.includes(postInfo.id)) {
          const updatedList = [
            ...userInfo.posts_liked.filter((item) => item !== postInfo.id),
          ];
          axios.patch(`${API_BASE_URL}/posts/${postId}/`, {
            likes: postInfo.likes - 1,
          });

          axios.patch(`${API_BASE_URL}/profiles/${userInfo.id}/`, {
            posts_liked: updatedList,
          });
        }
      };
      updatePost();
    }
  };

  const openMenuEvent = () => {
    setOpenMenu((prev) => !prev);
  };

  const handleEditing = () => {
    setIsEditing((prev) => !prev);
    setOpenMenu(false);
  };

  const updatePost = () => {
    if (newEditMessage) {
      axios
        .patch(`${API_BASE_URL}/posts/${postId}/`, {
          text: newEditMessage,
          post_edited: true,
        })
        .then((res) => {
          console.log("Post atualizado", res.data);

          setIsEditing(false);
          setOpenMenu(false);
        })
        .catch((res) => {
          console.error("Erro na atualizacao do post", res);
        });
    }
  };

  const deletePost = () => {
    axios
      .delete(`${API_BASE_URL}/posts/${postId}/`, {})
      .then((res) => {
        console.log("Post deletado", res.data);

        setIsEditing(false);
        setOpenMenu(false);

        navigate("/home");
      })
      .catch((res) => {
        console.error("Erro ao deletar o post", res);
      });
  };

  const openReplyMenuHandle = () => {
    const change = () => {
      setOpenReplyMenu(true);
    };

    change();
  };

  return (
    <div>
      {openReplyMenu && (
        <NewReply
          postId={postId}
          openReplyMenu={openReplyMenu}
          setOpenReplyMenu={setOpenReplyMenu}
        />
      )}

      <S.Background>
        <LeftSide />

        <S.ScreenCancelButton
          style={{ display: openMenu ? "block" : "none" }}
          onClick={openReplyMenuHandle}
        />

        <S.Wrapper>
          <S.Div>
            <S.ReturnHome>
              <div
                onClick={returnHome}
                style={{ position: "absolute", marginLeft: "16px" }}
              >
                <img src="/arrow-left.svg" alt="Return arrow" />
                <S.UserInteractHover
                  toppos={62}
                  hovercolor="255, 255, 255, 0.3"
                />
              </div>

              <h1 style={{ marginLeft: "64px" }}>Post</h1>
            </S.ReturnHome>
            <S.Container>
              <S.ProfileInfo>
                <S.ProfilePicture
                  onClick={visitProfile}
                  src="https://i.pinimg.com/736x/d1/70/99/d17099bc26cf4cb9db8fbef0d6d6f8ca.jpg"
                  alt="Profile Picture"
                />
                <div>
                  <S.OptionsDiv>
                    <S.UserName onClick={visitProfile}>
                      {postInfo?.username}
                    </S.UserName>
                    <S.EditedPost
                      style={{
                        display: postInfo?.post_edited ? "block" : "none",
                      }}
                    >
                      <span style={{ position: "absolute" }}>(editado)</span>
                    </S.EditedPost>
                    <S.OpenOptions onClick={openMenuEvent}>
                      <span>. . .</span>
                      <S.UserInteractHover
                        toppos={78}
                        leftpos={97.8}
                        hovercolor="29, 146, 227, 0.4"
                      />
                    </S.OpenOptions>
                    <S.SelectionMenu
                      style={{
                        display: openMenu ? "flex" : "none",
                      }}
                    >
                      <S.ActionsContainer>
                        <S.ActionDecorations
                          onClick={handleEditing}
                          style={{
                            backgroundColor: isEditing
                              ? "rgba(255, 255, 255, 0.08)"
                              : "",
                          }}
                        >
                          <S.ActionImage src="/pencil.svg" />
                          <S.ActionButton style={{ color: "#fff" }}>
                            Editar
                          </S.ActionButton>
                        </S.ActionDecorations>

                        <S.ActionDecorations>
                          <S.ActionImage src="/trash.svg" />
                          <S.ActionButton onClick={deletePost}>
                            Excluir
                          </S.ActionButton>
                        </S.ActionDecorations>
                      </S.ActionsContainer>
                    </S.SelectionMenu>
                  </S.OptionsDiv>
                  <S.UserAt onClick={visitProfile}>
                    @{postInfo?.user_at}
                  </S.UserAt>
                </div>
              </S.ProfileInfo>

              <S.PostInfo>
                <S.PostText style={{ display: isEditing ? "none" : "block" }}>
                  {postInfo?.text}
                </S.PostText>
                <S.EditedMessageInput
                  style={{ display: !isEditing ? "none" : "block" }}
                  maxLength={200}
                  placeholder="Nova mensagem"
                  onChange={(e) => setNewEditedMessage(e.target.value)}
                  value={newEditMessage}
                ></S.EditedMessageInput>
                <S.ContinueButtonsContainer
                  style={{ display: isEditing ? "flex" : "none" }}
                >
                  <S.ContinueButton onClick={updatePost}>
                    Salvar
                  </S.ContinueButton>
                  <S.ContinueButton onClick={() => setIsEditing(false)}>
                    Cancelar
                  </S.ContinueButton>
                </S.ContinueButtonsContainer>
                <S.PostAttachment>
                  {postInfo?.attachment ? (
                    <img
                      style={{ marginTop: "4px" }}
                      loading="lazy"
                      src={postInfo?.attachment}
                      alt="Post Image"
                    />
                  ) : (
                    ""
                  )}
                  <S.TimePosted>{date}</S.TimePosted>
                  <S.PostInteract>
                    <S.PostUserInteract
                      onClick={openReplyMenuHandle}
                      hovercolor="29, 146, 227, 0.4"
                    >
                      <div style={{ position: "relative" }}>
                        <img src="/message.svg" alt="Post Comments" />
                        <S.UserInteractHover
                          toppos={62}
                          hovercolor="29, 146, 227, 0.4"
                        />
                      </div>
                      <span>{postInfo?.comments}</span>
                    </S.PostUserInteract>
                    <S.PostUserInteract hovercolor="249, 54, 128, 0.4">
                      {postInfo ? (
                        <div
                          onClick={likePost}
                          style={{ position: "relative" }}
                        >
                          <img
                            src={
                              userInfo?.posts_liked.includes(postInfo.id)
                                ? "/fullHeart.png"
                                : "/heart.svg"
                            }
                            alt="Like Post"
                          />
                          <S.UserInteractHover
                            toppos={62}
                            hovercolor="249, 54, 128, 0.4"
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      <span>{postInfo?.likes}</span>
                    </S.PostUserInteract>
                    <S.PostUserInteract hovercolor="0, 186, 124, 0.4">
                      <div style={{ position: "relative" }}>
                        <img src="/eye.svg" alt="Post Views" />
                        <S.UserInteractHover
                          toppos={62}
                          hovercolor="0, 186, 124, 0.4"
                        />
                      </div>
                      <span>{postInfo?.views}</span>
                    </S.PostUserInteract>
                    <S.PostUserInteract>
                      <div style={{ position: "relative" }}>
                        <img src="/bookmark.svg" alt="Save post" />
                        <S.UserInteractHover
                          toppos={62}
                          hovercolor="255, 249, 31, 0.6"
                        />
                      </div>
                    </S.PostUserInteract>
                  </S.PostInteract>
                </S.PostAttachment>
              </S.PostInfo>
            </S.Container>
            <S.Replies>
              {repliesInfo && postInfo
                ? repliesInfo.map((reply) => {
                    if (reply.post === postInfo.id) {
                      return (
                        <ul key={reply.id}>
                          <ReplyModel comment={reply} />
                        </ul>
                      );
                    }
                  })
                : ""}
            </S.Replies>
          </S.Div>
        </S.Wrapper>
        <WhoToFollow />
      </S.Background>
    </div>
  );
}

export default ReadPost;
