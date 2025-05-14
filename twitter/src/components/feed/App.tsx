import { useEffect, useState } from "react";
import axios from "axios";

import CreateNewPost from "../createNewPost/NewPost";
import Post from "../newPost/Post";
import WhoToFollow from "../whoToFollow/WhoToFollow";
import API_BASE_URL from "../../config/api";

import * as S from "./styles";
import LeftSide from "../leftSide/LeftSide";

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

function App() {
  const [isForYou, setIsForYou] = useState(true);
  const [posts, setPosts] = useState<[PostApi] | []>([]);

  useEffect(() => {
    const fetchPosts = () => {
      axios.get(`${API_BASE_URL}/posts/`).then((res) => {
        setPosts(res.data);
      });
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
                <Post post_info={item} />
              </li>
            ))
          : ""}
      </S.FeedPosts>
      <WhoToFollow />
    </S.Container>
  );
}

export default App;
