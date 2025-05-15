import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 30%;
  left: 35%;

  display: flex;
  justify-content: center;

  width: 25%;

  z-index: 8;
`;

export const Wrapper = styled.div`
  background-color: #000000;

  width: 100%;

  border-radius: 32px;
`;

export const ProfileInfo = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  height: 12px;

  padding: 8px;
  padding-top: 32px;
  margin-top: 32px;

  gap: 8px;

  background-color: transparent;
`;

export const ProfilePicture = styled.img`
  height: 42px;
  width: 42px;

  border-radius: 50%;
  margin-top: 3%;
`;

export const UserAt = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.3);
`;

export const Username = styled.h2`
  font-size: 16px;
  font-weight: bolder;
`;

export const PostText = styled.span`
  font-weight: normal;
  background-color: transparent;

  font-weight: 300;

  word-wrap: break-word;
  overflow-wrap: break-word;
`;

export const PostTextWrapper = styled.div`
  background-color: transparent;
  width: 80%;
  margin-left: 17.25%;
  margin-top: 1%;
`;

export const Background = styled.div`
  position: absolute;
  display: block;

  top: 0;
  left: 0;

  height: 100vh;
  width: 100vw;

  z-index: 7;

  background-color: rgba(255, 255, 255, 0.1);
`;

export const LoggedUserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  gap: 4.5%;
  height: 30%;

  padding-left: 8px;

  background-color: transparent;

  margin-top: 5%;
`;

export const ReplyText = styled.textarea`
  resize: none;
  background-color: transparent;

  width: 80%;
  height: 80%;

  border: none;
  padding: 8px;
  margin-top: 10%;

  font-size: 16px;
`;

export const ReplyButton = styled.button`
  height: 40%;
  width: 40%;

  border-radius: 32px;
  border: none;

  color: #000000;

  font-weight: bolder;
  font-size: 16px;

  padding: 8px;

  margin: 8px;
`;

export const ReplyDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 40%;
  width: 100%;
`;

export const MyCockDiv = styled.div`
  position: absolute;

  top: 38.45%;
  left: 7.5%;

  height: 14%;
  width: 1%;

  background-color: rgba(255, 255, 255, 0.1);
`;
