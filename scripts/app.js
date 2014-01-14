/******
	* The hub of the application.
 ******/
TA.App = (function() {
	var introController = null;
	
	function init() {
		document.body.classList.remove('loading');
		//addEventListeners();
		introController = new TA.Controller.Intro();
		introController.init();
		introController.show();
	}

	return {
		init : init
	};
})();
