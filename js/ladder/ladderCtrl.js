app.controller("LadderCtrl", function ($scope, parseService, logicService, fbService) {

    //Firebase Array PLAYERS
    var players = fbService.getAllPlayers();
    $scope.players = players;

    //Firebase Array GAMES
    var games = fbService.getAllGames();
    $scope.games = games;

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
				$('.loginForm').append('<span id="errorLogin">INCORRECT USERNAME OR PASSWORD</span>')
				document.getElementById("loginField").focus();
			}, 0);
		});
		$scope.password = null;
		$scope.username = null;
	}

    /**
     * Removes login error from page.
     */
	function removeError() {
		var element = document.getElementById('errorLogin');
		element.parentNode.removeChild(element);
	}

	$scope.logout = function () {
		$scope.auth = false;
	}

    // HIDE (HIDES CURRENT PLAYER ON LADDER)
	//$scope.hideButton = function (player) {
	//	delete player.active;
	//	player.ladder = '0';
	//	players.$save(player);
	//}
    // SHOW ALL (FIREBASE - SHOWS ALL HIDDEN ON THE LADDER UNLESS THEY OPTED OUT OF THE LADDER)
	//$scope.showAll = function () {
	//	$scope.players = $scope.players.map(function (player) {
	//		if (player.ladder == "0" && parseInt(player.ranking) != 999999) {
	//			player.ladder = 1;
	//			$scope.players.$save(player);
	//		}
	//		return player;
	//	});
	//	$scope.players = fbService.getAllPlayers(); //Update to show
	//}

	var fbSaveChanged = function () {
		$scope.players = $scope.players.map(function (player) {
			if (player.changed = true) {
				delete player.changed;
				$scope.players.$save(player);
			}
			return player;
		});
	}

    /**
     * Submits game
     * @param {object} white
     * @param {object} black
     * @param {string} winner
     */
	$scope.submitGame = function (white, black, winner) {
		// Draw
        if (white && black && !winner) {
			console.log(white + " vs " + black + " | Draw/Stalemate.");
			winner = "Draw";
			$scope.players = logicService.reOrderLadder(white, black, true, $scope.players);

		// White Wins
        } else if (white && black && winner.toLowerCase() === "white") {
			console.log(white + " vs " + black + " | " + white + " won.");
			winner = white.name;
			$scope.players = logicService.reOrderLadder(white, black, false, $scope.players);

		// Black Wins
        } else if (white && black && winner.toLowerCase() === "black") {
			//Black Wins
			console.log(white + " vs " + black + " | " + black + " won.");
			winner = black.name;
			$scope.players = logicService.reOrderLadder(black, white, false, $scope.players);
		} else {
			throw("Invalid Game Submission");
		}
		var curDate = dateFormat(new Date());
        console.log(curDate);

		// Create game object
		var game = {
            "white": white.name,
            "whiteID": white.objectId,
            "black": black.name,
            "blackID": black.objectId,
            "winner": winner,
            "createdAt": curDate
        };

		// Push game to firebase game array
		games.$add(game);

		clearActivePlayers();
		$scope.toggleGR(); // Hide Game Reporter
		
		//Save Changes
		fbSaveChanged(); // Save changes on firebase object
		$scope.players = fbService.getAllPlayers(); // Update Changes
	}

    /**
     * Formats a date to be a date string with formatting and padded zeros | YYYY-MM-DDTHH:MM:sec.ms
     * @param {Date} date
     * @returns {string}
     */
    function dateFormat(date) {
        return date.getFullYear() + "-" + ("00" + (parseInt(date.getMonth()) + 1).toString()).substr(-2,2) + "-" + (("00" + date.getDate()).substr(-2,2)) +
        "T" + (("00" + date.getHours()).substr(-2,2)) + ":" + (("00" + date.getMinutes()).substr(-2,2)) + ":" + (("00" + date.getSeconds()).substr(-2,2)) + "." + ("000" + date.getMilliseconds()).substr(-3,3);
    }
	
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
	
	/* Active Players Handling for Game Submission */
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

    /* Swaps black and white */
	$scope.swapActivePlayers = function () {
		if ($scope.playerTwo) {
			var placehold = $scope.playerOne;
			$scope.playerOne = $scope.playerTwo;
			$scope.playerTwo = placehold;
			$scope.playerOne.active = 1;
			$scope.playerTwo.active = 2;
		}
	}

    /**
     * Sets player as an active player for game submission.
     * @param player
     */
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