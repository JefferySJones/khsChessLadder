app.service("fbService", function($firebaseArray, $firebaseObject, fb){
                                   //Firebase Object is for 3 way binding --- Doesn't NG-Repeat well
                                   //Firebase Array you have to update each record individually
                                    
    this.getAllPlayers = function(){
        var ref = new Firebase(fb.url + '/players');
        return $firebaseArray(ref);
    };
	
	this.getAllGames = function(){
        var ref = new Firebase(fb.url + '/games');
        return $firebaseArray(ref);
    };

	this.getPlayer = function(playerId){
         var ref = new Firebase(fb.url + '/players/' + playerId);
         return $firebaseObject(ref);
    };

});