'use strict';

class dividendCalculator {

    static calculateWinDividend(winList , winObject) {
        var returnList = [];
        var retObject = {};
        var winner = winObject.first;
        var totalBetAmount = 0;
        var totalWinAmount = 0;

        for(var index=0; index < winList.length; index++) {
            totalBetAmount = parseFloat(parseFloat(totalBetAmount) + parseFloat(winList[index].amount)).toFixed(2);
            if(winList[index].horseNo == winner) {
                totalWinAmount = parseFloat(parseFloat(totalWinAmount) + parseFloat(winList[index].amount)).toFixed(2);
            }
        }

        retObject.horseNo = winner;

        if(totalWinAmount <= 0 ) {
            retObject.dividendAmount = 'Not Applicable';
        }else {
            retObject.dividendAmount = parseFloat((0.85 * parseFloat(totalBetAmount)) / parseFloat(totalWinAmount)).toFixed(2);


            if (isNaN(retObject.dividendAmount)) {
                retObject.dividendAmount = 'Not Applicable';
            }
        }

        returnList.push(retObject);
        return returnList;

    };


    static calculatePlaceDividend (placeList, winObject) {

        var totalBetAmount = 0;
        var totalWinAmount = 0;
        var placeMap = {};
        var returnList = [];

        var totalWinBets = Object.keys(winObject).length;

        /*Step 2. Create a Map with total Bet Amount against each of the winning horse from the WIN list*/
        for(var index=0; index < placeList.length; index++) {
            totalBetAmount = parseFloat(parseFloat(totalBetAmount) + parseFloat(placeList[index].amount)).toFixed(2);

            if(!placeMap[placeList[index].horseNo]){
                placeMap[placeList[index].horseNo] = {};
                placeMap[placeList[index].horseNo].totalWinAmount = 0;
            }

            if( (placeList[index].horseNo == winObject.first)
                ||(placeList[index].horseNo == winObject.second)
                ||(placeList[index].horseNo == winObject.third) ){
                placeMap[placeList[index].horseNo].totalWinAmount = (parseFloat(placeMap[placeList[index].horseNo].totalWinAmount) + parseFloat(placeList[index].amount) ).toFixed(2);
                totalWinAmount = parseFloat(parseFloat(totalWinAmount) + parseFloat(placeList[index].amount)).toFixed(2);
            }

            if(index == placeList.length - 1) {
                var listObj = {};
                /*Step 3. Calculate the dividend amount after 12% commission payable to TAB*/
                var poolAfterTabCommission = parseFloat(0.88 * parseFloat(totalBetAmount)).toFixed(2);
                var poolWinAmount = parseFloat(parseFloat(poolAfterTabCommission) / totalWinBets ).toFixed(2);

                /* Handle the case where you don't have bet for one of the winning horses */
                if(placeMap[winObject.first]) {
                    listObj.dividendAmount = parseFloat(parseFloat(poolWinAmount) / parseFloat(placeMap[winObject.first].totalWinAmount)).toFixed(2);
                    listObj.horseNo = winObject.first;
                }else{
                    listObj.dividendAmount = 'Not Applicable';
                    listObj.horseNo = winObject.first;
                }

                returnList.push(listObj);
                listObj = {};

                /* Handle the case where you don't have bet for one of the winning horses */
                if(placeMap[winObject.second]) {
                    listObj.dividendAmount = parseFloat(parseFloat(poolWinAmount) / parseFloat(placeMap[winObject.second].totalWinAmount)).toFixed(2);
                    listObj.horseNo = winObject.second;
                }else {
                    listObj.dividendAmount = 'Not Applicable';
                    listObj.horseNo = winObject.second;
                }

                returnList.push(listObj);
                listObj = {};

                /* Handle the case where you don't have bet for one of the winning horses */
                if(placeMap[winObject.third]) {
                    listObj.dividendAmount = parseFloat(parseFloat(poolWinAmount) / parseFloat(placeMap[winObject.third].totalWinAmount)).toFixed(2);
                    listObj.horseNo = winObject.third;
                }else {
                    listObj.dividendAmount = 'Not Applicable';
                    listObj.horseNo = winObject.third;
                }

                returnList.push(listObj);

            }
        }
        return returnList;
    };

}

module.exports = dividendCalculator;

