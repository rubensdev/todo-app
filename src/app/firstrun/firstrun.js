angular.module('firstrun',['ngRoute','pascalprecht.translate'])

.config(['$routeProvider', '$translateProvider',
   function($routeProvider, $translateProvider){
		$routeProvider.when('/firstrun', {
			templateUrl: 'firstrun/firstrun.tpl.html',
			controller: 'FirstRunController',
			title: 'Welcome'
		});

		$translateProvider.translations('en',{
			'ADDINGTASK_MSG'    : 'This button makes some magic. When you push it, a panel will appear (it\'s intuitive, don\'t worry)',
			'ADDINGTASK_TITLE'  : 'Adding Tasks',
			'MODDELRESET_ENJOY' : 'That\'s all, hope you enjoy it!',
			'MODDELRESET_MSG1'  : 'If you tap on a task, a menu will appear with two options: edit and delete.',
			'MODDELRESET_MSG2'  : 'For resetting all data, add a task with the word <h2>"Rayuela"</h2>',
			'MODDELRESET_TITLE' : 'Modifying or deleting tasks and Reset Data', 
			'NEXT_BUTTON'       : 'Next',
			'NEXT_GO'           : 'Ok,Go!',
         'WELCOME_APP'       : 'Welcome to the app. Tap the Next button'
		})
      .translations('es', {
			'ADDINGTASK_MSG'    : 'Este botón hace magia. Cuando lo presiones, aparecerá un panel (es intuitivo, no te preocupes)',
			'ADDINGTASK_TITLE'  : 'Añadiendo tareas',
			'MODDELRESET_ENJOY' : '¡Eso es todo, espero que la disfrutes!',
			'MODDELRESET_MSG1'  : 'Si tocas una tarea, aparecerá un menú con dos opciones: editar y borrar.', 
			'MODDELRESET_MSG2'  : 'Para reiniciar la aplicación, añade una tarea con la palabra <h2>"Rayuela"</h2>',
			'MODDELRESET_TITLE' : 'Modificar o borrar tareas y reiniciar la aplicación',
			'NEXT_BUTTON'       : 'Siguiente',
			'NEXT_GO'           : 'Ok,¡vamos!',
         'WELCOME_APP'       : 'Bienvenido a la aplicación. Toca el botón Siguiente.'
		});
   }
])

.controller('FirstRunController', ['$rootScope', '$scope', 'tasksStorage', 
	'$location', '$timeout', '$translate', 
	function($rootScope, $scope, tasksStorage, $location, $timeout, $translate){
		var cards = [];
		$translate.uses($rootScope.lang);

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
	}
]);
