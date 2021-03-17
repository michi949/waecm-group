// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getToken } from "./oidc";

const validateToken = async () => {
  const { id_token } = getToken();
  const response = await fetch(
    `https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm/protocol/openid-connect/Token/`,
    {
      //right endpoint?
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    }
  );
  return response;
};

export default (req, res) => {
  res.status(200).json({ name: "John Doe" });
};
