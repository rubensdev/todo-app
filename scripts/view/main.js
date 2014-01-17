/***
 * Represents the main view
 */
TA.View.Main = function(elementID) {

	var  element = document.getElementById(elementID)
		, addTaskDialog = document.getElementById('addTaskDialog')
		, tasks = document.getElementById('tasks')
		, noTasksMsg = document.getElementById('noTasksMsg')
		, currentDialControl = null;

	function addEventListeners(){
		noTasksMsg.addEventListener('click', onTasksClick, false);
		noTasksMsg.addEventListener('touchend', onTasksClick, false);
		tasks.addEventListener('click', onTasksClick, false);
		tasks.addEventListener('touchend', onTasksClick, false);	
	}

	function constructDial(){
		var canvas = element.querySelector('canvas');
		
		console.log(canvas);

		if(!!canvas) {
			switch(canvas.dataset.type) {
				case "dial":
					var  max = parseFloat(canvas.dataset.max)
						, value = 2014 //TA.App.getValue(canvas.dataset.label)
						, ratio = parseFloat(canvas.dataset.ratio)
						, label = canvas.dataset.label
						, color = canvas.dataset.color;

				  	currentDialControl = new TA.View.DialEntry(canvas.getAttribute('id'),96,96);
					currentDialControl.show();
					currentDialControl.setup({
						max: max,
						value: value,
						label: label, //TA.App.getFullLabel(label),
						color: TA.Colors[color],
						eventName : canvas.dataset.eventComplete,
						trackColor: (canvas.dataset.trackColor === "true"),
						decimalPlaces: 0, //TA.App.getDecimalPlaces(label),
						ratio: ratio
					});
				break;
				default: break;
			}
		}
	}

	function destructCard() {
		if (currentDialControl &&
			typeof currentDialControl.hideAndDispatch === "function") {
			currentDialControl.hideAndDispatch();
		}
		currentDialControl = null;
	}

	function onTasksClick(evt) {
		evt.preventDefault();
		if (noTasksMsg.style.display !== 'none'){
			noTasksMsg.classList.add('hide');
			setTimeout(function(){
				addTaskDialog.classList.add('show');	
			},875);
		} else {
			noTasksMsg.classList.remove('hide');
		}
	}

	function removeEventListeners(){
		noTasksMsg.removeEventListener('click', onTasksClick, false);
		noTasksMsg.removeEventListener('touchend', onTasksClick, false);
		tasks.removeEventListener('click', onTasksClick, false);
		tasks.removeEventListener('touchend', onTasksClick, false);	
	}

	this.show = function(){
		element.classList.add('active');
		addEventListeners();
		constructDial();
	}

	this.hide = function(){
		element.classList.remove('active');
	}

}
TA.View.Main.prototype = new TA.View.Base();
