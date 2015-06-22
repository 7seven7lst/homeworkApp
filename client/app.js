angular.module('homework', ['ui.router', 'homework.assignmentList'])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      views: {
            assignmentList: {
               templateUrl: './views/assignmentListView.html',
               controller: 'assignmentListController'
            },
            main_content: {
              controller: 'mainController'
            }
          }
    });
})

.controller("mainController", ['$scope', '$http', function($scope, $http) {
  $scope.test='mainController';
  

}]);

