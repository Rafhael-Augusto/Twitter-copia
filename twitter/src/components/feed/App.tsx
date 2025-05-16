import { useEffect, useState } from "react";
import axios from "axios";

import CreateNewPost from "../createNewPost/NewPost";
import Post from "../newPost/Post";
import WhoToFollow from "../whoToFollow/WhoToFollow";
import LeftSide from "../leftSide/LeftSide";

import API_BASE_URL from "../../config/api";

import type { PostApiType, ProfileApiType } from "../../types";

import * as S from "./styles";

function App() {
  const [isForYou, setIsForYou] = useState(true);
  const [posts, setPosts] = useState<[PostApiType] | []>([]);

  const [userInfo, setUserInfo] = useState<ProfileApiType>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [userRes, postsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/profiles/1/`),
          axios.get(`${API_BASE_URL}/posts/`),
        ]);

        setUserInfo(userRes.data);
        setPosts(postsRes.data);
      } catch (err) {
        console.log("Erro ao pegar informacoes", err);
      } finally {
        console.log("Informacoes pegas com sucesso :D");
      }
    };

    fetchPosts();
    const interval = setInterval(fetchPosts, 1000);
    return () => clearInterval(interval);
  }, []);

  const forYouStyle = {
    borderBottom: isForYou ? "2px solid #1d90e0" : "1px solid #303336",
    color: isForYou ? "#fff" : "rgba(255, 255, 255, 0.5)",
  };

  const followingStyle = {
    borderBottom: !isForYou ? "2px solid #1d90e0" : "1px solid #303336",
    color: !isForYou ? "#fff" : "rgba(255, 255, 255, 0.5)",
  };

  return (
    <S.Container>
      <LeftSide />
      <S.FeedPosts>
        <S.ChangeFeed>
          <S.SelectedFeed onClick={() => setIsForYou(true)} style={forYouStyle}>
            Para você
          </S.SelectedFeed>
          <S.SelectedFeed
            onClick={() => setIsForYou(false)}
            style={followingStyle}
          >
            Seguindo
          </S.SelectedFeed>
        </S.ChangeFeed>

        <CreateNewPost />

        {isForYou && posts
          ? posts.map((item) => (
              <li key={item.id}>
                <Post item={item} />
              </li>
            ))
          : posts.map((item) => {
              if (userInfo?.following_ids.includes(item.user))
                return (
                  <li key={item.id}>
                    <Post item={item} />
                  </li>
                );
            })}
      </S.FeedPosts>
      <WhoToFollow />
    </S.Container>
  );
}

export default App;
