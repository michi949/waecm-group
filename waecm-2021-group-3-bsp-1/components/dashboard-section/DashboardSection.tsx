import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getToken } from "../../util/get-token";


const DashboardSection = () => {
  const [userInfo, setUserInfo] = useState({});
 
  useEffect(() => {
    const id_token = getToken();
    const nonce = window.localStorage.getItem("nonce");
    fetch(`http://localhost:3000/api/login?nonce=${nonce}`, {
      headers: { Authorization: `Bearer ${id_token}` },
    })
      .then((x) => x.json())
      .then((res) => {
        res.tockenValid ? setUserInfo(res.userInfo) : handleInvalidLogin();
      });
  }, []);

  const handleLogout = () => {
    const nonce = window.localStorage.getItem("nonce");
    window.localStorage.setItem("nonce", "");
    window.location.assign(
      `https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm/protocol/openid-connect/logout/?client_id=waecm&redirect_uri=http://localhost:3000&scope=openid%20profile&nonce=${nonce}`
    );
  }

  const handleInvalidLogin = () => {
    window.location.assign(
      `http://localhost:3000/invalid-login`
    );
  }

  return (
    <StyledDashboardSection>
      <StyledCard>
        <Title>
          <h2> Login Successful </h2>
          <Line />
        </Title>
        <StyledImage alt="hotboy" src={userInfo === undefined ? "./filler.jpg" : userInfo.picture} />
        <p>{userInfo === undefined ? "No Name" : userInfo.name}</p>
        <StyledButton onClick={handleLogout}>
            Logout
        </StyledButton>
      </StyledCard>
    </StyledDashboardSection>
  );
};

const StyledDashboardSection = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;
const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 30rem;
  width: 20rem;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 2rem;
`;
const StyledImage = styled.img`
  border-radius: 50%;
  height: 200px;
  width: 200px;
  background: transparent;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  &:hover {
    box-shadow: 0 16px 40px 0 rgba(31, 38, 135, 0.37);
  }
`;
const StyledButton = styled.button`
  width: 90%;
  padding: 1rem;
  border-radius: 2rem;
  margin-bottom: 2rem;
  background-image: linear-gradient(
    to right,
    #ef32d9 0%,
    #89fffd 51%,
    #ef32d9 100%
  );
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border: none;
  opacity: 0.8;
  cursor: pointer;
  &:hover {
    background-position: right center;
    color: black;
    opacity: 0.9;
  }
`;
const Title = styled.div`
  padding: 2rem;
  h2 {
    padding: 0;
    margin: 0;
  }
`;
const Line = styled.div`
  position: relative;
  width: 34px;
  height: 3px;
  background: white;
  top: -5px;
`;

export default DashboardSection;
