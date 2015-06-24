angular.module('homework', ['ui.router', 'homework.detail','homework.addAssignment'])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      views: {
            main_content: {
              controller: 'mainController'
            }
          }
    })
    .state('add', {
      url: '/add',
      views: {
            addAssignment: {
               templateUrl: './views/addView.html',
               controller: 'addController'
            }
          }
    })
    .state('detail', {
      url: '/detail/:id', 
      views: {
        detail: {
          templateUrl: './views/detailView.html', 
          controller: 'detailController'
        }
      }, 
      resolve:{
      id: ['$stateParams', function($stateParams){
          return $stateParams.Id;
      }]
   }
    });
})

.controller("mainController", ['$scope', '$http','$rootScope', '$state', '$stateParams',function($scope, $http, $rootScope, $state, $stateParams) {
  $scope.test='mainController';
  $rootScope.assignmentList = {};

  $scope.getURL = function() {
    if (Object.keys($rootScope.assignmentList).length === 0  ) {
      $http.get('https://api.edmodo.com/assignments?access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d').
        success(function(data, status, headers, config) {
          // this callback will be called asynchronously
          // when the response is available
          for (var i = 0; i < data.length; i++) {
            $rootScope.assignmentList[data[i].id] = data[i];
            $rootScope.assignmentList[data[i].id].selected = false;
          }
          //console.log($scope.assignmentList);
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log('error getting data');
        });
    }
   
  };

  // go to Assignment and Submission details view
  $scope.goToDetail = function(assignment) {
    $stateParams.id= assignment.id;
    assignment.selected = true;
    for (var key in $rootScope.assignmentList) {
      if (key != assignment.id) {
        $rootScope.assignmentList[key].selected = false;
      }
    }
    $state.go('detail', {id:assignment.id});
  };

  // got to addAssginment View
  $scope.addAssignment = function() {
    $state.go('add');
  };

  $scope.transformDate = function(assignment) {
    return new Date(assignment.due_at).toLocaleString();
  }
}]);


