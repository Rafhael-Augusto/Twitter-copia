import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  color: white;
`;

export const Background = styled.div`
  position: absolute;

  top: 0;
  left: 80px;

  height: 100px;
  width: 320px;
`;

export const ButtonsList = styled.div`
  display: flex;
  flex-direction: column;

  align-items: start;
  justify-content: center;

  gap: 4px;
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
  top: 2px;

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
