/**
 * The model for the task.
 */
TA.Model.Task = function() {

	// TODO: Check which attributes we're going to store.
	var items = [];

	this.getItems = function(){
		return items;
	}

	this.save = function(data) {
		if (data !== undefined) {
			var tmp = [];
			tmp = JSON.parse(localStorage.getItem('tasks')) || [];
			console.log(tmp);
			tmp.push(data);
			localStorage.setItem('tasks', JSON.stringify(tmp));
		}
	}

	this.restore = function() {
		items = JSON.parse(window.localStorage.getItem('tasks'));
		if (items === null){
			items = [];
		}
	}
}

TA.Model.Task.prototype = new TA.Model.Base();
