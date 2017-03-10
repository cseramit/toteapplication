var punterApp = angular.module("punterApp", ['ngRoute']);

punterApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/assets/templates/placeBets.html',
            controller: 'BetController'
        })
        .when('/results', {
            templateUrl: '/assets/templates/betResults.html',
            controller: 'ResultsController'
        });
});
