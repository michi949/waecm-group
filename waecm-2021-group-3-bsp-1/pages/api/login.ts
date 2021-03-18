import IdTokenVerifier from 'idtoken-verifier';

//api/login
export default (req, res) => {
    const nonce = "";
    const id_token = req.headers.authorization ?? "";
    // TODO Parse Token

    const verifier = new IdTokenVerifier({
        issuer: 'https://my.auth0.com/',
        audience: 'gYSNlU4YC4V1YPdqq8zPQcup6rJw1Mbt'
      });
      
    verifier.verify(id_token, nonce, (error, payload) => {
        if (error) {
            res.status(401).json({ tokenValid: false });
            return;
        }
      
        res.status(200).json({ tokenValid: true })
      });

};
