punterApp.service('BetDataService', ['$filter', '$http', '$q',  function($filter, $http, $q){

    var self = this;
    var betList = [];
    var placeList = [];
    var resultObject = {};

    var winObject = {
        "horseNo": "",
        "dividendAmount": ""
    };

    self.addToBetList = function(betObject) {
        betList.push(angular.copy(betObject));
    };

    self.getBetList = function() {
        return betList;
    };

    self.setResultObject = function(argResObject) {
        resultObject = angular.copy(argResObject);
    };

    self.getResultObject = function() {
        return resultObject;
    };

    self.getWinDividendFromBackend = function() {
        var defer = $q.defer();

        /*Step1. Filter the WIN bets*/
        var winList = $filter('betListFilter')(betList, 'W');

        /*Step 2. Create Object for sending it to backend */
        var payload = {};
        payload.request = {};
        payload.request.winList      = winList;
        payload.request.winObject = resultObject;

        $http({
            method: 'POST',
            data: payload,
            url: '/calculateWinDividend'
        }).then(function successCallback(response) {
            if(response.status == 200) {
                defer.resolve(response.data);
            }else {
                defer.resolve([]);
            }
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            defer.reject(response);
        });

        return defer.promise;
    };


    self.getPlaceDividendFromBackend = function() {

        var defer = $q.defer();
        var payLoad = {};
        payLoad.request = {};
        payLoad.request.placeList = $filter('betListFilter')(betList, 'P');
        payLoad.request.winObject = resultObject;

        $http({
            url: '/calculatePlaceDividend',
            method: "POST",
            data: payLoad
        }).then(function(response){
            if(response.status == 200){
                defer.resolve(response.data);
            }else {
                defer.resolve([]);
            }

        },function(data){
            defer.reject(response);
        });

        return defer.promise;

    }


}]);