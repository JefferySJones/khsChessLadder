app.controller("LadderCtrl", function ($scope, parseService, logicService, fbService) {

	$scope.login = function () {
		parseService.login({ "username": $scope.username, "password": $scope.password }).then(function (data) {
			console.log("AUTHORIZED");
			$scope.auth = true;
			removeError();
		},
		function() {
			$scope.showL = true;
			window.setTimeout(function ()
    		{
				$('.loginForm').append('<span id="errorLogin" style="position: absolute; left: 5px; top: 3px; font-size: .7em; color: #fff">INCORRECT USERNAME OR PASSWORD</span>')
				document.getElementById("loginField").focus();
			}, 0);
		});
		$scope.password = null;
		$scope.username = null;
	}
	
	function removeError() {
		var element = document.getElementById('errorLogin');
		element.parentNode.removeChild(element);
	}

	$scope.logout = function () {
		$scope.auth = false;
	}

	$scope.hideButton = function (player) {
		delete player.active;
		player.ladder = '0';
		players.$save(player);
	}
	
	//FIREBASE
	//Get all players and throw it on the scope
	
	//Firebase Array PLAYERS
	var players = fbService.getAllPlayers();
	$scope.players = players;
	
	var games = fbService.getAllGames();
	$scope.games = games;
	
	//Firebase Object PLAYERS
	// var players = fbService.getAllPlayers();
    // players.$bindTo($scope, 'players'); // creates $scope.thread with 3 way binding
	
	//Firebase Array SHOW ALL
	$scope.showAll = function () {
		$scope.players = $scope.players.map(function (player) {
			if (player.ladder == "0" && parseInt(player.ranking) != 999999) {
				player.ladder = 1;
				$scope.players.$save(player);
			}
			return player;
		});
		$scope.players = fbService.getAllPlayers(); //Update to show
	}

	var fbSaveChanged = function () {
		$scope.players = $scope.players.map(function (player) {
			if (player.changed = true) {
				delete player.changed;
				$scope.players.$save(player);
			}
			return player;
		});
	}

	$scope.submitGame = function (white, black, winner) {
		if (white && black && !winner) {
			debugger;
			//Neither Wins
			console.log(white + " vs " + black + " | Draw/Stalemate.");
			winner = "Draw";
			//Reorder Ladder
			$scope.players = logicService.reOrderLadder(white, black, 0, $scope.players);

		} else if (white && black && winner.toLowerCase() === "white") {
			//White Wins
			console.log(white + " vs " + black + " | " + white + " won.");
			winner = white.name;
			//Reorder Ladder
			$scope.players = logicService.reOrderLadder(white, black, 1, $scope.players);

		} else if (white && black && winner.toLowerCase() === "black") {
			//Black Wins
			console.log(white + " vs " + black + " | " + black + " won.");
			winner = black.name;
			//Reorder Ladder
			$scope.players = logicService.reOrderLadder(black, white, 1, $scope.players);
		} else {
			console.log("Submit Game - Invalid Submission");
		}
		var curDate = new Date();
		
		curDate = curDate.getFullYear() + "-" + ("00" + (parseInt(curDate.getMonth()) + 1).toString()).substr(-2,2) + "-" + (("00" + curDate.getDate()).substr(-2,2)) + "T" + curDate.getHours() + ":" + (("00" + curDate.getMinutes()).substr(-2,2)) + ":" + (("00" + curDate.getSeconds()).substr(-2,2)) + "." + ("000" + curDate.getMilliseconds()).substr(-3,3);
		
		var game = { "white": white.name, "whiteID": white.objectId, "black": black.name, "blackID": black.objectId, "winner": winner, "createdAt": curDate };
		console.log(game);
		
		//$add game to game array
		games.$add(game);
		
		clearActivePlayers();
		$scope.toggleGR(); // Hide Game Reporter
		
		//Save Changes
		fbSaveChanged();
		$scope.players = fbService.getAllPlayers(); // Update Changes
	}
	//END FIREBASE CHANGES
	
	/**  
	* View Control
	*/
	$scope.auth = true;
	$scope.gameReporter = false;
	$scope.showFooter = false;
	$scope.showL = false;

	$scope.toggleLogin = function () {
		$scope.showL = !$scope.showL;
	}

	$scope.toggleFooter = function () {
		$scope.showFooter = !$scope.showFooter;
	}

	$scope.toggleGR = function () {
		$scope.gameReporter = !$scope.gameReporter;
	}
	
	/* Game Submission Handling */
	var clearActivePlayers = function () {
		if ($scope.playerOne) {
			delete $scope.playerOne.active;
		}
		if ($scope.playerTwo) {
			delete $scope.playerTwo.active;
		}

		$scope.playerOne = null;
		$scope.playerTwo = null;
	}

	$scope.swapActivePlayers = function () {
		if ($scope.playerTwo) {
			var placehold = $scope.playerOne;
			$scope.playerOne = $scope.playerTwo;
			$scope.playerTwo = placehold;
			$scope.playerOne.active = 1;
			$scope.playerTwo.active = 2;
		}
	}


	$scope.selectActivePlayer = function (player) {
		// Set player one to player if no player one.
		if (!$scope.playerOne) {
			$scope.playerOne = player;
			player.active = 1;
		}
		// If there already is a player one, and it's the person being clicked
		else if (player === $scope.playerOne) {
			$scope.playerOne = null;
			delete player.active;
		} 
		// Set player two to player if no player one.
		else if (!$scope.playerTwo) {
			$scope.playerTwo = player;
			player.active = 2;
		}
		// If there already is a player two, and it's the person being clicked
		else if (player === $scope.playerTwo) {
			$scope.playerTwo = null;
			delete player.active;
		}
		// If there is already a player two, and a player one
		else if ($scope.playerTwo && $scope.playerOne) {
			delete $scope.playerTwo.active; // Delete old player two's active
			$scope.playerTwo = player;
			player.active = 2;
		}
		
		// If there's a player two, but not a player one...
		if (!$scope.playerOne && $scope.playerTwo) {
			$scope.playerOne = $scope.playerTwo;
			$scope.playerTwo = null;
			$scope.playerOne.active = 1;
		}
	}


});
	// $scope.submitGame = function (white, black, winner) {
	// 	if (white && black && !winner) {
	// 		//Neither Wins
	// 		console.log(white + " vs " + black + " | Draw/Stalemate.");
	// 		console.log("reorder ladder", white, black, 0, $scope.players);
	// 		//Submit Game to Database
	// 		$scope.players = logicService.reOrderLadder(white, black, 0, $scope.players); //Reorder Ladder
	// 	} else if (white && black && winner.toLowerCase() === "white") {
	// 		//White Wins
	// 		console.log(white + " vs " + black + " | " + white + " won.");
	// 		//Submit Game to Database
	// 		$scope.players = logicService.reOrderLadder(white, black, 1, $scope.players); //Reorder Ladder
	// 	} else if (white && black && winner.toLowerCase() === "black") {
	// 		//Black Wins
	// 		console.log(white + " vs " + black + " | " + black + " won.");
	// 		//Submit Game to Database
	// 		$scope.players = logicService.reOrderLadder(black, white, 1, $scope.players); //Reorder Ladder
	// 	} else {
	// 		console.log("* * * Submit Game - Invalid Submission * * *");
	// 	}
	// 	if (winner == undefined) {
	// 		winner = "Draw";
	// 	}
	// 	var game = { "white": white.name, "whiteID": white.objectId, "black": black.name, "blackID": black.objectId, "winner": winner };
	// 	parseService.postGameSubmission(game);
	// 	clearActivePlayers();
	// 	$scope.toggleGR();
	// 	//getUpdateData();
	// }
	/**  FOR PARSE SERVICE
	* Get player data from the server
	* @return {array} Array of player objects
	*/
	/*var getPlayerData = function () {
		parseService.getPlayerData().then(function (res) {
			$scope.players = res;
		});
	}
	getPlayerData(); //Immediately Invoke*/
	
	
	
	/**  
	* Update SINGLE player data
	* @param {object} player object
	* @returns objectId
	*/
	// $scope.updatePlayerData = function (player) {
	// 	parseService.updatePlayerData(player);
	// }

	/**  
	* Hide a player from the ladder
	* @param {object} player object
	*/
	// $scope.hidePlayer = function (player) {
	// 	player.ladder = "0";
	// 	// players.$save(player).then(function() {
	// 	// 	console.log('SUCCESS!');
	// 	// });
	// 	//$scope.changed = true;
	// }
	
	/**  
	* Update all players on ladder
	* @param {boolean} - If true, set all ladder values to 1;
	*/
	// $scope.updateLadder = function (show, override) {
	// 	if (override) {
	// 		$scope.changed = override;
	// 	}
	// 	if ($scope.changed || show) {
	// 		logicService.updateLadder($scope.players, show)
	// 			.then(function () {
	// 				clearActivePlayers();
	// 				getPlayerData(); //Update Page
	// 			});
	// 	}
	// 	$scope.changed = false;
	// }