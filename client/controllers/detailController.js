angular.module('homework.detail', [])
.controller('detailController', ['$scope', '$http', '$rootScope', '$stateParams',function($scope, $http, $rootScope, $stateParams) {
  console.log('state id', $stateParams);
  var url = 'https://api.edmodo.com/assignment_submissions?assignment_id='+$stateParams.id+'&assignment_creator_id=73240721&access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d'
  $scope.submissionList ={};
  $scope.showI = true;
  $scope.show2 = false;

  $scope.selectVisible = function() {
    $scope.showI = true;
    $scope.show2 = false;
  }

  $scope.selectVisible2 = function() {
    $scope.show2 = true;
    $scope.showI = false;
  }

  $scope.getSubmission = function() {
    $http.get(url).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(data);
        for (var i = 0; i < data.length; i++) {
          $scope.submissionList[data[i].title] = data[i];
        }
        //console.log($scope.assignmentList);
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('error getting data');
      });
  }

}]);