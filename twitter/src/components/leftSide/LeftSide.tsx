import { useNavigate } from "react-router-dom";

import * as S from "./styles";

function LeftSide() {
  const navigate = useNavigate();

  const ReturnHome = () => {
    navigate("/home");
  };

  const GoToProfile = () => {
    navigate("/Rafhael/1/profile");
  };

  return (
    <S.Container>
      <S.Background>
        <S.ButtonsList>
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
        </S.ButtonsList>
      </S.Background>
    </S.Container>
  );
}

export default LeftSide;
