angular.module('config', ['pascalprecht.translate'])

.constant('COLORS', (function() { 
	var Colors = function() {
		this.codes = [
			['ALIZARIN'    , '#E74C3C'],
			['AMETHYST'    , '#9B59B6'],
			['CARROT'      , '#E67E22'],
			['CONCRETE'    , '#95A5A6'],
			['EMERALD'     , '#2ECC71'],
			['ORANGE'      , '#D35400'],
			['PETER RIVER' , '#3498DB'],
			['SUN FLOWER'  , '#F1C40F'],
			['TURQUOISE'   , '#1ABC9C'],
			['WET ASPHALT' , '#34495E']
		];
   };
	Colors.prototype = {
		defaultColor : function() {
			return this.codes[0];
		}, 
		getColor: function(index) {
			return this.codes[index];	
		},
		length : function() {
			return this.codes.length;
		}
	};
	return new Colors();
})())

.constant('SETTINGS', {
	REMAINING_CHARS : 140,
	DEF_TASK_COLOR : 0
})

.config(['$translateProvider', function($translateProvider){
	$translateProvider.translations('en',{
		ACTIVETASKS       : 'Active',
		ADDINGTASK_MSG    : 'This button makes some magic. When you push it, a panel will appear (it\'s intuitive, don\'t worry)',
		ADDINGTASK_TITLE  : 'Adding Tasks',
		ALLTASKS          : 'All',
		CANCEL_BTN        : 'Cancel',
		COMPLETEDTASKS    : 'Completed',
		EDIT_BTN          : 'Edit',
		MODDELRESET_ENJOY : 'That\'s all, hope you enjoy it!',
		MODDELRESET_MSG1  : 'If you tap on a task, a menu will appear with two options: edit and delete.',
		MODDELRESET_MSG2  : 'For resetting all data, add a task with the word <h2>"Rayuela"</h2>',
		MODDELRESET_TITLE : 'Modifying or deleting tasks and Reset Data', 
		NEXT_BUTTON       : 'Next',
		NEXT_GO           : 'Ok,Go!',
		SUBMIT_BTN        : 'Submit',
		TASKCOLOR_TITLE   : 'Task Color', 
		TEXTAREA_PH       : 'Mmm... What needs to be done?',
		WELCOME_APP       : 'Welcome to the app. Tap the Next button'
	})
	.translations('es', {
		ADDINGTASK_MSG    : 'Este botón hace magia. Cuando lo presiones, aparecerá un panel (es intuitivo, no te preocupes)',
		ADDINGTASK_TITLE  : 'Añadiendo tareas',
		ACTIVETASKS			: 'Activas',
		ALLTASKS				: 'Todas',
		CANCEL_BTN			: 'Cancelar',
		COMPLETEDTASKS		: 'Completadas',
		EDIT_BTN				: 'Editar',
		MODDELRESET_ENJOY : '¡Eso es todo, espero que la disfrutes!',
		MODDELRESET_MSG1  : 'Si tocas una tarea, aparecerá un menú con dos opciones: editar y borrar.', 
		MODDELRESET_MSG2  : 'Para reiniciar la aplicación, añade una tarea con la palabra <h2>"Rayuela"</h2>',
		MODDELRESET_TITLE : 'Modificar o borrar tareas y reiniciar la aplicación',
		NEXT_BUTTON       : 'Siguiente',
		NEXT_GO           : 'Ok,¡vamos!',
		SUBMIT_BTN			: 'Aceptar',
		TASKCOLOR_TITLE	: 'Color de la tarea',
		TEXTAREA_PH			: 'Mmm... ¿Qué hay que hacer?',
		WELCOME_APP       : 'Bienvenido a la aplicación. Toca el botón Siguiente.'
	});
}])

.run(['$translate', function($translate){
	var lang = (window.navigator.userLanguage || window.navigator.language).substring(0,2);
	$translate.uses((lang !== 'es' && lang !== 'en')? 'en' : lang);
}]);

