angular.module('homework.detail', [])
.controller('detailController', ['$scope', '$http', '$rootScope', '$stateParams',function($scope, $http, $rootScope, $stateParams) {
  // initial parameters
  var url = 'https://api.edmodo.com/assignment_submissions?assignment_id=' + $stateParams.id + '&assignment_creator_id=73240721&access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d'
  $scope.submissionList = {};
  $scope.showAssignment = true;
  $scope.showSubmission = false;
  $scope.id = $stateParams.id;

  $scope.selectAssignment = function() {
    $scope.showAssignment = true;
    $scope.showSubmission = false;
  };

  $scope.selectSubmission = function() {
    $scope.showSubmission = true;
    $scope.showAssignment = false;
  };

  // fetch API to get submissions
  $scope.getSubmission = function() {
    $http.get(url).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        for (var i = 0; i < data.length; i++) {
          $scope.submissionList[data[i].id] = data[i];
          $scope.submissionList[data[i].id].show = false;
        }
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('error getting data');
      });
  };

  $scope.toggleStudentSubmission = function(submission) {
    submission.show = !submission.show;
  };

  // fetch API to get assignment
  $scope.getURL = function(id) {
    $http.get('https://api.edmodo.com/assignments?access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d').
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        for (var i = 0; i < data.length; i++) {
          $rootScope.assignmentList[data[i].id] = data[i];
          if (parseInt(data[i].id) == id) {
            $rootScope.assignmentList[data[i].id].selected = true;
          } else {
            $rootScope.assignmentList[data[i].id].selected = false;
          } 
        }
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('error getting data');
      });
  };

  // initialization function to fetch the questions and student submissions
  $scope.init = function() {
    $scope.getURL($scope.id);
    $scope.getSubmission();
  };

  $scope.transformDate = function(assignmentDate) {
    return new Date(assignmentDate).toLocaleString();
  }
}]);
