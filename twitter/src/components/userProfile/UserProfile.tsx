import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import LeftSide from "../leftSide/LeftSide";
import WhoToFollow from "../whoToFollow/WhoToFollow";
import ReplyModel from "../reply/ReplyModel";
import Post from "../newPost/Post";
import EditProfile from "../editProfile/EditProfile";

import API_BASE_URL from "../../config/api";
import type { PostApiType, ProfileApiType, ReplyApiType } from "../../types";

import * as S from "./styles";
import PageLoading from "../loadingPage/LoadingPage";

function UserProfile() {
  const navigate = useNavigate();

  const [isInPost, setIsInPost] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [posts, setPosts] = useState<[PostApiType]>();
  const [userProfile, setUserProfile] = useState<ProfileApiType>();

  const [userInfo, setUserInfo] = useState<ProfileApiType>();

  const [loading, setLoading] = useState(true);

  const [userReplies, setUserReplies] = useState<[ReplyApiType]>();

  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, postsRes, repliesRes, userProfileRes] =
          await Promise.all([
            axios.get(
              `${API_BASE_URL}/profiles/${localStorage.getItem("userId")}/`,
              {
                headers: {
                  Authorization: `Token ${localStorage.getItem("token")}`,
                },
              }
            ),
            axios.get(`${API_BASE_URL}/posts/`, {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }),
            axios.get(`${API_BASE_URL}/replies/`, {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }),
            axios.get(`${API_BASE_URL}/profiles/${userId}/`, {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }),
          ]);

        setUserInfo(userRes.data);
        setPosts(postsRes.data);
        setUserReplies(repliesRes.data);
        setUserProfile(userProfileRes.data);
      } catch (err) {
        console.log("Erro ao carregar perfil", err);
      } finally {
        console.log("carregado");
        setLoading(false);
      }
    };

    setLoading(true);
    fetchData();
  }, [userId]);

  const followUser = async () => {
    if (!userInfo) return;

    const isFollowing = userInfo.following_ids.includes(Number(userId));
    const updatedList = isFollowing
      ? userInfo.following_ids.filter((user) => user !== Number(userId))
      : [...userInfo.following_ids, Number(userId)];

    try {
      await axios.patch(
        `${API_BASE_URL}/profiles/${userInfo.id}/`,
        {
          following_ids: updatedList,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );

      const res = await axios.get(`${API_BASE_URL}/profiles/${userInfo.id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      setUserInfo(res.data);
    } catch (err) {
      console.error("Erro ao seguir/deixar de seguir", err);
    }
  };

  const handleClick = () => {
    if (userInfo?.id === Number(userId)) {
      setIsEditOpen(true);
    } else {
      followUser();
    }
  };

  const changeButtonText = () => {
    if (userInfo?.id === Number(userId)) {
      return "Editar perfil";
    } else if (
      userInfo?.id !== Number(userId) &&
      !userInfo?.following_ids.includes(Number(userId))
    ) {
      return "Seguir perfil";
    } else if (userInfo?.following_ids.includes(Number(userId))) {
      return "Seguindo perfil";
    }
  };

  const returnHome = () => {
    navigate("/home");
  };

  const postsStyle = {
    borderBottom: isInPost ? "2px solid #1D90E0" : "2px solid #303336",
  };

  const mediaStyle = {
    borderBottom: !isInPost ? "2px solid #1D90E0" : "2px solid #303336",
  };

  return (
    <S.Background>
      <LeftSide />
      {loading ? (
        <PageLoading />
      ) : (
        <>
          {" "}
          <S.Container>
            <S.ContainerDiv>
              <S.Header>
                <div>
                  <S.ReturnArrow onClick={returnHome}>
                    <img src="/arrow-left.svg" alt="Return Arrow" />
                    <S.UserInteractHover
                      toppos={60}
                      hovercolor="255, 255, 255, 0.3"
                    />
                  </S.ReturnArrow>
                  <S.UserInfos>
                    <S.Username>{userProfile?.username}</S.Username>
                    <S.PostCounter>
                      {userProfile?.posts_made} posts
                    </S.PostCounter>
                  </S.UserInfos>
                </div>
              </S.Header>
              <S.Wrapper>
                <S.ProfileBanner>
                  <div>
                    <img src="/dog.jpeg" alt="Profile Banner" />
                  </div>
                  <S.EditProfileButton onClick={() => handleClick()}>
                    {changeButtonText()}
                  </S.EditProfileButton>
                </S.ProfileBanner>
                <S.ProfilePicture>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjUSXHcFx8iQmHoULViI9o7QzLJlH95nEfIA&s"
                    alt="Profile Picture"
                  />
                </S.ProfilePicture>

                <S.ProfileInfos>
                  <S.Username>{userProfile?.username}</S.Username>
                  <S.ProfileAt>@{userProfile?.userat}</S.ProfileAt>
                  <S.Bio
                    style={{ display: userProfile?.bio ? "flex" : "none" }}
                  >
                    <span>{userProfile?.bio}</span>
                  </S.Bio>
                  <S.DateInfo
                    style={{ marginTop: !userProfile?.bio ? "8px" : "0" }}
                  >
                    <S.CalendarIcon src="/calendar.svg" />
                    <S.DateJoined>{userProfile?.created_at}</S.DateJoined>
                  </S.DateInfo>

                  <S.DateInfo>
                    <S.Follow>
                      <strong>{userProfile?.following_ids.length}</strong>{" "}
                      Seguindo
                    </S.Follow>
                    <S.Follow>
                      <strong>{userProfile?.followers_ids.length}</strong>{" "}
                      Seguidores
                    </S.Follow>
                  </S.DateInfo>
                </S.ProfileInfos>

                <S.SelectButtonDiv>
                  <S.SelectButton
                    onClick={() => setIsInPost(true)}
                    style={postsStyle}
                  >
                    Posts
                  </S.SelectButton>
                  <S.SelectButton
                    onClick={() => setIsInPost(false)}
                    style={mediaStyle}
                  >
                    Comentarios
                  </S.SelectButton>
                </S.SelectButtonDiv>

                {isInPost && posts
                  ? posts.map((post) => {
                      if (post.user === Number(userId)) {
                        return (
                          <div
                            style={{
                              border: "2px solid #303336",
                              borderTop: "none",
                            }}
                            key={post.id}
                          >
                            <Post item={post}></Post>
                          </div>
                        );
                      }
                    })
                  : ""}

                {!isInPost && userReplies
                  ? userReplies.map((reply) => {
                      if (reply.user === Number(userId)) {
                        return (
                          <div key={reply.id}>
                            <ReplyModel comment={reply}></ReplyModel>
                          </div>
                        );
                      }
                    })
                  : ""}
              </S.Wrapper>
            </S.ContainerDiv>

            <EditProfile
              isEditOpen={isEditOpen}
              setIsEditOpen={setIsEditOpen}
            />
          </S.Container>
        </>
      )}
      <WhoToFollow />
    </S.Background>
  );
}

export default UserProfile;
