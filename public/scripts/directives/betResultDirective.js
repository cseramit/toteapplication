punterApp.directive('betResultPanel', function() {
    return {
        templateUrl: '/assets/templates/betResultPanel.html',
        restrict: 'E',
        transclude: true,
        scope: {
            resultList: '=',
            panelTitle: '@'
        }
    };
});

