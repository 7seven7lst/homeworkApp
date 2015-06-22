angular.module('homework.assignmentList', [])
.controller('assignmentListController', ['$scope', '$http', function($scope, $http) {
  $scope.msg='assignmentListController';
  $scope.assignmentList = {};

  $scope.getURL = function() {
    $http.get('https://api.edmodo.com/assignments?access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d').
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(data);
        for (var i = 0; i < data.length; i++) {
          $scope.assignmentList[data[i].title] = data[i];
        }
        //console.log($scope.assignmentList);
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('error getting data');
      });
  };
}]);