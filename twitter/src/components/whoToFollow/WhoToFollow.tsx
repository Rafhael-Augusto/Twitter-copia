import { useEffect, useState } from "react";
import axios from "axios";

import API_BASE_URL from "../../config/api";
import type { ProfileApiType } from "../../types";

import WhoToFollowItem from "../whoToFollowItem/whoToFollowItem";

import * as S from "./styles";

function WhoToFollow() {
  const [profiles, setProfiles] = useState<[ProfileApiType] | null>(null);

  useEffect(() => {
    const UpdateList = () => {
      axios
        .get(`${API_BASE_URL}/profiles/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setProfiles(res.data);
        });
    };

    const interval = setInterval(UpdateList, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <S.Container>
      <S.Wrapper>
        <S.Div>
          <S.Title>Quem seguir</S.Title>

          <S.ProfileList>
            {profiles?.map((profile) => (
              <S.Profile key={profile.id}>
                <WhoToFollowItem item={profile} />
              </S.Profile>
            ))}
          </S.ProfileList>
        </S.Div>
      </S.Wrapper>
    </S.Container>
  );
}

export default WhoToFollow;
