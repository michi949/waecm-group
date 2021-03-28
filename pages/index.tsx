import Head from 'next/head';
import React from 'react';
import {v4 as uuidv4} from 'uuid';
import Dialog from '../components/Dialog';
import Title from '../components/Title';
import Button from '../components/Button';

export default function Home(): React.ReactElement {
	const handleLogin = () => {
		window.localStorage.removeItem('id_token');
		const nonce = uuidv4();
		window.localStorage.setItem('nonce', nonce);
		window.location.assign(
			`https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm/protocol/openid-connect/auth/?client_id=waecm&response_type=id_token&prompt=consent&redirect_uri=http://localhost:3000/dashboard&scope=openid%20profile&nonce=${nonce}`
		);
	};

	return (
		<div>
			<Head>
				<link rel="preconnect" href="https://fonts.gstatic.com"/>
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<Dialog>
				<Title>waecm 2021</Title>
				<div className="italic">group 3 bsp 1</div>
				<Button onClick={handleLogin}>Login</Button>
			</Dialog>
		</div>
	);
}
