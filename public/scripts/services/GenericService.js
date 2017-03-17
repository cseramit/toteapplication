punterApp.service("GenericService", function() {
    var self = this;

    self.validateString = function(stringValue) {
        return (angular.isDefined(stringValue) && stringValue != '');
    }
});
