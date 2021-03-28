import React from 'react';
import Dialog from '../components/dialog';
import Title from '../components/title';
import Button from '../components/button';

export default function InvalidLogin(): React.ReactElement {
	const navigateToMainPage = () => window.location.assign('http://localhost:3000');
	return (
		<Dialog>
			<Title>Login failed 😢</Title>
			<Button onClick={navigateToMainPage}>
				go to main page
			</Button>
		</Dialog>
	);
}