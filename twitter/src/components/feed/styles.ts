import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #000000;
  height: 100vh;
  width: 100vw;
`;

export const FeedPosts = styled.ul`
  width: 600px;

  border-left: 1px solid #303336;
  border-right: 1px solid #303336;

  list-style-type: none;
  scrollbar-color: #888 transparent;
  scrollbar-width: none;

  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const ChangeFeed = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.8);

  z-index: 4;

  & > button {
    width: 298px;
  }
`;

export const SelectedFeed = styled.button`
  height: 50px;

  background-color: transparent;
  border: none;

  font-weight: bolder;
  font-size: 18px;
  text-align: center;

  width: 100%;

  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }

  cursor: pointer;
`;
