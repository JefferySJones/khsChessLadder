app.service("logicService", function (parseService) {
	/** 
	* 
	*/
	this.reOrderLadder = function (winner, loser, outcome, players) {

		var r1, r2;
		if (winner.ranking < loser.ranking) {
			r1 = winner;
			r2 = loser; 	//Player with lower ladder rating
		} else {
			r1 = loser;
			r2 = winner; 	//Player with lower ladder rating
		}

		var r1origRank = r1.ranking;
		var r2origRank = r2.ranking;


		if (outcome === 0) { //Tie
			for (var i = 0; i < players.length; i++) {
				if (players[i].objectId === r2.objectId) {
					r2.ranking = r1.ranking + 1;
					players[i].ranking = r1.ranking + 1;
					players[i].changed = true;
				}
				if (players[i].objectId === winner.objectId) {
					players[i].draws += 1;
					players[i].changed = true;
				}
				if (players[i].objectId === loser.objectId) {
					players[i].draws += 1;
					players[i].changed = true;
				}
			}
			for (var i = 0; i < players.length; i++) {
				// If selected member's ladder is less than or equal to the value of the second player's ladder val;
				// and it is not the second player;
				if (players[i].ranking >= r2.ranking && players[i].ranking < r2origRank && players[i].objectId != r2.objectId) {
					players[i].ranking++;
					players[i].changed = true;
				}
			}
		} else if (outcome === 1) {

			if (winner !== r1) { 	// If the winner is not the higher rated player
				// winner === r2		
						
				for (var i = 0; i < players.length; i++) {
					var playerId = players[i].objectId;
					if (playerId === winner.objectId) { // Set the winner to the rating of the loser
						players[i].ranking = r1.ranking;
						players[i].changed = true;
					}

					if (players[i].objectId === winner.objectId) {
						players[i].wins += 1;
						players[i].changed = true;
					}
					if (players[i].objectId === loser.objectId) {
						players[i].losses += 1;
						players[i].changed = true;
					}

				}
				for (var i = 0; i < players.length; i++) {
					var playerId = players[i].objectId;
					if (playerId !== winner.objectId
						&& players[i].ranking < r2origRank
						&& players[i].ranking >= r1origRank) { // Add one to the loser's rating and everyone bigger than original winner rating
						players[i].ranking++;
						players[i].changed = true;
					}
				}

			} else {
				for (var i = 0; i < players.length; i++) {
					if (players[i].objectId === winner.objectId) {
						players[i].wins += 1;
						players[i].changed = true;
					}
					if (players[i].objectId === loser.objectId) {
						players[i].losses += 1;
						players[i].changed = true;
					}
				}
			}
		} 
		// this.updateLadder(players, false);
		return players;
	}
	
	
	// /**  
	// * Show all players on the ladder
	// */
	// this.updateLadder = function (players, show) {
	// 	var batchObj = { requests: [] };

	// 	players.forEach(function (player) {
	// 		if (player.ladder === "0" && player.ranking < 99999 && show) {
	// 			player.ladder = "1";
	// 			console.log("Changed Ladder Value to 1");
	// 		}
	// 		if (player.active) {
	// 			delete player.active;
	// 		}
	// 		if (batchObj.requests.length <= 50) { //CANNOT TAKE MORE THAN 50..
	// 			batchObj.requests.push({
	// 				method: "PUT",
	// 				path: "https://api.parse.com/1/classes/players/" + player.objectId,
	// 				body: { objectId: player.objectId, ladder: player.ladder, ranking: player.ranking }
	// 			});
	// 		}
	// 	});

	// 	return parseService.batchRequest(batchObj);
	// }

});