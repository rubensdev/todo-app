angular.module('firstrun', ['ngRoute']).config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/firstrun', {
      templateUrl: 'firstrun/firstrun.tpl.html',
      controller: 'FirstRunController',
      title: 'Welcome'
    });
  }
]).controller('FirstRunController', [
  '$scope',
  'tasksStorage',
  '$location',
  '$timeout',
  function ($scope, tasksStorage, $location, $timeout) {
    var cards = document.getElementsByClassName('card');
    console.log(cards);
    $scope.showLogo = false;
    $scope.showText = false;
    $scope.nextCard = 2;
    $timeout(function () {
      $scope.showLogo = true;
      $timeout(function () {
        $scope.showText = true;
      }, 650);
    }, 750);
    $scope.next = function () {
      if ($scope.nextCard <= 0) {
        $timeout(function () {
          tasksStorage.setFirstRun(false);
          $location.path('/home');
        }, 875);
      }
      $scope.nextCard--;
    };
  }
]);