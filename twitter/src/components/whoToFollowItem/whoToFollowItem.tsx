import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import API_BASE_URL from "../../config/api";
import type { ProfileApiType } from "../../types";

import * as S from "./styles";

type ApiType = {
  item: ProfileApiType;
};

function WhoToFollowItem({ item }: ApiType) {
  const navigate = useNavigate();

  const [userToFollow, setUserToFollow] = useState<ProfileApiType>();
  const [userInfo, setUserInfo] = useState<ProfileApiType>();

  useEffect(() => {
    const fetchInfos = async () => {
      try {
        const [userRes, userToFollowRes] = await Promise.all([
          axios.get(
            `${API_BASE_URL}/profiles/${localStorage.getItem("userId")}/`,
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          ),
          axios.get(`${API_BASE_URL}/profiles/${item.id}`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        setUserInfo(userRes.data);
        setUserToFollow(userToFollowRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    const interval = setInterval(() => fetchInfos(), 1000);
    return () => clearInterval(interval);
  }, []);

  const VisitProfile = (userat: string, id: number) => {
    navigate(`/${userat}/${id}/profile`);
  };

  const updateFollowers = async () => {
    try {
      if (
        userToFollow?.id &&
        userInfo &&
        !userInfo.following_ids.includes(userToFollow.id) &&
        userInfo.id !== item.id
      ) {
        const updatedList = [...userInfo.following_ids, userToFollow.id];
        const updatedFollowers = [...item.followers_ids, userInfo.id];

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
        await axios.patch(
          `${API_BASE_URL}/profiles/${item.id}/`,
          {
            followers_ids: updatedFollowers,
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );

        await axios
          .get(`${API_BASE_URL}/profiles/${userInfo.id}`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setUserInfo(res.data);
          });

        console.log("Usuário seguido");
      } else {
        console.log("Usuário já está sendo seguido.");
      }
    } catch (error) {
      console.error("Erro ao atualizar seguidores:", error);
    }
  };

  return (
    <S.Container>
      <S.ProfileInfos onClick={() => VisitProfile(item.userat, item.id)}>
        <S.UserProfilePicture src="/Logo.jpg" />
        <div>
          <S.UserProfileUsername>{item.username}</S.UserProfileUsername>
          <S.UserProfileAt>@{item.userat}</S.UserProfileAt>
        </div>
      </S.ProfileInfos>
      <S.FollowButton
        style={{
          display: userInfo?.id === item.user ? "none" : "block",
          backgroundColor: !userInfo?.following_ids.includes(item.user)
            ? "#fff"
            : "gray",
        }}
        onClick={updateFollowers}
      >
        {!userInfo?.following_ids.includes(item.user) ? "Seguir" : "Seguindo"}
      </S.FollowButton>
    </S.Container>
  );
}

export default WhoToFollowItem;
