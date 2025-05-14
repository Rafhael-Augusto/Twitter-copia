import styled from "styled-components";

export const Container = styled.div`
  width: 200px;
  height: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: start;

  margin: 64px;

  height: 300px;
  width: 300px;

  background-color: transparent;
  border: 1px solid #303336;
  border-radius: 16px;
`;

export const Title = styled.h2`
  align-self: flex-start;
  margin: 12px 0 0 16px;
`;

export const ProfileList = styled.div`
  background-color: transparent;

  height: 100%;
  width: 100%;

  margin-top: 12px;

  scrollbar-color: #888 transparent;
  scrollbar-width: none;

  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 100%;
`;

export const Profile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: transparent;

  width: 100%;
  margin-bottom: 8px;
  padding: 8px;

  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.04);
  }

  cursor: pointer;
`;

export const UserProfilePicture = styled.img`
  width: 40px;
  height: 40px;

  margin-right: 8px;
  margin-left: 10px;
  border-radius: 50%;
`;

export const UserProfileUsername = styled.h3`
  background-color: transparent;

  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

export const UserProfileAt = styled.h2`
  background-color: transparent;
  color: rgba(255, 255, 255, 0.2);

  font-size: 12px;
`;

export const FollowButton = styled.button`
  height: 28px;
  width: 62px;

  background-color: #fff;
  color: #000000;

  border-radius: 32px;
  border: none;

  font-weight: bolder;
  font-size: 14px;

  margin-right: 12px;

  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }

  cursor: pointer;
`;

export const ProfileInfos = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
