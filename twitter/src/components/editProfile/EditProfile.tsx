import type React from "react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import axios from "axios";

import API_BASE_URL from "../../config/api";

import type { ProfileApiType } from "../../types";

import * as S from "./styles";
import { useParams } from "react-router-dom";

type Prop = {
  isEditOpen: boolean;
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditProfile({ isEditOpen, setIsEditOpen }: Prop) {
  const profilePictureRef = useRef<HTMLInputElement>(null);
  const profileBannerRef = useRef<HTMLInputElement>(null);

  const [PicturePreview, setPicturePreview] = useState<File | null>(null);
  const [BannerPreview, setBannerPreview] = useState<File | null>(null);

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const [userInfo, setUserInfo] = useState<ProfileApiType>();

  const { userId } = useParams();

  const openPicturePic = () => {
    if (profilePictureRef.current) {
      profilePictureRef.current.value = "";
      profilePictureRef.current.click();
    }
  };

  const openBannerPic = () => {
    if (profileBannerRef.current) {
      profileBannerRef.current.value = "";
      profileBannerRef.current.click();
    }
  };

  const PictureSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPicturePreview(file);
    }
  };

  const BannerSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setBannerPreview(file);
    }
  };

  const editProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const putProfile = () => {
      if (userInfo) {
        setUsername(userInfo.username);

        axios
          .patch(
            `${API_BASE_URL}/profiles/${userId}/`,
            {
              username: username ? username : userInfo.username,
              bio: bio,
            },
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            console.log("dados atualizados", res.data);
          })
          .catch((res) => {
            console.error("Erro na atualizacao de dados", res);
          });

        setTimeout(() => window.location.reload(), 2000);
      }
    };

    putProfile();
  };

  useEffect(() => {
    const fetchUserInfo = () => {
      axios
        .get(`${API_BASE_URL}/profiles/${userId}`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setUserInfo(res.data);

          setBio(res.data.bio);
        });
    };

    fetchUserInfo();
  }, [userId]);

  return (
    <S.Container style={{ display: isEditOpen ? "flex" : "none" }}>
      <S.EditContainer onSubmit={editProfile}>
        <S.Header>
          <div>
            <S.CloseButton onClick={() => setIsEditOpen(false)} src="/x.svg" />
            <S.EditProfileText>Editar perfil</S.EditProfileText>
          </div>

          <S.SaveButton>Salvar</S.SaveButton>
        </S.Header>

        <S.ProfileImages>
          <div style={{ position: "relative" }}>
            <input
              onChange={BannerSelected}
              ref={profileBannerRef}
              style={{ display: "none" }}
              type="file"
              accept=".png,.jpg,.jpeg,.mp4,.gif"
            />
            <S.ProfileBanner
              src={
                BannerPreview ? URL.createObjectURL(BannerPreview) : "/dog.jpeg"
              }
            />
            <S.AddImageImage onClick={openBannerPic} src="/add-image.svg" />
          </div>
          <div>
            <input
              onChange={PictureSelected}
              ref={profilePictureRef}
              style={{ display: "none" }}
              type="file"
              accept=".png,.jpg,.jpeg,.mp4,.gif"
            />
            <S.ProfilePicture
              src={
                PicturePreview
                  ? URL.createObjectURL(PicturePreview)
                  : "/dog.jpeg"
              }
            />
            <S.AddProfilePicture
              onClick={openPicturePic}
              src="/add-image.svg"
            />
          </div>
        </S.ProfileImages>

        <S.UsernameBio>
          <S.NewUsername
            maxLength={30}
            onChange={(e) => setUsername(e.target.value)}
            defaultValue={userInfo?.username}
            placeholder="Nome"
          ></S.NewUsername>
          <S.UserBio
            maxLength={120}
            onChange={(e) => {
              setBio(e.target.value);
            }}
            defaultValue={userInfo?.bio}
            placeholder="Bio"
          ></S.UserBio>
        </S.UsernameBio>
      </S.EditContainer>
    </S.Container>
  );
}

export default EditProfile;
