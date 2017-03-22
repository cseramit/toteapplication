punterApp.controller('ResultsController', ['$scope', '$location', '$filter', 'BetDataService', function($scope, $location, $filter, BetDataService) {

    /*If someone refreshes on result page, need to be redirected to home */
    if(BetDataService.getBetList().length == 0 ){
        $location.path('/');
    }else {
        BetDataService.getWinDividendFromBackend().then(function(data){
            $scope.winResultMap = data.winObject;
        }, function(data) {
            /* Error Handling */
            $scope.winResultMap = [];
        });

        BetDataService.getPlaceDividendFromBackend().then(function(data){
            $scope.placeResultMap = data.placeObject;
        },function(data){
            $scope.placeResultMap = [];
        });
    }

}]);
