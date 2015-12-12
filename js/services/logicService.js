app.service("logicService", function () {

    /**
     * Re-arranges the players on the ladder based on win/loss/draw and who is the lower ranked player.
     * @param {object} winner
     * @param {object} loser
     * @param {boolean} draw
     * @param {object} players
     * @returns {object} players
     */
    this.reOrderLadder = function (winner, loser, draw, players) {

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

		if (draw === true) { //Tie
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
		} else if (draw === false) {

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

		return players;
	}

});