import Head from 'next/head';
import LoginSection from '../components/login-section/LoginSection';
import React from 'react';

export default function Home(): React.ReactElement {
	return (
		<div>
			<Head>
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<LoginSection />
		</div>
	);
}
