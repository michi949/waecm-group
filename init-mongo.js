// eslint-disable-next-line no-undef
db.createUser({
	user: 'service-user',
	pwd: 'itsedev',
	roles: [{
		role: 'readWrite',
		db: 'waecm2021group3db',
	}]
}); 