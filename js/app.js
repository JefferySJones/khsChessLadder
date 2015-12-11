var app = angular.module('KHSChess', ['ngRoute', 'ui.bootstrap', 'firebase', 'ngAnimate']);

app.constant('fb', {
      url: 'https://khschess.firebaseio.com/'
});

app.config(function ($routeProvider, $httpProvider) {
  //$httpProvider.interceptors.push('httpRequestInterceptor');

  //router here
  $routeProvider
    .when('/', {
      templateUrl: 'js/landing/landingtmpl.html',
      controller: 'MainCtrl'
    })
    .when('/ladder', {
      templateUrl: 'js/ladder/laddertmpl.html',
      controller: 'LadderCtrl'
    })
    .when('/members', {
      templateUrl: 'js/members/memberstmpl.html',
      controller: 'MemberCtrl'
    })
    .when('/learn', {
      templateUrl: 'js/learn/learntmpl.html',
      controller: 'MainCtrl'
    })
    .otherwise({ redirectTo: '/' })
});

app.animation('.animate', [function() {
  return {
    // make note that other events (like addClass/removeClass)
    // have different function input parameters
    enter: function(element, doneFn) {
      element.css('opacity',0);
      $(element).animate({
        opacity: 1
      }, doneFn);

      // remember to call doneFn so that angular
      // knows that the animation has concluded
    },

    move: function(element, doneFn) {
      element.css('opacity',0);
      $(element).animate({
        opacity: 1
      }, doneFn);
    },

    leave: function(element, doneFn) {
      element.css('opacity',1);
      $(element).animate({
        opacity: 0
      }, doneFn);
    }
  }
}]);