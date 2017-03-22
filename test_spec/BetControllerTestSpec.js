describe('Specification for BetController', function() {

    beforeEach(module('punterApp'));

    var $controller,$injector, BetController, $location, $filter, betDataService, genericService;

    beforeEach(inject(function(_$controller_, _$filter_, _$location_, GenericService, BetDataService){
        $controller = _$controller_;
        $location   = _$location_;
        $filter   = _$filter_;
        genericService = GenericService;
        betDataService = BetDataService;
    }));

    describe('Tests clearBet Method', function() {
        var $scope, controller;

        beforeEach(function(){
            $scope = {};
            controller = $controller('BetController', { $scope: $scope, $location: $location, $filter: $filter, BetDataService: betDataService,GenericService: genericService});
            $scope.betObject = {
                betType: 'P',
                horseNo: '2',
                amount: 10000
            };
        });

        it('should validate the value of betType after clearBet', function() {
            $scope.clearBet();
            expect($scope.betObject.betType).toEqual('');
        });

        it('should validate the value of horseNo after clearBet', function() {
            $scope.clearBet();
            expect($scope.betObject.horseNo).toEqual('');
        });

        it('should validate the value of amount after clearBet', function() {
            $scope.clearBet();
            expect($scope.betObject.amount).toEqual(0);
        });

    });


    describe('Tests placeBet Method', function() {
        var $scope, controller;

        beforeEach(function(){
            $scope = {};
            $scope.betList = [];
            controller = $controller('BetController', { $scope: $scope, $location: $location, $filter: $filter, BetDataService: betDataService,GenericService: genericService});
            $scope.betObject = {
                betType: 'p',
                horseNo: '2',
                amount: 10000
            };
        });

        it('should validate the value of betType after clearBet', function() {
            $scope.placeBet();
            expect($scope.betObject.betType).toEqual('');
        });

        it('should validate the value of horseNo after clearBet', function() {
            $scope.placeBet();
            expect($scope.betObject.horseNo).toEqual('');
        });

        it('should validate the value of amount after clearBet', function() {
            $scope.placeBet();
            expect($scope.betObject.amount).toEqual(0);
        });

        it('should validate the length of betList', function() {
            $scope.placeBet();
            expect($scope.betList.length).toEqual(1);
        });

        it('confirm the list update in the BetDataService', function() {
            $scope.placeBet();
            $scope.placeBet();
            expect(betDataService.getBetList().length).toEqual(2);
        });

    });



    describe('Verify validateBet', function() {
        var $scope, controller;

        beforeEach(function(){
            $scope = {};
            controller = $controller('BetController', { $scope: $scope, $location: $location, $filter: $filter, BetDataService: betDataService,GenericService: genericService});
        });

        it('test the validity of bet object', function() {
            $scope.betObject = {
                betType: 'P',
                horseNo: '2',
                amount: 10000
            };
            expect($scope.validateBet()).toEqual(true);
        });


        it('test the validity of bet object - horseNo. invalid', function() {
            $scope.betObject = {
                betType: 'P',
                horseNo: '',
                amount: 10000
            };
            expect($scope.validateBet()).toEqual(false);
        });



        it('test the validity of bet object - amount invalid', function() {
            $scope.betObject = {
                betType: 'P',
                horseNo: '3',
                amount: 0
            };
            expect($scope.validateBet()).toEqual(false);
        });


        it('test the validity of bet object - betType invalid', function() {
            $scope.betObject = {
                betType: '',
                horseNo: '3',
                amount: 0
            };
            expect($scope.validateBet()).toEqual(false);
        });

        it('test the validity of bet object - amount and betType invalid', function() {
            $scope.betObject = {
                betType: '',
                horseNo: '3',
                amount: 0
            };
            expect($scope.validateBet()).toEqual(false);
        });


        it('test the validity of bet object - amount and horse No invalid', function() {
            $scope.betObject = {
                betType: 'P',
                horseNo: '',
                amount: 0
            };
            expect($scope.validateBet()).toEqual(false);
        });


        it('test the validity of bet object - betType and horse No invalid', function() {
            $scope.betObject = {
                betType: '',
                horseNo: '',
                amount: 10
            };
            expect($scope.validateBet()).toEqual(false);
        });



        it('test the validity of bet object - all invalid', function() {
            $scope.betObject = {
                betType: '',
                horseNo: '',
                amount: 0
            };
            expect($scope.validateBet()).toEqual(false);
        });

    });

    describe('Verify validateResults', function() {
        var $scope, controller;

        beforeEach(function(){
            $scope = {};
            controller = $controller('BetController', { $scope: $scope, $location: $location, $filter: $filter, BetDataService: betDataService,GenericService: genericService});
        });

        it('test the validity of results: All Valid', function() {
            $scope.betResult = {
                first: '1',
                second: '2',
                third: '3'
            };
            expect($scope.validateResults()).toEqual(true);
        });

        it('test the validity of results: All Valid', function() {
            $scope.betResult = {
                first: '',
                second: '2',
                third: '3'
            };
            expect($scope.validateResults()).not.toEqual(true);
        });

        it('test the validity of results: All Valid', function() {
            $scope.betResult = {
                first: '1',
                second: '',
                third: '3'
            };
            expect($scope.validateResults()).not.toEqual(true);
        });

        it('test the validity of results: All Valid', function() {
            $scope.betResult = {
                first: '1',
                second: '2',
                third: ''
            };
            expect($scope.validateResults()).not.toEqual(true);
        });


    });


    describe('Verify submitResults', function() {
        var $scope, controller;

        beforeEach(function(){
            $scope = {};
            controller = $controller('BetController', { $scope: $scope, $location: $location, $filter: $filter, BetDataService: betDataService,GenericService: genericService});
            $scope.betObject = {
                betType: 'P',
                horseNo: '2',
                amount: 10000
            };
            $scope.betResult = {
                first: '1',
                second: '2',
                third: '3'
            };
            $scope.placeBet();
            $scope.placeBet();
            $scope.placeBet();
        });

        it('test the location', function() {
            $scope.submitResults();
            expect(betDataService.getResultObject()).toBeDefined();
            expect(betDataService.getResultObject()).toEqual({first: '1', second: '2', third: '3'});
            expect($location.path()).toBe('/results');
        });

    });


});