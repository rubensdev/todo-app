/***
 * Represents the main view
 */
TA.View.Main = function(elementID) {
	// TODO: Identify the cancel & add buttons. 
	// TODO: Add event listeners to cancel & add buttons.
   // TODO: When cancel is pressed, the addTaskDialog should dissapear
	// 		and we must check if there is any task available in local 
	// 		storage. If not, the noTasksMsg should appear.
	// TODO: When add is pressed, we must retrieve values from textarea,
   //       month,day,year,hour and minutes fields and store into local
 	//       storage as a task.
	// TODO: If any task is clicked (or touched), the addTaskDialog should
	// 		appear again but with an edit mode. In this mode you can
	//			update the task or erase it.
	//	TODO: Change Add to Edit button in 'edit mode' and add a Erase button.


	var  element = document.getElementById(elementID)
		, addTaskDialog = document.getElementById('addTaskDialog')
		, dateField = document.getElementById('dateField')
		, timeField = document.getElementById('timeField')
		, tasks = document.getElementById('tasks')
		, noTasksMsg = document.getElementById('noTasksMsg')
		, dateDialControls = []
		, timeDialControls = []
		, date = new Date()
		, monthDayYear = [date.getMonth() + 1, date.getDate(), date.getFullYear()]
		, hourmin = [date.getHours(), date.getMinutes()]
		, minDateValues = [1,1, date.getFullYear()]
		, maxDateValues = [12,31,date.getFullYear() + 10]
		, minTimeValues = [0,0]
		, maxTimeValues = [23,59]

	function addEventListeners(){
		noTasksMsg.addEventListener('click', onTasksClick, false);
		noTasksMsg.addEventListener('touchend', onTasksClick, false);
		tasks.addEventListener('click', onTasksClick, false);
		tasks.addEventListener('touchend', onTasksClick, false);	
	}

	function constructDials(){
		var  dateDials = dateField.getElementsByTagName('canvas')
			, timeDials = timeField.getElementsByTagName('canvas');
		
		for (var i = 0; i < dateDials.length; i++){
			var attrName = dateDials[i].getAttribute('id');
			dateDialControls[i] = new TA.View.DialEntry(attrName, 96,96);
			dateDialControls[i].show();
			dateDialControls[i].setup({
				min : minDateValues[i],
				max : maxDateValues[i],
				value : monthDayYear[i],
				label : '',
				color : TA.Colors["FLAT_RED"],
				eventName : dateDials[i].dataset.eventComplete,
				trackColor : (dateDials[i].dataset.trackColor === "true"),
				decimalPlaces: 0,
				ratio : dateDials[i].dataset.ratio
			});	
		}

		for (var i = 0; i < timeDials.length; i++){
			var attrName = timeDials[i].getAttribute('id');
			timeDialControls[i] = new TA.View.DialEntry(attrName, 96,96);
			timeDialControls[i].show();
			timeDialControls[i].setup({
				min : minTimeValues[i],
				max : maxTimeValues[i],
				value : hourmin[i],
				label : '',
				color : TA.Colors["FLAT_RED"],
				eventName : null,
				trackColor: false,
				decimalPlaces : 0,
				ratio : timeDials[i].dataset.ratio
			});
		}

	}

	function destructCard() {
		for (var i = 0; i < dateDialControls.length; i++){
			if (dateDialControls[i] &&
				typeof dateDialControls[i].hideAndDispatch === "function") {
				dateDialControls[i].hideAndDispatch();
			}
		}
		for (var i = 0; i < timeDialControls.length; i++){
			if (timeDialControls[i] &&
				typeof timeDialControls[i].hideAndDispatch === "function") {
				timeDialControls[i].hideAndDispatch();
			}
		}
		dateDialControls = null;
		timeDialControls = null;
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
		constructDials();
	}

	this.hide = function(){
		element.classList.remove('active');
	}

}
TA.View.Main.prototype = new TA.View.Base();
