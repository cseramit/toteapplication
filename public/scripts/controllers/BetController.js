punterApp.controller('BetController', ['$scope', '$location', '$filter', 'BetDataService', function($scope, $location, $filter, BetDataService) {

    $scope.betObject = {
        "betType": "",
        "horseNo": "",
        "amount": 0
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
        betObject.amount = 0;
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



    $scope.validateBet = function(){
        if(angular.isDefined($scope.betObject.horseNo) && angular.isDefined($scope.betObject.betType) ) {
            if($scope.betObject.horseNo != '' && $scope.betObject.betType != '') {
                return true;
            }
        }
        return false;
    };

    $scope.validateResults = function() {
        if(angular.isDefined($scope.betResult.first) && angular.isDefined($scope.betResult.second) && angular.isDefined($scope.betResult.third) ) {
            if($scope.betResult.first != '' && $scope.betResult.second != '' && $scope.betResult.third != '') {
                return true;
            }
        }
        return false;
    };

}]);
