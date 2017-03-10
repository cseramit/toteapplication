punterApp.filter('betListFilter', function() {
   return function(inputList, betType) {
       /* Check and return the list where bet Type == betType passed in argument with the filter */
        var outputList = [];
        angular.forEach(inputList, function(value, key) {
            if(inputList[key].betType === betType) {
                outputList.push(inputList[key]);
            }
        });
        return outputList;
    }
});