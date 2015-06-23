angular.module('homework.detail', [])
.controller('detailController', ['$scope', '$http', '$rootScope', '$stateParams',function($scope, $http, $rootScope, $stateParams) {
  console.log('state id', $stateParams);
  var url = 'https://api.edmodo.com/assignment_submissions?assignment_id='+$stateParams.id+'&assignment_creator_id=73240721&access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d'
  $scope.submissionList ={};
  $scope.showI = true;
  $scope.show2 = false;

  console.log($rootScope.assignmentList);
  console.log($stateParams.id);
  $scope.id = $stateParams.id;
  $scope.selectVisible = function() {
    $scope.showI = true;
    $scope.show2 = false;
  };

  $scope.selectVisible2 = function() {
    $scope.show2 = true;
    $scope.showI = false;
  };

  $scope.getSubmission = function() {
    $http.get(url).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(data);
        for (var i = 0; i < data.length; i++) {
          $scope.submissionList[data[i].id] = data[i];
          $scope.submissionList[data[i].id].show = false;
        }
        //console.log($scope.assignmentList);
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

  $scope.getURL = function(id) {
    $http.get('https://api.edmodo.com/assignments?access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d').
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log('selected id is ', id);
        
        for (var i = 0; i < data.length; i++) {
          $rootScope.assignmentList[data[i].id] = data[i];
          console.log('data[i] id ', data[i].id)
          if (parseInt(data[i].id) == id) {
            console.log('heree');
            $rootScope.assignmentList[data[i].id].selected = true;
          } else {
            $rootScope.assignmentList[data[i].id].selected = false;
          }
          
        }
        console.log($scope.assignmentList);
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('error getting data');
      });
  };
  //$scope.getURL();
  $scope.init = function() {
    $scope.getURL($scope.id);
    $scope.getSubmission();
    //$rootScope.assignmentList[$scope.id].selected = true;
    //console.log('here', $rootScope.assignmentList[$scope.id]);
  }


}]);