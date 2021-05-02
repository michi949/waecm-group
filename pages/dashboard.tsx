import React, {useEffect, useState} from 'react';
import {getToken} from '../util/get-token';
import Dialog from '../components/dialog';
import Title from '../components/title';
import Button from '../components/button';
import storage from '../util/storage';
import globals from '../util/globals';
import {useRouter} from 'next/router';

export default function Dashboard(): React.ReactElement {

	const [userInfo, setUserInfo] = useState(null);
	const router = useRouter();

	useEffect(() => {
		const id_token = getToken();
		const nonce = storage.getItem('nonce');
    fetch(`${globals.host}/api/login?nonce=${nonce}`, {
			headers: {Authorization: `Bearer ${id_token}`},
		})
			.then((x) => x.json())
			.then((res) => {
				res.tokenValid ? setUserInfo(res.userInfo) : handleInvalidLogin();
			});
	}, []);

	const handleLogout = () => {
		const nonce = storage.getItem('nonce');
		storage.setItem('nonce', '');
		window.location.assign(`${globals.openid_host}/logout/?client_id=${globals.openid_clientid}&redirect_uri=${globals.host}&scope=openid%20profile&nonce=${nonce}`);
	};

	const navigateToTweetPage = () => {
		router.push('/feed')
	}

	const handleInvalidLogin = () => router.push(`/invalid-login`);

	return (
		<Dialog>
			<Title>Login was successful</Title>
			<img alt="hotboy" src={userInfo?.picture ?? './twitter.jpg'}/>
			<p>{userInfo?.name ?? 'No Name'}</p>
			<Button onClick={navigateToTweetPage}>
				Navigate to Tweets
			</Button>
			<Button onClick={handleLogout}>
				Logout
			</Button>
		</Dialog>
	);
}
