import React, { useEffect, useRef, useState, type ChangeEvent } from "react";
import axios from "axios";

import API_BASE_URL from "../../config/api";

import type { ProfileApiType } from "../../types";

import * as S from "./styles";

function CreateNewPost() {
  const fileRef = useRef<HTMLInputElement>(null);

  const [filePreview, setFilePreview] = useState<File | null>(null);
  const [textPreview, setTextPreview] = useState("");

  const [userInfo, setUserInfo] = useState<ProfileApiType>();

  const selectFile = () => {
    if (fileRef.current) {
      fileRef.current.value = "";
      fileRef.current.click();
    }
  };

  const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFilePreview(file);
    }
  };

  const removeFilePreview = () => {
    if (fileRef.current) {
      setFilePreview(null);
    }
  };

  const publishNewPost = (e: React.FormEvent) => {
    e.preventDefault();

    if (textPreview || filePreview) {
      axios.post(`${API_BASE_URL}/posts/`, {
        username: userInfo?.username,
        user_at: userInfo?.userat,
        user: userInfo?.id,
        profile: userInfo?.id,
        text: textPreview,
        attachments: filePreview,
      });

      console.log(userInfo);
      setFilePreview(null);
      setTextPreview("");

      updatePostsMade();
    }
  };

  useEffect(() => {
    const fetchUserInfo = () => {
      axios.get(`${API_BASE_URL}/profiles/4/`).then((res) => {
        setUserInfo(res.data);
      });
    };

    fetchUserInfo();
  }, []);

  const updatePostsMade = () => {
    if (userInfo) {
      axios
        .patch(`${API_BASE_URL}/profiles/${userInfo.user}/`, {
          user: userInfo.user,
          id: userInfo.id,
          userat: userInfo.userat,
          posts_made: Number(userInfo.posts_made) + 1,
        })
        .then((res) => {
          console.log("Perfil atualizado", res);
        })
        .catch((res) => {
          console.log("Erro na atualizacao do perfil", res);
        });
    }
  };

  return (
    <S.Form onSubmit={(e) => publishNewPost(e)}>
      <S.PostInfos>
        <S.ProfilePicture src="https://i.pinimg.com/736x/d1/70/99/d17099bc26cf4cb9db8fbef0d6d6f8ca.jpg" />
        <S.InputText
          maxLength={200}
          placeholder="Nova publicação"
          onChange={(e) => setTextPreview(e.target.value)}
          value={textPreview}
        ></S.InputText>
      </S.PostInfos>

      {filePreview ? (
        <S.DivPreview>
          <S.ImagePreview
            src={URL.createObjectURL(filePreview)}
            alt="Image Preview"
          />
          <S.RemovePreviewImage src="x.svg" onClick={removeFilePreview} />
        </S.DivPreview>
      ) : (
        ""
      )}

      <S.AddAttachment>
        <input
          accept=".png,.jpg,.jpeg,.mp4,.gif"
          onChange={fileSelected}
          style={{ display: "none" }}
          ref={fileRef}
          type="file"
        />
        <div onClick={selectFile} style={{ position: "relative" }}>
          <img src="/image.svg" alt="Select Media" />
          <S.UserInteractHover hovercolor="29, 146, 227, 0.4" />
        </div>
        <S.Post
          style={{
            backgroundColor:
              textPreview || filePreview ? "rgb(245, 238, 238)" : "gray",
            cursor: textPreview || filePreview ? "pointer" : "default",
          }}
        >
          Post
        </S.Post>
      </S.AddAttachment>
    </S.Form>
  );
}

export default CreateNewPost;
