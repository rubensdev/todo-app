/****
  * Represent the introduction view. Show cards sequentially
  * for user settings and orientation information.
  */
TA.View.Intro = function(elementID){

	var  element = document.getElementById(elementID)
		, appLogo = document.getElementById('appLogo')
		, cardDesc = document.getElementById('cardDesc')
		, cards = element.querySelectorAll('.card')
		, next = element.querySelectorAll('.next')
		//, options = element.querySelectorAll('.options a')
		, currentCard = 0
		, currentCardControl = null;
  	 //, user = TA.App.getUser();

	function addEventListeners(){
		for(var n = 0; n < next.length; n++){
			next[n].addEventListener('click', onNextClick, false);
			next[n].addEventListener('touchend', onNextClick, false);
		}
		console.log(next);	
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

	function destructCard() {
		if (currentCardControl &&
			typeof currentCardControl.hideAndDispatch === "function") {
			currentCardControl.hideAndDispatch();
		}
	}

	function onNextClick(evt){
		console.log('Next Button clicked');
		evt.preventDefault();
		
		destructCard();
		
		var  nextCard = currentCard + 1
			, currentCardElement = cards[currentCard]
			, nextCardElement = cards[nextCard];
			//, options = currentCardElement.querySelector('.options');

		/* if (!!options) {
			var  selectedOption = options.querySelector('.selected')
				, optionTarget = options.dataset.target
				, optionValue = selectedOption.dataset.value;

			TA.App.dispatchEvent(element, 'updatedsetting', {
				target: optionTarget,
				value: optionValue
			});
		} */

		currentCardElement.classList.add('previous');
		currentCardElement.classList.remove('current');

		if (nextCard < cards.length) {
			nextCardElement.classList.add('current');
			nextCardElement.classList.remove('next');

			currentCard++;
			// constructCard();
		} else {
			//TA.App.dispatchEvent(element, 'introcomplete');
		}
	}

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
		// Animate appLogo
		setTimeout(function(){
			appLogo.classList.add('active');
		}, 2000);
		setTimeout(function(){
			cardDesc.classList.add('active');
		}, 3000);
		//constructCard();
	};

	this.hide = function() {
		element.classList.remove('active');
		removeEventListeners();
	}

	this.getCardCount = function() {
		return cards.length;
	}
}

TA.View.Intro.prototype = new TA.View.Base();
