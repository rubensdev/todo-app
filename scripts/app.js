/******
	* The hub of the application.
 ******/
TA.App = (function() {
	var  introController = null
		, mainController = null
		, tasks = null
		, months = ['JAN','FEB','MAR','APR','MAY','JUN',
		  			  ,'JUL','AUG','SEP','OCT','NOV','DEC']
		, callbacks = {
			onIntroComplete : function(){
				introController.hide();
				setTimeout(function(){
					mainController.show();
					// TODO: Implementing a firstRun flag (Settings stuffs)
				},200);
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

	function getDayMonth(day, month){
		var d = day < 10? "0" + day : day;
		return d + " " + months[month - 1];
	}
	
	function getTasks(){
		if(!tasks) {
			tasks = new TA.Model.Task();
			tasks.restore();
			tasks.save();
		}
		return tasks;
	}

	function getTime(hour, minutes) {
		var  h = hour < 10 ? "0" + hour : hour
			, m = minutes < 10 ? "0" + minutes : minutes;
		return h + ":" + m;
	}
	
	function init() {
		document.body.classList.remove('loading');
		addEventListeners();
		// Controller Initialization
		//introController = new TA.Controller.Intro();
		//introController.init();
		//introController.show();
		// Main Controller
		mainController = new TA.Controller.Main();
		mainController.init();
		mainController.show();
	}

	return {
		getDayMonth : getDayMonth,
		getTime : getTime,
		getTasks: getTasks,
		init : init,
		dispatchEvent : dispatchEvent
	};
})();
