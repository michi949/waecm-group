import { NextApiRequest, NextApiResponse } from "next";
import { findFromToTweetsFromDatabase } from "../../util/databaseConnector";
import IdTokenVerifier from 'idtoken-verifier';

export default (req: NextApiRequest, res: NextApiResponse): void => {
    const authorization = req.headers.authorization ?? '';
	const idTokenMatch = authorization.match(/Bearer (.*)/);
	const nonce = req.query.nonce;

    const idToken = idTokenMatch[1];

	const verifier = new IdTokenVerifier({
		issuer: 'https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm',
		audience: 'waecm',
		jwksURI: 'https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm/protocol/openid-connect/certs',
	});
      
	verifier.verify(idToken, nonce, async (error, userInfo) => {
		if (error) {
			res.status(401).json({ tokenValid: false });
		} else {
            if (req.method === "GET") {
                handleGetRequest(req, res);
            } else {
                res.status(400).json({error: "Wrong Request"});
            }
		}
    });
}

const handleGetRequest = (req: NextApiRequest, res: NextApiResponse): NextApiResponse => {
    const skip: number = Number(req.query.skip) ?? 0;
    const limit: number = Number(req.query.limit) ?? 6;

    const tweets = findFromToTweetsFromDatabase(skip, limit);

    tweets.then( a => {
        res.status(200).json(a);
    });
    return res;
}