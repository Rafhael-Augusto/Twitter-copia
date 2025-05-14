import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  color: white;

  background-color: transparent;

  height: 100%;
`;

export const Background = styled.div`
  height: 100px;
  width: 240px;
`;

export const ButtonsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;

  height: 760px;
  background-color: transparent;
`;

export const LogoButton = styled.img`
  height: 24px;
  width: 24px;

  margin-top: 14px;

  cursor: pointer;

  margin-left: 18px;
`;

export const ButtonInteraction = styled.div`
  position: absolute;

  left: 5px;
  top: 1px;

  border-radius: 50%;

  height: 50px;
  width: 50px;

  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }

  cursor: pointer;
`;

export const Button = styled.button`
  font-weight: bolder;

  background-color: transparent;
  border: none;

  height: 50px;
  width: 120px;

  font-size: 24px;
  cursor: pointer;
`;

export const ButtonImage = styled.img`
  height: 32px;
  width: 32px;

  margin-left: 12px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  width: 180px;

  margin-top: 12px;

  transition: all 0.1s ease-in-out;

  border-radius: 32px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }

  cursor: pointer;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  width: 235px;
  padding: 6px;

  border-radius: 32px;

  background-color: transparent;

  transition: all 0.05s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  cursor: pointer;
`;

export const ProfilePicture = styled.img`
  height: 52px;
  width: 52px;

  border-radius: 50%;
`;

export const Username = styled.h3`
  font-weight: bolder;
  font-size: 20px;
`;

export const UserAt = styled.h2`
  font-weight: bold;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.1);
`;

export const OpenMenu = styled.span`
  background-color: transparent;
  font-weight: bolder;

  margin-left: 22px;
  margin-bottom: 8px;
`;

export const SignOutMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;

  height: 40px;
  width: 220px;

  bottom: 80px;
  right: 10px;

  background-color: #000000;

  border-radius: 12px;

  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);
`;

export const SignOutButton = styled.button`
  background-color: transparent;
  border: none;

  font-size: 16px;
  z-index: 6;

  &:hover {
    text-decoration: underline;
  }

  cursor: pointer;
`;

export const CloseDiv = styled.div`
  position: absolute;

  top: 0;
  left: 0;

  z-index: 4;

  height: 100vh;
  width: 100vw;

  background-color: transparent;
`;
