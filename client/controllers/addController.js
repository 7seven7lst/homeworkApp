angular.module('homework.addAssignment', [])
.controller('addController', ['$scope', '$http', '$rootScope', '$stateParams', '$state',function($scope, $http, $rootScope, $stateParams, $state) {
  $scope.newEvent = {};

  // add new event and return to main view
  $scope.returnMain = function() {
    $scope.newEvent.due_at = new Date($scope.newEvent.due_at);
    var myID = 1;
    while ($rootScope.assignmentList[myID] !== undefined && myID < 100000000) {
      myID++;
    }

    $scope.newEvent.id = myID;
    $rootScope.assignmentList[$scope.newEvent.id] = $scope.newEvent;
    $state.go('home');
  };
}]);
