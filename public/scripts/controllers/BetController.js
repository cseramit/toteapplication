punterApp.controller('BetController', ['$scope', '$location', '$filter', 'BetDataService', function($scope, $location, $filter, BetDataService) {

    $scope.betObject = {
        "betType": "",
        "horseNo": "",
        "amount": ""
    };

    $scope.betResult = {
        "first": "",
        "second": "",
        "third": ""
    };

    /* Preserve the list on home page. Optional*/
    $scope.betList = BetDataService.getBetList();

    $scope.clearBet = function(betObject) {
        betObject.betType = "";
        betObject.horseNo = "";
        betObject.amount = "";
    };

    $scope.placeBet = function() {
        $scope.betObject.betType = $filter('uppercase')($scope.betObject.betType);
        $scope.betList.push(angular.copy($scope.betObject));
        $scope.clearBet($scope.betObject);
    };

    /* Update the service with the latest list */
    $scope.$watch('betList', function(newList, oldList){
        BetDataService.setBetList(newList);
    }, true);

    /*Route user to result page*/
    $scope.submitResults = function() {
        BetDataService.setResultObject($scope.betResult);
        $location.path("/results");
    };


}]);
