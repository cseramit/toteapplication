punterApp.service("GenericService", [ function() {

    var self = this;

    self.validateString = function(stringValue) {
        return (angular.isDefined(stringValue) && stringValue != '');
    }

}]);


/*
* Test Case 1: Call with no value, expect false
* Test Case 2: Call with some string which is empty, expect false
* Test Case 3: Call with some string which is not empty, expect true
* */