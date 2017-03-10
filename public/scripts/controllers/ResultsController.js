punterApp.controller('ResultsController', ['$scope', '$location', '$filter', 'BetDataService', function($scope, $location, $filter, BetDataService) {

    /*If someone refreshes on result page, need to be redirected to home */
    if(BetDataService.getBetList().length == 0 ){
        $location.path('/');
    }
    $scope.winResult = BetDataService.getWinDividend();
    $scope.placeResultMap = BetDataService.getPlaceDividend();

}]);
