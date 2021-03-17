import { v4 as uuidv4 } from "uuid";

export const loadLoginScreen = () => {
  window.localStorage.removeItem("id_token");
  const nonce = uuidv4(); //generate unique identifier
  window.localStorage.setItem("nonce", nonce);
  window.location.assign(
    `https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm/protocol/openid-connect/auth/?client_id=waecm&response_type=id_token&prompt=consent&redirect_uri=http://localhost:3000/dashboard&scope=openid%20profile&nonce=${nonce}`
  );
};

export const getToken = () => {
  const urlParams = new URLSearchParams(window.location.href);
  var myToken = urlParams.get("id_token");
  return JSON.stringify(myToken);
};
