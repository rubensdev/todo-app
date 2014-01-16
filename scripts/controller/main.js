/**
 * Controller for the main view.
 */
TA.Controller.Main = function() {
	var  elementID = 'main-view'
		, view = new TA.View.Main(elementID);
		//, user = TA.App.getUser();

	this.init = function() {};
	this.show = function() {
		view.show();
	}
}

TA.Controller.Main.prototype = new TA.Controller.Base();
