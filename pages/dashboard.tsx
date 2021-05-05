import React, {useEffect, useState} from 'react';
import {getToken, logout} from '../util/tokenManagment';
import Dialog from '../components/dialog';
import Title from '../components/title';
import Button from '../components/button';
import storage from '../util/storage';
import globals from '../util/globals';
import {useRouter} from 'next/router';
import login from './api/login';

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
				storage.setItem("token", id_token);
				navigateToTweetPage();
			});
	}, []);

	const handleLogout = () => {
		logout();
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
			<Button onClick={handleLogout}>
				Logout
			</Button>
		</Dialog>
	);
}
