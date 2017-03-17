'use strict';

class dividendCalculator {

    static calculateWinDividend(winList , winObject) {
        var returnList = [];
        var retObject = {};
        var winner = winObject.first;
        var totalBetAmount = 0;
        var totalWinAmount = 0;

        for(var index=0; index < winList.length; index++) {
            totalBetAmount = totalBetAmount + parseFloat(winList[index].amount);
            if(winList[index].horseNo == winner) {
                totalWinAmount = totalWinAmount + parseFloat(winList[index].amount);
            }
        }

        retObject.horseNo = winner;

        if(totalWinAmount <= 0 ) {
            retObject.dividendAmount = 0;
        }else {
            retObject.dividendAmount = parseFloat((0.85 * totalBetAmount) / totalWinAmount).toFixed(2);


            if (isNaN(retObject.dividendAmount)) {
                retObject.dividendAmount = 0;
            }
        }

        returnList.push(retObject);
        return returnList;

    }


    static calculatePlaceDividend (placeList, winObject) {

        var totalBetAmount = 0;
        var totalWinAmount = 0;
        var placeMap = {};
        var returnList = [];

        /*Step 2. Create a Map with total Bet Amount against each of the winning horse from the WIN list*/
        for(var index=0; index < placeList.length; index++) {
            totalBetAmount = totalBetAmount + parseFloat(placeList[index].amount);

            if(!placeMap[placeList[index].horseNo]){
                placeMap[placeList[index].horseNo] = {};
                placeMap[placeList[index].horseNo].totalWinAmount = 0;
            }

            if( (placeList[index].horseNo == winObject.first)
                ||(placeList[index].horseNo == winObject.second)
                ||(placeList[index].horseNo == winObject.third) ){
                placeMap[placeList[index].horseNo].totalWinAmount = placeMap[placeList[index].horseNo].totalWinAmount + parseFloat(placeList[index].amount);
                totalWinAmount = totalWinAmount + parseFloat(placeList[index].amount);
            }
        }

        var listObj = {};
        /*Step 3. Calculate the dividend amount after 12% commission payable to TAB*/
        var poolAfterTabCommission = 0.88 * totalBetAmount;
        var poolWinAmount = poolAfterTabCommission / 3;

        /* Handle the case where you don't have bet for one of the winning horses */
        if(placeMap[winObject.first]) {
            listObj.dividendAmount = poolWinAmount / placeMap[winObject.first].totalWinAmount;
            listObj.dividendAmount = listObj.dividendAmount.toFixed(2);
            listObj.horseNo = winObject.first;
        }else{
            listObj.dividendAmount = 0;
            listObj.horseNo = winObject.first;
        }
        returnList.push(listObj);


        listObj = {};

        /* Handle the case where you don't have bet for one of the winning horses */
        if(placeMap[winObject.second]) {
            listObj.dividendAmount = poolWinAmount / placeMap[winObject.second].totalWinAmount;
            listObj.dividendAmount = listObj.dividendAmount.toFixed(2);
            listObj.horseNo = winObject.second;
        }else {
            listObj.dividendAmount = 0;
            listObj.horseNo = winObject.second;
        }
        returnList.push(listObj);

        listObj = {};

        /* Handle the case where you don't have bet for one of the winning horses */
        if(placeMap[winObject.third]) {
            listObj.dividendAmount = poolWinAmount / placeMap[winObject.third].totalWinAmount;
            listObj.dividendAmount = listObj.dividendAmount.toFixed(2);
            listObj.horseNo = winObject.third;
        }else {
            listObj.dividendAmount = 0;
            listObj.horseNo = winObject.third;
        }
        returnList.push(listObj);


        return returnList;
    }

}

module.exports = dividendCalculator;

