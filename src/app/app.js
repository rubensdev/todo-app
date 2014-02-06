angular.module('app', ['home','firstrun', 'templates-app', 'templates-common', 'ngRoute'])

.run(['$rootScope', 'tasksStorage', '$location', function($rootScope, tasksStorage, $location){
	var lang = (window.navigator.userLanguage || window.navigator.language).substring(0,2);
	if(lang !== 'es' && lang !== 'en'){
		$rootScope.lang = 'en';
	} else {
		$rootScope.lang = lang;		
	}
	var firstRun = tasksStorage.isFirstRun();
	if(firstRun){
		$location.path('/firstrun');
	} else {
		$location.path('/home');
	}
}]);

