punterApp.controller('BetController', ['$scope', '$location', '$filter', 'BetDataService', 'GenericService', function($scope, $location, $filter, BetDataService, GenericService) {

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
    $scope.betList = [];

    $scope.clearBet = function() {
        $scope.betObject.betType = "";
        $scope.betObject.horseNo = "";
        $scope.betObject.amount = 0;
    };

    $scope.placeBet = function() {
        $scope.betObject.betType = $filter('uppercase')($scope.betObject.betType);
        $scope.betList.push(angular.copy($scope.betObject));
        BetDataService.addToBetList(angular.copy($scope.betObject));
        $scope.clearBet();
    };


    /*Route user to result page*/
    $scope.submitResults = function() {
        BetDataService.setResultObject($scope.betResult);
        $location.path("/results");
    };



    $scope.validateBet = function(){
        if(GenericService.validateString($scope.betObject.horseNo) && GenericService.validateString($scope.betObject.betType) && $scope.betObject.amount>0) {
            return true;
        }
        return false;
    };

    $scope.validateResults = function() {
        if(GenericService.validateString($scope.betResult.first) && GenericService.validateString($scope.betResult.second) && GenericService.validateString($scope.betResult.third) ) {
            return true;
        }
        return false;
    };

}]);
