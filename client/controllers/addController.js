angular.module('homework.addAssignment', [])
.controller('addController', ['$scope', '$http', '$rootScope', '$stateParams', '$state',function($scope, $http, $rootScope, $stateParams, $state) {
  $scope.newEvent ={};
  $scope.returnMain = function() {
    console.log('here in addController ', $rootScope.assignmentList);
    $scope.newEvent.id=1234;
    $rootScope.assignmentList[1234]= $scope.newEvent;
    $state.go('home');
  }


}]);