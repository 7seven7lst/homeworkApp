angular.module('homework.addAssignment', [])
.controller('addController', ['$scope', '$http', '$rootScope', '$stateParams', '$state',function($scope, $http, $rootScope, $stateParams, $state) {
  $scope.returnMain = function() {
    console.log('here in addController ', $rootScope.assignmentList);
    $rootScope.assignmentList[1234]= {title:'test'};
    $state.go('home');
  }


}]);