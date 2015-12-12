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
	
	// this.postGameSubmission = function (data) {
	// 	$http({
	// 		method: 'POST',
	// 		url: 'https://api.parse.com/1/classes/games',
	// 		data: data,
	// 		headers: {
	// 			'X-Parse-REST-API-Key': 'lQ5ImYpLeMUbFUZ6OWUMdrEwSTltoSa72dzY6Qea',
	// 			'X-Parse-Application-Id': 'MnSKlCR851QIsKm2WUVm3ByZGB71EAb0mME7Y82C'
	// 		}
	// 	}).then(function (res) {
	// 		console.log("POST Response", res.data);
	// 	});
	// }

	// this.getPlayerData = function (id) {
	// 	var url;
	// 	if (id) {
	// 		url = "https://api.parse.com/1/classes/players/" + id;
	// 	} else {
	// 		url = "https://api.parse.com/1/classes/players";
	// 	}
	// 	return $http({
	// 		method: 'GET',
	// 		url: url,
	// 		headers: {
	// 			'X-Parse-REST-API-Key': 'lQ5ImYpLeMUbFUZ6OWUMdrEwSTltoSa72dzY6Qea',
	// 			'X-Parse-Application-Id': 'MnSKlCR851QIsKm2WUVm3ByZGB71EAb0mME7Y82C'
	// 		}
	// 	}).then(function (res) {
	// 		console.log("GET Response", res.data.results);
	// 		console.log(res);
	// 		return res.data.results;
	// 	});
	// }

	// this.postPlayerData = function (data) {
	// 	$http({
	// 		method: 'POST',
	// 		url: 'https://api.parse.com/1/classes/players',
	// 		data: data,
	// 		headers: {
	// 			'X-Parse-REST-API-Key': 'lQ5ImYpLeMUbFUZ6OWUMdrEwSTltoSa72dzY6Qea',
	// 			'X-Parse-Application-Id': 'MnSKlCR851QIsKm2WUVm3ByZGB71EAb0mME7Y82C'
	// 		}
	// 	}).then(function (res) {
	// 		console.log("POST Response", res.data);
	// 	});
	// }

	// this.updatePlayerData = function (data) {
	// 	var objid = data.objectId;
	// 	return $http({
	// 		method: 'PUT',
	// 		url: 'https://api.parse.com/1/classes/players/' + objid,
	// 		data: data,
	// 		headers: {
	// 			'X-Parse-REST-API-Key': 'lQ5ImYpLeMUbFUZ6OWUMdrEwSTltoSa72dzY6Qea',
	// 			'X-Parse-Application-Id': 'MnSKlCR851QIsKm2WUVm3ByZGB71EAb0mME7Y82C'
	// 		}
	// 	}).then(function (res) {
	// 		console.log("PUT Response", res.data);
	// 		return (objid);
	// 	});
	// }

	// this.batchRequest = function (data) {
	// 	return $http({
	// 		method: 'POST',
	// 		url: "https://api.parse.com/1/batch",
	// 		data: data,
	// 		headers: {
	// 			'X-Parse-REST-API-Key': 'lQ5ImYpLeMUbFUZ6OWUMdrEwSTltoSa72dzY6Qea',
	// 			'X-Parse-Application-Id': 'MnSKlCR851QIsKm2WUVm3ByZGB71EAb0mME7Y82C',
	// 			'Content-Type': 'application/json'
	// 		}
	// 	}).then(function (res) {
	// 		console.log("BATCH Response", res.data);
	// 	});
	// }


});