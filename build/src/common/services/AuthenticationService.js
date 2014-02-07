angular.module('app').factory('AuthenticationService', [
  '$location',
  function ($location) {
    var _this = this;
    this.authenticated = false;
    this.name = null;
    return {
      isAuthenticated: function () {
        return _this.authenticated;
      },
      getName: function () {
        return _this.name;
      },
      login: function (credentials) {
        if (credentials.username === 'rubens') {
          _this.name = credentials.username;
          _this.authenticated = true;
          $location.path('/');
        }
      },
      logout: function () {
        _this.name = null;
        _this.authenticated = false;
        $location.path('/login');
      }
    };
  }
]);