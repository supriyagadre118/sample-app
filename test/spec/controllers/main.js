'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('sampleApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of sample data to the scope', function () {
    expect(MainCtrl.sampleData.length).toBe(3);
  });
});
