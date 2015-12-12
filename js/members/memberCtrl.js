app.controller("MemberCtrl", function ($scope, fbService) {
	
	var players = fbService.getAllPlayers();
	$scope.players = players;
	
	var games = fbService.getAllGames();
	$scope.games = games;
	
	$scope.selectBox = '';
	$scope.player = {};

	$scope.parseObj = function() {
		if ($scope.selectBox != ''){
			$scope.player = JSON.parse($scope.selectBox);
			$scope.player.show = true;
			console.log($scope.player);
		}
	}
});