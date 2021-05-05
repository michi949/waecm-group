import IdTokenVerifier from 'idtoken-verifier';
import globals from "./globals";
import storage from "./storage";


export interface IToken {
	nonce: string,
	token: string,
}

export const getToken = (): string => {
	const urlParams = new URLSearchParams(window.location.href);
	return urlParams.get('id_token');
};


export const logout = () => {
	const nonce = storage.getItem('nonce');
	storage.setItem("nonce", "");
	storage.setItem("token", "");
	window.location.assign(`${globals.openid_host}/logout/?client_id=${globals.openid_clientid}&redirect_uri=${globals.host}&scope=openid%20profile&nonce=${nonce}`);
};

export const checkLoginState = (): boolean => {
	if(storage.getItem("token") === "" || storage.getItem("nonce") === "") {
		return false;
	}
	return true;
}
