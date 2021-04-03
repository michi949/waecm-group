import React from 'react';
import Dialog from '../components/dialog';
import Title from '../components/title';
import Button from '../components/button';
import {useRouter} from 'next/router';

export default function InvalidLogin(): React.ReactElement {
	const router = useRouter();
	const navigateToMainPage = () => router.push('/');
	return (
		<Dialog>
			<Title>Login failed 😢</Title>
			<Button onClick={navigateToMainPage}>
				go to main page
			</Button>
		</Dialog>
	);
}