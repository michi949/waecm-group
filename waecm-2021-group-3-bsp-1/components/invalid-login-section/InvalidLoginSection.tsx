import Dialog from '../Dialog';
import Button from '../Button';
import React from 'react';
import Title from '../Title';

const InvalidLoginSection = (): React.ReactElement => {
	const navigateToMainPage = () => window.location.assign('http://localhost:3000');
	return (
		<Dialog>
			<Title>Login failed 😢</Title>
			<Button onClick={navigateToMainPage}>
        go to main page
			</Button>
		</Dialog>
	);
};

export default InvalidLoginSection;