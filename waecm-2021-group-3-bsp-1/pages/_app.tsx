import React from 'react';
import '../styles/globals.scss';
import '../styles/neomorphism.scss';

export default function MyApp({ Component, pageProps }: {Component: React.ElementType, pageProps: unknown}): React.ReactNode {
	return <Component {...pageProps} />;
}
