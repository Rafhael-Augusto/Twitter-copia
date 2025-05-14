import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import API_BASE_URL from "../../config/api";

import * as S from "./styles";

type ProfileApi = [
  {
    id: number;
    username: string;
    userat: string;
    profile: File;
  }
];

function WhoToFollow() {
  const navigate = useNavigate();

  const [profiles, setProfiles] = useState<ProfileApi | null>(null);

  useEffect(() => {
    const UpdateList = () => {
      axios.get(`${API_BASE_URL}/profiles/`).then((res) => {
        setProfiles(res.data);
      });
    };

    UpdateList();
    const interval = setInterval(UpdateList, 10000);
    return () => clearInterval(interval);
  }, []);

  const VisitProfile = (userat: string, id: number) => {
    navigate(`/${userat}/${id}/profile`);
  };

  return (
    <S.Container>
      <S.Wrapper>
        <S.Div>
          <S.Title>Quem seguir</S.Title>

          <S.ProfileList>
            {profiles?.map((profile) => (
              <S.Profile key={profile.id}>
                <S.ProfileInfos
                  onClick={() => VisitProfile(profile.userat, profile.id)}
                >
                  <S.UserProfilePicture src="/Logo.jpg" />
                  <div>
                    <S.UserProfileUsername>
                      {profile.username}
                    </S.UserProfileUsername>
                    <S.UserProfileAt>@{profile.userat}</S.UserProfileAt>
                  </div>
                </S.ProfileInfos>
                <S.FollowButton>Seguir</S.FollowButton>
              </S.Profile>
            ))}
          </S.ProfileList>
        </S.Div>
      </S.Wrapper>
    </S.Container>
  );
}

export default WhoToFollow;
