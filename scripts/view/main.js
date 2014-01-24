/***
 * Represents the main view
 */
TA.View.Main = function(elementID) {
	// TODO: Add event listeners add button.
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
		, addButton = document.getElementById('addButton')
		, addTaskActivity = document.getElementById('addTaskActivity')
		, cancelButton = document.getElementById('cancelButton')
		, dateField = document.getElementById('dateField')
		, timeField = document.getElementById('timeField')
		, tasksActivity = document.getElementById('tasksActivity')
		, noTasksActivity = document.getElementById('noTasksActivity')
		, taskDescription = addTaskActivity.querySelector('textarea')
		, tasks = TA.App.getTasks()
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
		addButton.addEventListener('click', onStoreTask, false);
		addButton.addEventListener('touchend', onStoreTask, false);
		cancelButton.addEventListener('click', onCancelBtnClick, false);
		cancelButton.addEventListener('touchend', onCancelBtnClick, false);
		noTasksActivity.addEventListener('click', onOpenAddTask, false);
		noTasksActivity.addEventListener('touchend', onOpenAddTask, false);
	}

	function checkIfTasksAvailable(){
		console.log(tasks.getItems().length);
		if (tasks.getItems().length == 0) {
				noTasksActivity.className = 'activity show';
				tasksActivity.className = 'activity hide';
				addTaskActivity.className = 'activity hide';
		} else {
			showTasks();
		}
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



	function onCancelBtnClick(evt){
		evt.preventDefault();
		checkIfTasksAvailable();
		/*addTaskActivity.className = 'activity hide';
		noTasksActivity.style.display = 'block';
		setTimeout(function(){ 
			addTaskActivity.style.display = 'none';
			noTasksActivity.className = 'activity show';
		},875);*/
	}

	function onOpenAddTask(evt) {
		evt.preventDefault();
		noTasksActivity.classList.add('hide');
		addTaskActivity.style.display = 'block';
		setTimeout(function(){ 
			addTaskActivity.className = 'activity show';
			noTasksActivity.style.display = 'none';
			tasksActivity.style.display = 'none';
		}, 375);
	}

	function onStoreTask(evt){
		evt.preventDefault();
		tasks.save({ 
			'description': taskDescription.value,
			'month' : dateDialControls[0].getDialValue(),
			'day' : dateDialControls[1].getDialValue(),
			'year' : dateDialControls[2].getDialValue(),
			'hour': timeDialControls[0].getDialValue(),
			'minutes': timeDialControls[1].getDialValue(),
			'done': false
		});
	}

	function removeEventListeners(){
		addButton.removeEventListener('click', onAddBtnClick, false);
		addButton.removeEventListener('touchend', onAddBtnClick, false);
		cancelButton.removeEventListener('click', onCancelBtnClick, false);
		cancelButton.removeEventListener('touchend', onCancelBtnClick, false);
		noTasksActivity.removeEventListener('click', onTasksClick, false);
		noTasksActivity.removeEventListener('touchend', onTasksClick, false);
	}

	function showTasks() {
		var  items = tasks.getItems()
			, taskView = document.createElement('div')
			, btnView = document.createElement('div')
			, addButton = document.createElement('a')

		addButton.className = 'button';
		addButton.setAttribute('id','addButton');
		addButton.appendChild(document.createTextNode('ADD TASK'));
		addButton.addEventListener('click', onOpenAddTask, false);
		addButton.addEventListener('touchend', onOpenAddTask, false);
		taskView.className = 'taskView';
		btnView.className = 'buttonView';
		noTasksActivity.style.display = 'none';
		addTaskActivity.style.display = 'none';
		for(var i = 0; i < items.length; i++){
			var  taskBox = document.createElement('div')
				, description = document.createElement('p')
				, date = document.createElement('div')
				, dayMonth = document.createElement('div')
				, year = document.createElement('div')
				, time = document.createElement('div');

			date.className = 'dateField';
			dayMonth.className = 'dateDayMonth';
			dayMonth.appendChild(document.createTextNode(
				TA.App.getDayMonth(items[i].day,items[i].month)));
			year.className = 'dateYear';	
			year.appendChild(document.createTextNode(items[i].year));
			time.className = 'dateTime';
			time.appendChild(document.createTextNode(
				TA.App.getTime(items[i].hour,items[i].minutes)));
			date.appendChild(dayMonth);
			date.appendChild(year);
			date.appendChild(time);
			description.appendChild(document.createTextNode(items[i].description));
			taskBox.className = 'textBox';
			taskBox.appendChild(date);
			taskBox.appendChild(description);
			taskView.appendChild(taskBox);
		}
		btnView.appendChild(addButton);
		tasksActivity.appendChild(taskView);
		tasksActivity.appendChild(btnView);
		tasksActivity.className = 'activity show';
	}

	this.show = function(){
		element.classList.add('active');
		addEventListeners();
		constructDials();
		checkIfTasksAvailable();
	}

	this.hide = function(){
		element.classList.remove('active');
	}

}
TA.View.Main.prototype = new TA.View.Base();
