/**
 * The model for the user.
 */
TA.Model.User = function() {

	// TODO: Check which attributes we're going to store.

	this.save = function() {
		// TODO: Do some local storage logics.
		// window.localStorage.setItem('property', this.attribute);
	}

	this.restore = function() {
		// TODO: Do some local storage retrievement logics.
		// this.attribute = this.ensureValue(
		// window.localStorage.getItem('property',defaultValue,"type");
	}
}

TA.Model.User.prototype = new TA.Model.Base();
