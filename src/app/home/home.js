angular.module('home',['ngRoute','rzModule'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/home', {
		templateUrl: 'home/home.tpl.html',
		controller: 'HomeController',
		title: 'Home'
	});
}])

.controller('HomeController', ['$scope', '$routeParams', 'tasksStorage', 
   '$location', '$timeout','COLORS', 'SETTINGS',
   function($scope, $routeParams, tasksStorage, $location, $timeout, COLORS, SETTINGS){
		var tasks = $scope.tasks = tasksStorage.get();
		
		$scope.color = SETTINGS.DEF_TASK_COLOR;
		$scope.colorMax = COLORS.length() - 1;
		$scope.editing = false;
		$scope.newTask = '';
		$scope.showMenu = false;
		$scope.status = '';
		$scope.taskIndex = -1;

		/**
		 *	We watch if tasks object has changed (with some edited or added task)
		 * If we set the third argument as true, it will compare the object for 
		 * equality rather than for reference.
		**/
		$scope.$watch('tasks', function(newValue, oldValue){
			// This prevents unneeded calls to the localStorage
			if(newValue !== oldValue) {
				tasksStorage.put(tasks);
			}
		},true);

		$scope.addTask = function() {
			var newTask = $scope.newTask.trim();
			if (newTask.toLowerCase() === "rayuela"){
				$timeout(function(){
					tasksStorage.resetAllData();
					$location.path('/firstrun');
				},150);
				return;
			}
			if(!newTask.length){
				// TODO: We could manage the errors here.
				return;
			}
			tasks.push({
				title: newTask,
				color: $scope.color, 
				completed: false
			});	
			$scope.resetParams();
		};

		$scope.cancel = function() {
			$scope.resetParams();
		};

		/**
       * The statusFilter serves for filtering the tasks by Active, Completed 
		 * or both.
       **/
		$scope.changeStatus = function(status) {
			$scope.status = status;
			$scope.statusFilter = (status === 'active') ?
				{ completed: false } : (status === 'completed') ?
				{ completed: true } : null;
		};

		$scope.colorTranslate = function(value) {
			var color = COLORS.getColor(value);
			header.style.backgroundColor = color[1];
			return color[0];
		};

		$scope.countChars = function(){
			if ((SETTINGS.REMAINING_CHARS - $scope.newTask.length) <= 0) {
				$scope.maxLength = true;
			} else {
				$scope.maxLength = false;
			}
			return parseInt((SETTINGS.REMAINING_CHARS - $scope.newTask.length), 10);
		};

		$scope.editTask = function(task) {
			$scope.taskIndex = parseInt(tasks.indexOf(task),10);
			$scope.newTask = task.title;
			$scope.color = task.color;
			$scope.editing = true;
			$scope.showPanel();
		};

		$scope.doneEditing = function() {
			var task = tasks[$scope.taskIndex];
			task.title = $scope.newTask.trim();
			task.color = $scope.color;
		
			if(!task.title) {
				$scope.removeTask(task);
			}
			$scope.resetParams();
		};

		$scope.getTaskColor = function(index){
			return COLORS.getColor(index)[1];
		};

		$scope.hidePanel = function(){
			$scope.showTaskPanel = false;
			$scope.showMenu = false;
		};

		$scope.removeTask = function(task) {
			tasks.splice(tasks.indexOf(task), 1);
		};

		$scope.resetParams = function() {
			$scope.newTask = '';
			$scope.color = SETTINGS.DEF_TASK_COLOR;
			$scope.editing = false;
			$scope.taskIndex = -1;
			$scope.hidePanel();
		};

		$scope.showPanel = function() {
			$scope.showTaskPanel = true;
			$scope.showMenu = false;
		};
}]);

/**
 * TODO: When focus on an text input element, the keyboard is not displayed (Android Chrome). Why!?
 **/
