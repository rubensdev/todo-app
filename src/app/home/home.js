angular.module('home',['ngRoute','rzModule','pascalprecht.translate'])

.config(['$routeProvider','$translateProvider', function($routeProvider,$translateProvider){
	$routeProvider.when('/home', {
		templateUrl: 'home/home.tpl.html',
		controller: 'HomeController',
		title: 'Home'
	});
	$translateProvider.translations('en', {
		'ALLTASKS'        : 'All',
		'ACTIVETASKS'     : 'Active',
		'CANCEL_BTN'      : 'Cancel',
		'COMPLETEDTASKS'  : 'Completed',
		'EDIT_BTN'        : 'Edit',
		'SUBMIT_BTN'      : 'Submit',
		'TASKCOLOR_TITLE' : 'Task Color', 
		'TEXTAREA_PH'     : 'Mmm... What needs to be done?'
	})
	.translations('es', {
		'ALLTASKS'        : 'Todas',
		'ACTIVETASKS'     : 'Activas',
		'CANCEL_BTN'      : 'Cancelar',
		'COMPLETEDTASKS'  : 'Completadas',
		'EDIT_BTN'        : 'Editar',
		'SUBMIT_BTN'      : 'Aceptar',
		'TASKCOLOR_TITLE' : 'Color de la tarea',
		'TEXTAREA_PH'     : 'Mmm... ¿Qué hay que hacer?'
	});
}])

.controller('HomeController', ['$rootScope', '$scope', '$routeParams', 
   'tasksStorage', '$location', '$timeout', '$translate',
   function($rootScope, $scope, $routeParams, tasksStorage, $location, $timeout, $translate){
		var tasks = $scope.tasks = tasksStorage.get();
		var colorsArray = [
			'#1abc9c', '#2ecc71', '#3498db',
			'#9b59b6', '#34495e', '#f1c40f',
			'#e67e22', '#95a5a6', '#e74c3c',
			'#d35400'];
		var colorsNameArray = [
			'Turquoise', 'Emerald', 'Peter River', 
			'Amethyst', 'Wet Asphalt', 'Sun Flower',
			'Carrot', 'Concrete', 'Alizarin',
			'Orange'
		];
		$translate.uses($rootScope.lang);
		$scope.color = 8;
		$scope.colorMax = colorsArray.length -1 ;
		$scope.newTask = '';
		$scope.editing = false;
		$scope.taskIndex = -1;
		$scope.showMenu = false;
		$scope.status = '';
	

		/**
		 *	We watch if tasks object has changed (with some edited or added task)
		 * If we set the third argument as true, it will compare the object for 
		 * equality rather than for reference.
		**/
		$scope.$watch('tasks', function(newValue, oldValue){
			$scope.allChecked = !$scope.remainingCount;
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
				color: colorsArray[$scope.color], 
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
				{ completed: false} : (status === 'completed') ?
				{ completed: true} : null;
		};

		$scope.colorTranslate = function(value) {
			header.style.backgroundColor = colorsArray[value];
			return colorsNameArray[value].toUpperCase();
		};

		$scope.countChars = function(){
			if ((140 - $scope.newTask.length) <= 0) {
				$scope.maxLength = true;
			} else {
				$scope.maxLength = false;
			}
			return parseInt((140 - $scope.newTask.length), 10);
		};

		$scope.editTask = function(task) {
			$scope.taskIndex = parseInt(tasks.indexOf(task),10);
			$scope.newTask = task.title;
			$scope.color = parseInt(colorsArray.indexOf(task.color),10);
			$scope.editing = true;
			$scope.showPanel();
		};

		$scope.doneEditing = function() {
			var task = tasks[$scope.taskIndex];
			task.title = $scope.newTask.trim();
			task.color = colorsArray[$scope.color];
		
			if(!task.title) {
				$scope.removeTask(task);
			}
			$scope.resetParams();
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
			$scope.color = 8;
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
