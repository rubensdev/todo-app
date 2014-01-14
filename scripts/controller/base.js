/***
 * A base object for all controllers.
 ***/
TA.Controller.Base = function() {
	this.name = "Base";
}	

TA.Controller.Base.prototype = {
	
	show: function() {
		console.warn("Expected override of controller show()");
	},

	hide: function() {
		console.warn("Expected override of controller hide()");
	},
	
	init: function() {
		console.warn("Expected override of controller init()");
	},

	updateUser: function() {
		console.warn("Expected override of controller updateUser()");
	}
};
