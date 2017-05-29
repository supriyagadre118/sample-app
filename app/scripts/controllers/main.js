/**
 * Created by Supriya on 26/5/17.
 */
'use strict';

angular.module('sampleApp')
  .controller('MainCtrl', ['$scope','appService', '$q', function ($scope, appService, $q) {
    $scope.getData = function() {
      var deferred = $q.defer();

      appService.getSampleData()
        .then(function(data) {
          $scope.sampleData = data;
          $scope.displayData();
          deferred.resolve();
        }, function() {
          deferred.reject();
        });

      return deferred.promise;
    };

    $scope.displayData = function() {
      $scope.showData = true;
    };

  }]);
