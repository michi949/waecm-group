import IdTokenVerifier from 'idtoken-verifier';
import { NextApiRequest, NextApiResponse } from 'next';
import { findUserInDatabase, setUserIntoDatabase, updateUserInDatabase } from '../../util/databaseConnector';

export default (req: NextApiRequest, res: NextApiResponse): void => {

	const authorization = req.headers.authorization ?? '';
	const idTokenMatch = authorization.match(/Bearer (.*)/);
	const nonce = req.query.nonce;

	if(idTokenMatch === null){
		res.status(400).json({error: 'Please provide an authorization'});
		return;
	}
	if(nonce === undefined || nonce === ''){
		res.status(400).json({error: 'Please provide a nonce'});
		return;
	}

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
			console.log(await findUserInDatabase(userInfo.sub));
			if ((await findUserInDatabase(userInfo.sub)).length > 0) {
				updateUserInDatabase(userInfo.sub, {lastLogin: new Date(), picture: userInfo.picture});
			} else {
				setUserIntoDatabase({id: userInfo.sub, name: userInfo.name, picture: userInfo.picture});
			}
			
			res.status(200).json({ tokenValid: true, userInfo });
		}
	});
};