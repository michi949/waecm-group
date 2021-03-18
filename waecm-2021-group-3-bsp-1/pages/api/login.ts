import IdTokenVerifier from 'idtoken-verifier';

export default (req, res) => {

    const authorization = req.headers.authorization ?? "";
    const idTokenMatch = authorization.match(/Bearer (.*)/);
    const nonce = req.query.nonce;

    if(idTokenMatch === null){
        res.status(400).json({error: "Please provide an authorization"});
        return;
    }
    if(nonce === undefined || nonce === ""){
        res.status(400).json({error: "Please provide a nonce"});
        return;
    }

    const idToken = idTokenMatch[1];

    const verifier = new IdTokenVerifier({
        issuer: 'https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm',
        audience: 'waecm',
        jwksURI: 'https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm/protocol/openid-connect/certs',
      });
      
    verifier.verify(idToken, nonce, (error, userInfo) => {
        if (error) {
            res.status(401).json({ tokenValid: false });
        }else{
            res.status(200).json({ tokenValid: true, userInfo })
        }
      });

};