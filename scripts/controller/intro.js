/***
 * Controller for the Introduction View
 */

TA.Controller.Intro = function() {
	var  elementID = 'intro-view'
		, view = new TA.View.Intro(elementID);

	this.init = function() {};
	this.show = function() { view.show(); };
	this.hide = function() { view.hide(); };
}

TA.Controller.Intro.prototype = new TA.Controller.Base();
