/****
  * Represent the introduction view. Show cards sequentially
  * for user settings and orientation information.
  */
TA.View.Intro = function(elementID){

	var  element = document.getElementById(elementID)
		, cards = element.querySelectorAll('.card')
		, next = element.querySelectorAll('.next')
		//, options = element.querySelectorAll('.options a')
		, currentCard = 0
		, currentCardControl = null
		, user = TA.App.getUser();

	function addEventListeners(){
		for(var n = 0; n < next.length; n++){
			next[n].addEventListener('click', onNextClick, false);
			next[n].addEventListener('touchend', onNextClick, false);
		}
	
		/*for(var o = 0; o < options.length; o++){
			options[o].addEventListener('click', onOptionSelect, false);
			options[o].addEventListener('touchend', onOptionSelect, false);
		}*/
	}

	/*function constructCard() {
		var canvas = cards[currentCard].querySelector('canvas');

		if (!!canvas) {
			switch(canvas.dataset.type) {
				case "dial" :
					var  max = parseFloat(canvas.dataset.max)
						, value = TA.App.getValue(canvas.dataset.label)
						, ratio = parseFloat(canvas.dataset.ratio)
						, label = canvas.dataset.label;

					max = TA.App.convertToImperialIfNeeded(label, max);
					value = TA.App.convertToImperialIfNeeded(label, value);
					ratio = TA.App.convertToImperialIfNeeded(label, ratio);
				
					currentCardControl = new WT.View.DialEntry(canvas.getAttribute('id'));
					currentCardControl.show();
					currentCardControl.setup({
						max : max,
						value : TA.App.getFullLabel(label),
						color: TA.Colors[canvas.dataset.color],
						eventName: canvas.dataset.eventComplete,
						trackColor: (canvas.dataset.trackColor === "true"),
						decimalPlaces: TA.App.getDecimalPlaces(label),
						ratio: ratio
					});
				break;
				default: break;
			}
		}
	}*/

	function removeEventListeners(){
		for(var n = 0; n < next.legnth; n++) {
			next[n].removeEventListener('click', onNextClick, false);
			next[n].removeEventListener('touchend', onNextClick, false);
		}
	}


	this.show = function() {
		currentCard = 0;
		for (var c = 0; c < cards.length; c++){
			if(c > 0){
				cards[c].classList.add('next');
			} else {
				cards[c].classList.add('current');
			}
		}
		element.classList.add('active');
		addEventListeners();
		//constructCard();
	};

	this.hide = function() {
		element.classList.add('active');
		removeEventListeners();
	}

	this.getCardCount = function() {
		return cards.length;
	}
}

TA.View.Intro.prototype = new TA.View.Base();
