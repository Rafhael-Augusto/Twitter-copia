import { useNavigate } from "react-router-dom";
import axios from "axios";

import API_BASE_URL from "../../config/api";

import type { PostApiType, ProfileApiType } from "../../types";

import * as S from "./styles";
import { useEffect, useState } from "react";
import PageLoading from "../loadingPage/LoadingPage";

type PostApi = {
  item: PostApiType;
};

function Post({ item }: PostApi) {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<ProfileApiType>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const [userRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/profiles/${item.profile}/`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        setUserInfo(userRes.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoaded(true);
      }
    };

    setLoaded(false);
    fetchUserInfo();
  }, []);

  const addViewToPost = () => {
    if (userInfo && !userInfo.posts_visited.includes(item.id)) {
      const updatedList = [...userInfo.posts_visited, item.id];

      axios
        .patch(
          `${API_BASE_URL}/posts/${item.id}/`,
          {
            views: item.views + 1,
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("Post atualizado", res.data);
        })
        .catch((res) => {
          console.error("Erro na atualizacao do post", res);
        });

      axios.patch(
        `${API_BASE_URL}/profiles/${userInfo.id}/`,
        {
          posts_visited: updatedList,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
    }
  };

  const OpenPost = () => {
    navigate(`/${item.user_at}/status/${item.user}/${item.id}`);

    addViewToPost();
  };

  return (
    <>
      {loaded ? (
        <S.Container onClick={OpenPost}>
          <S.ProfileInfo>
            <S.ProfilePicture src={userInfo?.profile} alt="Profile Picture" />
            <div style={{ position: "relative" }}>
              <S.UserName>{item.username}</S.UserName>
              <S.EditedPost
                style={{ display: item.post_edited ? "block" : "none" }}
              >
                <span style={{ position: "absolute" }}>(editado)</span>
              </S.EditedPost>
              <S.OpenOptions>. . .</S.OpenOptions>
            </div>
          </S.ProfileInfo>

          <S.PostInfo>
            <S.PostText>{item.text}</S.PostText>
            <S.PostAttachment>
              {item.attachment ? (
                <img
                  style={{ marginTop: "4px" }}
                  loading="lazy"
                  src={item.attachment}
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
                  <span>{item.comments}</span>
                </S.PostUserInteract>
                <S.PostUserInteract hovercolor="249, 54, 128, 0.4">
                  <div style={{ position: "relative" }}>
                    <img
                      src={
                        userInfo?.posts_liked.includes(item.id)
                          ? "/fullHeart.png"
                          : "/heart.svg"
                      }
                      alt="Like Post"
                    />
                  </div>
                  <span>{item.likes}</span>
                </S.PostUserInteract>
                <S.PostUserInteract hovercolor="0, 186, 124, 0.4">
                  <div style={{ position: "relative" }}>
                    <img src="/eye.svg" alt="Post Views" />
                  </div>
                  <span>{item.views}</span>
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
      ) : (
        <PageLoading />
      )}
    </>
  );
}

export default Post;
