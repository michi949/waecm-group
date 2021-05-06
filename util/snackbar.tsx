import React, {useState} from 'react';
import {Snackbar} from '@material/react-snackbar';

export function useSnackbar() {
	const [alerts, setAlerts] = useState<any[]>([]);

	return {addAlert: (text: string) => {
		setAlerts([...alerts, <Snackbar timeoutMs={5000} message={text}/>]);
	},alerts};
}