export const getToken = (): string => {
	const urlParams = new URLSearchParams(window.location.href);
	return urlParams.get('id_token');
};