import Head from 'next/head';
import React from 'react';
import {v4 as uuidv4} from 'uuid';
import Dialog from '../components/dialog';
import Title from '../components/title';
import Button from '../components/button';
import storage from '../util/storage';
import globals from '../util/globals';

export default function Home(): React.ReactElement {
	const handleLogin = () => {
		const nonce = uuidv4();
		storage.setItem('nonce', nonce);
		window.location.assign(`${globals.openid_host}/auth/?client_id=${globals.openid_clientid}&response_type=id_token&prompt=consent&redirect_uri=${globals.host}/dashboard&scope=openid%20profile&nonce=${nonce}`);
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
			<div className="grid place-items-center w-screen h-screen" >
			<Dialog>
				<img src="/Twitter.png" alt="twitter"/>
				<Title>waecm 2021</Title>
				<div className="italic">group-03-bsp-02</div>
				<Button onClick={handleLogin}>Login</Button>
			</Dialog>
			</div>
		</div>
	);
}
