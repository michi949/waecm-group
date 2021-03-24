import React, {useEffect, useState} from 'react';
import {getToken} from '../../util/get-token';
import Dialog from '../Dialog';
import Button from '../Button';
import Title from '../Title';


const DashboardSection = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const id_token = getToken();
    const nonce = window.localStorage.getItem('nonce');
    fetch(`http://localhost:3000/api/login?nonce=${nonce}`, {
      headers: {Authorization: `Bearer ${id_token}`},
    })
      .then((x) => x.json())
      .then((res) => {
        res.tokenValid ? setUserInfo(res.userInfo) : handleInvalidLogin();
      });
  }, []);

  const handleLogout = () => {
    const nonce = window.localStorage.getItem('nonce');
    window.localStorage.setItem('nonce', '');
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
    <Dialog>
      <Title>Login was successful</Title>
      <img alt="hotboy" src={userInfo === undefined ? './filler.jpg' : userInfo.picture}/>
      <p>{userInfo === undefined ? 'No Name' : userInfo.name}</p>
      <Button onClick={handleLogout}>
        Logout
      </Button>
    </Dialog>
  );
};
export default DashboardSection;
