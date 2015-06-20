angular.module('homework', ['ui.router', 'homework.t1'])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      views: {
            nav: {
               templateUrl: './views/t1View.html',
               controller: 't1Controller'
            },
            main_content: {
              controller: 'mainController'
            }
          }
    });
})

.controller("mainController", ['$scope', function($scope) {
  $scope.test='mainController';
}]);

