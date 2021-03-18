export const getToken = () => {
  const urlParams = new URLSearchParams(window.location.href);
  return urlParams.get('id_token');
};