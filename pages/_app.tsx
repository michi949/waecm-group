import React from 'react';
import '../styles/globals.scss';
import '../styles/neomorphism.scss';
import '@material/react-snackbar/dist/snackbar.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function MyApp({ Component, pageProps }: {Component: React.ElementType, pageProps: unknown}): React.ReactNode {
	return <Component {...pageProps} />;
}
