/***
 * Represents the main view
 */
TA.View.Main = function(elementID) {

	var  element = document.getElementById(elementID)
		, currentDialControl = null;

	function constructDial(){
		var canvas = element.querySelector('canvas');

		if(!!canvas) {
			switch(canvas.dataset.type) {
				case "dial":
					var  max = parseFloat(canvas.dataset.max)
						, value = 2014 //TA.App.getValue(canvas.dataset.label)
						, ratio = parseFloat(canvas.dataset.ratio)
						, label = canvas.dataset.label
						, color = canvas.dataset.color;

				  	currentDialControl = new TA.View.DialEntry(canvas.getAttribute('id'));
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

	this.show = function(){
		element.classList.add('active');
		constructDial();
	}

	this.hide = function(){
		element.classList.remove('active');
	}

}
TA.View.Main.prototype = new TA.View.Base();
