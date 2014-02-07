angular.module('app').factory('tasksStorage', function () {
  var STORAGE_ID = 'app-tasks';
  return {
    get: function () {
      return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    },
    put: function (tasks) {
      return localStorage.setItem(STORAGE_ID, JSON.stringify(tasks));
    },
    isFirstRun: function () {
      return JSON.parse(localStorage.getItem('firstRun') || true);
    },
    setFirstRun: function (flag) {
      return localStorage.setItem('firstRun', flag);
    },
    resetAllData: function () {
      localStorage.clear();
    }
  };
});