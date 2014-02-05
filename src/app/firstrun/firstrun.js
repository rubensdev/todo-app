angular.module('firstrun',['ngRoute'])

.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/firstrun', {
		templateUrl: 'firstrun/firstrun.tpl.html',
		controller: 'FirstRunController',
		title: 'Welcome'
	});
}])

.controller('FirstRunController', ['$scope','tasksStorage','$location','$timeout', function($scope,tasksStorage,$location,$timeout){
	var cards = [];
	for(var i = 0; i < 3; i++){
		cards.push(document.getElementById('card' + i));
	}
	$scope.showLogo = false;
	$scope.showText = false;
	$scope.nextCard = 0;
	$timeout(function(){
		$scope.showLogo = true;
		$timeout(function(){ $scope.showText = true;}, 650);
   },750);
	$scope.next = function() {
		if($scope.nextCard === 2) {
			$timeout(function(){
				tasksStorage.setFirstRun(false);
				$location.path('/home');
			},875);
      }	
		$timeout(function() {
			cards[$scope.nextCard].style.display = 'none';
		},375);
		$scope.nextCard++;
	};
}]);
