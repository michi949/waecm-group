import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from "uuid";

const LoginSection = () => {
  const handleLogin = () => {
    window.localStorage.removeItem("id_token");
    const nonce = uuidv4(); //generate unique identifier
    window.localStorage.setItem("nonce", nonce);
    window.location.assign(
      `https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm/protocol/openid-connect/auth/?client_id=waecm&response_type=id_token&prompt=consent&redirect_uri=http://localhost:3000/dashboard&scope=openid%20profile&nonce=${nonce}`
    );
  };

  return (
    <StyledLoginSection>
      <StyledForm>
        <ProjectName>
          <h1>
            waecm 2021
            <br />
            <span>group 3 bsp 1</span>
          </h1>
        </ProjectName>
        <StyledButton onClick={handleLogin}>Login</StyledButton>
      </StyledForm>
    </StyledLoginSection>
  );
};

const StyledLoginSection = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;
const StyledForm = styled.div`
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
    background-position: right center; /* change the direction of the change here */
    color: black;
    opacity: 0.9;
  }
`;
const ProjectName = styled.div`
  margin: 0.25rem;
  text-align: center;
  h1 {
    display: inline-block;
    margin: 0;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
`;

export default LoginSection;
