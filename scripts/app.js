/******
	* The hub of the application.
 ******/
TA.App = (function() {
	var  introController = null
		, mainController = null
		, callbacks = {
			onIntroComplete : function(){
				introController.hide();
			}
		};

	function addEventListeners(){
		window.addEventListener('introcomplete', callbacks.onIntroComplete, false);	
	}

	function dispatchEvent(element, eventName, data){
		var evt = document.createEvent("Event");
		evt.initEvent(eventName, true, true);
		if(!!data) {
			evt.data = data;
		}
		element.dispatchEvent(evt);
	}
	
	function init() {
		document.body.classList.remove('loading');
		addEventListeners();
		// Controller Initialization
		introController = new TA.Controller.Intro();
		introController.init();
		introController.show();
	}

	return {
		init : init,
		dispatchEvent : dispatchEvent
	};
})();
