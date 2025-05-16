import styled from "styled-components";

export const Container = styled.div`
  width: 200px;
  height: 100%;

  @media (max-width: 1200px) {
    width: 365px;
  }

  @media (max-width: 1000px) {
    width: 0px;
  }
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

  @media (max-width: 1200px) {
    width: 280px;
    margin-left: 45px;
  }

  @media (max-width: 992px) {
    margin-left: 19px;
  }

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 1000px) {
    display: none;
  }
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
