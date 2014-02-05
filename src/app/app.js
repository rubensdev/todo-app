angular.module('app', ['home','firstrun', 'ngRoute','templates-app'])

.run(['tasksStorage','$location', function(tasksStorage,$location){
	var firstRun = tasksStorage.isFirstRun();
	if(firstRun){
		$location.path('/firstrun');
	} else {
		$location.path('/home');
	}
}]);

