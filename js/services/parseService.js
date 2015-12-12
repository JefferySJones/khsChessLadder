app.service("parseService", function ($http) {
	this.login = function (data) {
		return $http({
			method: 'GET',
			url: 'https://api.parse.com/1/login',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'X-Parse-REST-API-Key': 'lQ5ImYpLeMUbFUZ6OWUMdrEwSTltoSa72dzY6Qea',
				'X-Parse-Application-Id': 'MnSKlCR851QIsKm2WUVm3ByZGB71EAb0mME7Y82C'
			},
			params: {
				username: data.username,
				password: data.password
			}
		});
	}
});