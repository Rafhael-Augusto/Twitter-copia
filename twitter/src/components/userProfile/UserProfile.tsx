import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Post from "../newPost/Post";
import EditProfile from "../editProfile/EditProfile";
import API_BASE_URL from "../../config/api";

import * as S from "./styles";
import LeftSide from "../leftSide/LeftSide";
import WhoToFollow from "../whoToFollow/WhoToFollow";

type PostApi = {
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

type UserApi = {
  username: string;
  profile: string;
  banner: string;
  following: number;
  followers: number;
  user: number;
  userat: string;
  created_at: string;
  bio: string;
  following_ids: [];
  followers_ids: [];
  posts_made: number;
};

function UserProfile() {
  const navigate = useNavigate();

  const [isInPost, setIsInPost] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [posts, setPosts] = useState<[PostApi]>();
  const [userInfo, setUserInfo] = useState<UserApi>();

  const { userId } = useParams();

  const [loaded, setLoaded] = useState("false");

  useEffect(() => {
    const pageLoaded = () => {
      setLoaded("true");
    };

    const interval = setInterval(pageLoaded, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchUserInfo = () => {
      axios.get(`${API_BASE_URL}/profiles/${userId}`).then((res) => {
        setUserInfo(res.data);
      });
    };

    const fetchPosts = () => {
      axios.get(`${API_BASE_URL}/posts/`).then((res) => {
        setPosts(res.data);

        fetchUserInfo();
      });
    };

    setLoaded("false");
    fetchPosts();
  }, [userId]);

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
      <S.Container isloaded={loaded}>
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
                <S.Username>{userInfo?.username}</S.Username>
                <S.PostCounter>{userInfo?.posts_made} posts</S.PostCounter>
              </S.UserInfos>
            </div>
          </S.Header>
          <S.Wrapper>
            <S.ProfileBanner>
              <div>
                <img src="/dog.jpeg" alt="Profile Banner" />
              </div>
              <S.EditProfileButton onClick={() => setIsEditOpen(true)}>
                Editar perfil
              </S.EditProfileButton>
            </S.ProfileBanner>
            <S.ProfilePicture>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjUSXHcFx8iQmHoULViI9o7QzLJlH95nEfIA&s"
                alt="Profile Picture"
              />
            </S.ProfilePicture>

            <S.ProfileInfos>
              <S.Username>{userInfo?.username}</S.Username>
              <S.ProfileAt>@{userInfo?.userat}</S.ProfileAt>
              <S.Bio style={{ display: userInfo?.bio ? "flex" : "none" }}>
                <span>{userInfo?.bio}</span>
              </S.Bio>
              <S.DateInfo style={{ marginTop: !userInfo?.bio ? "8px" : "0" }}>
                <S.CalendarIcon src="/calendar.svg" />
                <S.DateJoined>{userInfo?.created_at}</S.DateJoined>
              </S.DateInfo>

              <S.DateInfo>
                <S.Follow>
                  <strong>{userInfo?.following_ids.length}</strong> Seguindo
                </S.Follow>
                <S.Follow>
                  <strong>{userInfo?.followers_ids.length}</strong> Seguidores
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
                Mídia
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
                        <Post post_info={post}></Post>
                      </div>
                    );
                  }
                })
              : ""}
          </S.Wrapper>
        </S.ContainerDiv>

        <EditProfile isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen} />
      </S.Container>
      <WhoToFollow />
    </S.Background>
  );
}

export default UserProfile;
