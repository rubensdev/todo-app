angular.module('app').directive('taskFocus', [
  '$timeout',
  function taskFocus($timeout) {
    return function (scope, elem, attrs) {
      scope.$watch(attrs.taskFocus, function (newValue) {
        if (newValue) {
          $timeout(function () {
            elem[0].focus();
          }, 0, false);
        }
      });
    };
  }
]);