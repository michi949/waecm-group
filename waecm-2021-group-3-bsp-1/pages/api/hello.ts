
import { getToken } from "./oidc";

//Its Client Side why is it in API Folder? Which is Server Side only? 
export const validateToken = async () => {
  const id_token  = getToken();
  const response = await fetch(
    `http://localhost:3000/api/login`,
    {
      //right endpoint? https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm/protocol/openid-connect/Token/
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    }
  );
  return response;
};

