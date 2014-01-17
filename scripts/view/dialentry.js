/***
 * Wraps around the dial component. Manages the user interactions 
 *	and passes the appropiate values to the dial.
 */

TA.View.DialEntry = function(elementID, w, h) {
	
	var  HALF_WIDTH = w * 0.5
		, HALF_HEIGHT = h * 0.5
		, dial = new TA.View.Dial(elementID, w, h)
		, dialElement = document.getElementById(elementID)
		, dialElementX = dialElement.offsetLeft
		, dialElementY = dialElement.offsetTop
		//, user = TA.App.getUser()
		, interactionStartEvent = null
		, capturingValue = false
		, changedValue = false
		, startCaptureTimeout = 0
		, startedCapture = false
		, trackColor = false
		, eventNameComplete = 'dialvaluecomplete'
		, callbacks = {
			 
			startInteraction: function(evt) {
				evt.preventDefault(); // It prevents text selection
				interactionStartEvent = evt;
			
				capturingValue = true;
				startedCapture = false;
		
				// The timer is cancelled, thus the last user action too.
         	clearTimeout(startCaptureTimeout);
				// setTimeout returns a value which can be used to cancel the timer.
				startCaptureTimeout = setTimeout(callbacks.startValueEntry, 300);
			},

			startValueEntry: function() {
				dial.startTrackTo();
				startedCapture = true;
				callbacks.updateInteraction(interactionStartEvent, true);
			},

			updateInteraction: function(evt, ignoreForUserValue) {
				evt.preventDefault();
			
				if (capturingValue) {
					if (!startedCapture) {
						dial.startTrackTo();
						startedCapture = true;
						ignoreForUserValue = true;
					}
			
					var  angle = getDialAngle(evt)
						, newAngle = angle / (Math.PI * 2)
						, newValue = dial.trackTo(newAngle, ignoreForUserValue);

					// Maybe it's not necessary to change color.
					if (trackColor) {
						//newValue = TA.App.convertToMetricIfNeeded('weight', newValue);
						//dial.setDrawColor(TA.App.getWeightColor(newValue, user.height));
					}
				
					changedValue = true;
					clearTimeout(startCaptureTimeout);
				}
			},

			endInteraction: function(evt) {
				if (!!evt) {
					evt.preventDefault();
				}

				if(changedValue) {
					dial.stopTrackTo();
				} else {
					var newValue = dial.getValue();
					TA.App.dispatchEvent(dialElement, eventNameComplete, newValue);
				}

				clearTimeout(startCaptureTimeout);
				capturingValue = false;
				changedValue = false;
			}
		};

		function getDialAngle(evt) {
			var  x = evt.offsetX // mouse positions relative to the canvas element
				, y = evt.offsetY
				, touches = evt.touches;

			if (typeof x === "undefined" && typeof touches === "undefined"){
				touches = [evt];
			}

			if (touches) {
				// Calculate the exact coords by the substraction between the mouse position relative
            // to the document (page) and the canvas position relative to its closest parent.
				x = touches[0].pageX - dialElementX;
				y = touches[0].pageY - dialElementY;
			}

			// Calculates the difference between a coordinate (x,y) and the center of the circle.
			var  xDiff = x - HALF_WIDTH
				, yDiff = y - HALF_HEIGHT;

			// We get the angle of a straight line between two points in radians. 
			return Math.atan2(yDiff, xDiff) + Math.PI * 2.5; 
		}

		function addEventListeners() {
			dial.addEventListener('touchstart', callbacks.startInteraction, false);
			dial.addEventListener('touchmove', callbacks.updateInteraction, false);
			dial.addEventListener('touchend', callbacks.endInteraction, false);

			dial.addEventListener('mousedown', callbacks.startInteraction, false);
			dial.addEventListener('mousemove', callbacks.updateInteraction, false);
			dial.addEventListener('mouseup', callbacks.endInteraction, false);
		}

		function removeEventListeners() {
			dial.removeEventListener('touchstart', callbacks.startInteraction, false);
			dial.removeEventListener('touchmove', callbacks.updateInteraction, false);
			dial.removeEventListener('touchend', callbacks.endInteraction, false);

			dial.removeEventListener('mousedown', callbacks.startInteraction, false);
			dial.removeEventListener('mousemove', callbacks.updateInteraction, false);
			dial.removeEventListener('mouseup', callbacks.endInteraction, false);
		}

		this.show = function() {
			dialElement.classList.add('active');
			addEventListeners();
		}

		this.hide = function() {
			dialElement.classList.remove('active');
			removeEventListeners();
		}

		this.hideAndDispatch = function() {
			callbacks.endInteraction();
		}

		this.setup = function(options) {
			var  rawValue = options.value
				, value = options.value
				, max = options.max
				, label = options.label
				, color = options.color
				, eventName = options.eventName
				, decimalPlaces = options.decimalPlaces
				, ratio = options.ratio
				, shouldTrackColor = options.trackColor;

			dial.setDecimalPlaces(decimalPlaces);
			dial.setRatio(ratio);
			dial.setMax(max);
			dial.setLabel(label);
			dial.setDrawColor(color);
			dial.animateTo(value);
			eventNameComplete = eventName;
			trackColor = shouldTrackColor;
	
			// Maybe it's not necessary to change color
			if (trackColor) {
				// the weight color depends on the weight ranges. (Red represents overweight, for example)
				//dial.setDrawColor(TA.App.getWeightColor(rawValue, user.height));
			}
		}

		this.clear = function() {
			dial.clear();
		}
}

TA.View.DialEntry.prototype = new TA.View.Base();
