angular.module('app', ['config', 'home', 'firstrun', 'templates-app', 'templates-common', 'ngRoute'])

.run(['$rootScope', 'tasksStorage', '$location', function($rootScope, tasksStorage, $location){
	var firstRun = tasksStorage.isFirstRun();
	if(firstRun){
		$location.path('/firstrun');
	} else {
		$location.path('/home');
	}
}]);

