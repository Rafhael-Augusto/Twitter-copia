import { useNavigate } from "react-router-dom";
import { useState } from "react";

import * as S from "./styles";

function LeftSide() {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);

  const ReturnHome = () => {
    navigate("/home");
  };

  const GoToProfile = () => {
    navigate("/Rafhael/1/profile");
  };

  return (
    <>
      <S.CloseDiv
        onClick={() => setOpenMenu(false)}
        style={{ display: openMenu ? "block" : "none" }}
      />
      <S.Container>
        <S.Background>
          <S.ButtonsList>
            <div>
              <div onClick={ReturnHome} style={{ position: "relative" }}>
                <S.LogoButton src="/twitter.png" />
                <S.ButtonInteraction />
              </div>
              <S.Wrapper onClick={ReturnHome}>
                <S.ButtonImage src="/house.svg" />
                <S.Button>Home</S.Button>
              </S.Wrapper>
              <S.Wrapper onClick={GoToProfile}>
                <S.ButtonImage src="/profile.svg" />
                <S.Button>Perfil</S.Button>
              </S.Wrapper>
            </div>
            <S.SignOutMenu style={{ display: openMenu ? "flex" : "none" }}>
              <S.SignOutButton>Sair da conta @Placeholder</S.SignOutButton>
            </S.SignOutMenu>
            <S.UserInfo onClick={() => setOpenMenu(!openMenu)}>
              <S.ProfilePicture src="/Logo.jpg" />
              <div>
                <S.Username>Placeholder</S.Username>
                <S.UserAt>@Placeholder</S.UserAt>
              </div>
              <S.OpenMenu>. . .</S.OpenMenu>
            </S.UserInfo>
          </S.ButtonsList>
        </S.Background>
      </S.Container>
    </>
  );
}

export default LeftSide;
