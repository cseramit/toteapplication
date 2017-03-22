
describe("Generic Service Testing ", function(){

    var genericService;

    beforeEach(module('punterApp'));

    beforeEach(inject(function($injector) {
        genericService = $injector.get('GenericService');
    }));

    it("should be able to test null value", function() {
        expect(genericService.validateString()).toEqual(false);
    });

    it("should be able to test empty string value", function() {
        expect(genericService.validateString('')).toEqual(false);
    });

    it("should be able to test valid string value", function() {
        expect(genericService.validateString('P')).toEqual(true);
    });
});