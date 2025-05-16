import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: transparent;

  width: 100%;

  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.04);
  }

  cursor: pointer;
`;

export const ProfileInfos = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
