/**
 * Created by Supriya on 26/5/17.
 */
'use strict';

angular.module('sampleApp')
  .factory('appService', ['$http', '$q', function ($http, $q) {

    return {
      getSampleData: function () {
        return ($http({
          method: "GET",
          url: "http://localhost:7200/server/data/sampledata.json",
          params: {
            action: "GET"
          }
        }).then(function (response) {
          return (response.data);
        }, function (error) {
          return ($q.reject('' + error));
        }));
      }
    };

  }]);
