punterApp.service('BetDataService', ['$filter', function($filter){

   var self = this;
   var betList = [];
   var resultObject = {};

   var winObject = {
        "horseNo": "",
        "dividendAmount": ""
    };
    var placeList = [];

   self.setBetList = function(argBetList) {
       betList = angular.copy(argBetList);
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

    self.getWinDividend = function() {
        var totalBetAmount = 0;
        var totalWinAmount = 0;
        var winner = resultObject.first;

        /*Step1. Filter the WIN bets*/
        var winList = $filter('betListFilter')(betList, 'W');

        /*Step2. Sum of betAmount on all bets and Sum of betAmount on winning bets*/
        angular.forEach(winList, function(value, key){
            totalBetAmount = parseFloat(parseFloat(totalBetAmount) + parseFloat(value.amount)).toFixed(2);
            if(value.horseNo == winner) {
                totalWinAmount = parseFloat(parseFloat(totalWinAmount) + parseFloat(value.amount)).toFixed(2);
            }
        });

        /*Calculate Dividend after 15% commission*/
        winObject.horseNo = winner;


        if(winObject.totalWinAmount <= 0 ) {
            winObject.dividendAmount = 'Not Applicable';
        }else {
            winObject.dividendAmount = parseFloat((0.85 * parseFloat(totalBetAmount)) / parseFloat(totalWinAmount)).toFixed(2);

            /* Handle the case where you dont have bet for one of the winning horses */
            if (isNaN(winObject.dividendAmount)) {
                winObject.dividendAmount = 'Not Applicable';
            }
        }

        return winObject;
    };

    self.getPlaceDividend = function() {

        var totalBetAmount = 0;
        var totalWinAmount = 0;
        var placeMap = {};
        var returnList = [];

        /*Step1. Filter the WIN bets*/
        var placeList = $filter('betListFilter')(betList, 'P');

        var totalWinBets = Object.keys(resultObject).length;

        /*Step 2. Create a Map with total Bet Amount against each of the winning horse from the WIN list*/
        angular.forEach(placeList, function(value, key){
            totalBetAmount = parseFloat(parseFloat(totalBetAmount) + parseFloat(value.amount)).toFixed(2);
            if(!angular.isDefined(placeMap[value.horseNo])){
                placeMap[value.horseNo] = {};
                placeMap[value.horseNo].totalWinAmount = 0;
            }

            if( (value.horseNo == resultObject.first)
               ||(value.horseNo == resultObject.second)
               ||(value.horseNo == resultObject.third) ){
                placeMap[value.horseNo].totalWinAmount = (parseFloat(placeMap[value.horseNo].totalWinAmount) + parseFloat(value.amount) ).toFixed(2);
                totalWinAmount = parseFloat(parseFloat(totalWinAmount) + parseFloat(value.amount)).toFixed(2);
            }

            if(key == placeList.length - 1) {
                var listObj = {};
                /*Step 3. Calculate the dividend amount after 12% commission payable to TAB*/
                var poolAfterTabCommission = parseFloat(0.88 * parseFloat(totalBetAmount)).toFixed(2);
                var poolWinAmount = parseFloat(parseFloat(poolAfterTabCommission) / totalWinBets ).toFixed(2);

                /* Handle the case where you don't have bet for one of the winning horses */
                if(angular.isDefined(placeMap[resultObject.first])) {
                    listObj.dividendAmount = parseFloat(parseFloat(poolWinAmount) / parseFloat(placeMap[resultObject.first].totalWinAmount)).toFixed(2);
                    listObj.horseNo = resultObject.first;
                }else{
                    listObj.dividendAmount = 'Not Applicable';
                    listObj.horseNo = resultObject.first;
                }

                returnList.push(listObj);
                listObj = {};

                /* Handle the case where you don't have bet for one of the winning horses */
                if(angular.isDefined(placeMap[resultObject.second])) {
                    listObj.dividendAmount = parseFloat(parseFloat(poolWinAmount) / parseFloat(placeMap[resultObject.second].totalWinAmount)).toFixed(2);
                    listObj.horseNo = resultObject.second;
                }else {
                    listObj.dividendAmount = 'Not Applicable';
                    listObj.horseNo = resultObject.second;
                }

                returnList.push(listObj);
                listObj = {};

                /* Handle the case where you don't have bet for one of the winning horses */
                if(angular.isDefined(placeMap[resultObject.third])) {
                    listObj.dividendAmount = parseFloat(parseFloat(poolWinAmount) / parseFloat(placeMap[resultObject.third].totalWinAmount)).toFixed(2);
                    listObj.horseNo = resultObject.third;
                }else {
                    listObj.dividendAmount = 'Not Applicable';
                    listObj.horseNo = resultObject.third;
                }

                returnList.push(listObj);

            }
        });

        return returnList;
    }


}]);