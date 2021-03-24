import React from 'react';
import {v4 as uuidv4} from 'uuid';
import Dialog from '../Dialog';
import Button from '../Button';
import Title from '../Title';

const LoginSection = () => {
  const handleLogin = () => {
    window.localStorage.removeItem('id_token');
    const nonce = uuidv4(); //generate unique identifier
    window.localStorage.setItem('nonce', nonce);
    window.location.assign(
      `https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm/protocol/openid-connect/auth/?client_id=waecm&response_type=id_token&prompt=consent&redirect_uri=http://localhost:3000/dashboard&scope=openid%20profile&nonce=${nonce}`
    );
  };

  return (
    <Dialog>
      <Title>waecm 2021</Title>
      <div className="italic">group 3 bsp 1</div>
      <Button onClick={handleLogin}>Login</Button>
    </Dialog>
  );
};


export default LoginSection;
