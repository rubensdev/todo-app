/***
 * Represents the dial component.
 */

TA.View.Dial = function(elementID, w, h) {
	
	var  WIDTH = null // Width of the canvas element 
		, HEIGHT = null // Height of the canvas element
		, HALF_WIDTH = null
		, HALF_HEIGHT = null
		, TWO_PI = Math.PI * 2
		, QUARTER_PI = Math.PI * 0.5
		, PADDING = 1000;

	var  canvas = document.getElementById(elementID)
		, ctx = canvas.getContext('2d')
		, drawColor = "" // The dial color
		, requestScheduled = false
		, drawStart = 1
		, drawEnd = 1
		, drawTargetStart = 1
		, drawTargetEnd = 1
		, easeValue = 0.35
		, currentAngle = 1
		, userValue = 0
		, minValue = 0
		, maxValue = 140
		, ratio = 5
		, label = "";

	(function init() {
     /* - iOS devices, multiply devicePixelRatio by screen.width to get 
          the physical pixel count.
        - Android and Windows Phone devices, divide screen.width by 
          devicePixelRatio to get the dips count.*/
		var dPR = window.devicePixelRatio;
		WIDTH = w !== undefined ? w : 258;
		HEIGHT = h !== undefined ? h : 258;
		HALF_WIDTH = WIDTH * 0.5;
		HALF_HEIGHT = HEIGHT * 0.5;
		
		canvas.width = WIDTH * dPR;
		canvas.height = HEIGHT * dPR;
		ctx.scale(dPR, dPR);	
		
		canvas.style.width = WIDTH + 'px';
		canvas.style.height = HEIGHT + 'px';

	})();

   function addEventListener(name, bubbles, cancelable) {
		canvas.addEventListener(name, bubbles, cancelable);
	}	

	function animateTo(weight) {
		if(!requestScheduled) {
			requestAnimFrame(draw);
			requestScheduled = true;
		}

		userValue = parseFloat(weight);
		drawTargetStart = Math.floor(currentAngle);
		drawTargetEnd = Math.floor(currentAngle) +
			Math.max(0, Math.min(1, weight / maxValue));
	
		easeValue = 0.12;
	}

	function clear() {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
	}

	function draw() {
		requestScheduled = false;
		
		drawStart += (drawTargetStart - drawStart) * easeValue;
		drawEnd += (drawTargetEnd - drawEnd) * easeValue;

		clear();
		drawGrayBase();
		drawColorArea();
		drawCenter();
		drawText();

		if (Math.abs(drawTargetStart - drawStart) > 0.001 ||
			 Math.abs(drawTargetEnd - drawEnd) > 0.001) {
			requestScheduled = true;
			requestAnimFrame(draw);
		}
	}	

	function drawCenter() {
		ctx.fillStyle = TA.Colors.WHITE;
		ctx.beginPath();
		ctx.arc(HALF_WIDTH, HALF_HEIGHT, HALF_WIDTH / 1.5, 0, TWO_PI, true);
		ctx.closePath();
		ctx.fill();
	}

	function drawColorArea() {
		var  startAngle = drawStart * TWO_PI - QUARTER_PI
			, endAngle = drawEnd * TWO_PI - QUARTER_PI
			, radius = HALF_WIDTH - 2;
	
		startAngle %= TWO_PI;
		endAngle %= TWO_PI;

		ctx.fillStyle = drawColor;
		ctx.beginPath();
		ctx.moveTo(HALF_WIDTH, HALF_HEIGHT);
		//ctx.lineTo(HALF_WIDTH + Math.floor(Math.cos(startAngle) * radius),
		//	HALF_HEIGHT + Math.floor(Math.sin(startAngle) * radius));
		ctx.arc(HALF_WIDTH, HALF_HEIGHT, radius, startAngle, endAngle, false);
		ctx.lineTo(HALF_WIDTH, HALF_HEIGHT);
		ctx.closePath();
		ctx.fill();
	}

	function drawGrayBase() {
		var radius = HALF_WIDTH - 2;
		
		ctx.fillStyle = TA.Colors.MEDIUM_GRAY;
		ctx.beginPath();
		ctx.moveTo(HALF_WIDTH, HALF_HEIGHT);
		//ctx.lineTo(WIDTH, HALF_HEIGHT);
		ctx.arc(HALF_WIDTH, HALF_HEIGHT, radius, 0, TWO_PI, false); 
		ctx.closePath();
		ctx.fill();
	}

	function drawText() {
		ctx.fillStyle = drawColor;
		ctx.font = "20px Roboto";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(userValue.toFixed(decimalPlaces),HALF_WIDTH,
			HALF_HEIGHT); // - 10
		/*ctx.fillStyle = TA.Colors.MEDIUM_GRAY;
		ctx.font = "16px Roboto";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(label, HALF_WIDTH, HALF_HEIGHT + 26);*/
	}

	function getValue() {
		return userValue.toFixed(decimalPlaces);
	}

	function removeEventListener(name, bubbles, cancelable) {
		canvas.removeEventListener(name, bubbles, cancelable);
	}

	function setDecimalPlaces(newDecimalPlaces) {
		decimalPlaces = newDecimalPlaces;
	}

	function setRatio(newRatio) {
		ratio = newRatio;
	}

	function setMin(newMinValue) {
		minValue = newMinValue;
	}
	
	function setMax(newMaxValue) {
		maxValue = newMaxValue;
	}

	function setLabel(newLabel) {
		label = newLabel.toUpperCase();
	}

	function setDrawColor(color) {
		drawColor = color;
	}

	function startTrackTo() {
		currentAngle = Math.floor(userValue) + PADDING;

		drawTargetStart = currentAngle;
		drawTargetEnd = currentAngle +
			Math.max(0, Math.min(1, userValue / maxValue));
		drawStart = drawTargetStart;
		drawEnd = drawTargetEnd;
	}	

	function stopTrackTo() {
		animateTo(userValue);
	}

	function trackTo (newAngle, ignoreForuserValue) {
		var  distanceClockwise = (currentAngle - newAngle) % 1
			, distanceAnticlockwise = (1 - distanceClockwise) % 1;

		// We now check which is nearer to the current value:
		// the clockwise or anticlockwise distance.
		if (distanceAnticlockwise < distanceClockwise) {
			currentAngle += distanceAnticlockwise;
		
			if(!ignoreForuserValue) {
				userValue += distanceAnticlockwise * ratio;
			}
		} else {
			currentAngle -= distanceClockwise;

			if (!ignoreForuserValue) {
				userValue -= distanceClockwise * ratio;
			}
		}
		// Set the beginning and end value to be a small amount either
      // side of the current angle.
		drawTargetStart = currentAngle - 0.05;
		drawTargetEnd = currentAngle + 0.05;

		// Constrain the values to something sensible.
		//userValue = Math.max(userValue, minValue);
		console.log(minValue);
		userValue = userValue > maxValue ? maxValue : userValue;
		userValue = userValue < minValue ? minValue : userValue; //Math.max(userValue, minValue);
		currentAngle = Math.max(currentAngle, 0.75);
		drawTargetStart = Math.max(drawTargetStart, 0.75);
		drawTargetEnd = Math.max(drawTargetEnd, 0.75);

		easeValue = 0.6;

		if(!requestScheduled) {
			requestAnimFrame(draw);
			requestScheduled = true;
		}

		return userValue;
	}

	return {
		animateTo: animateTo,
		setDecimalPlaces: setDecimalPlaces,
		setRatio: setRatio,
		setMin: setMin,
		setMax: setMax,
		setLabel: setLabel,
		setDrawColor: setDrawColor,
		addEventListener: addEventListener,
		removeEventListener: removeEventListener,
		startTrackTo: startTrackTo,
		trackTo: trackTo,
		stopTrackTo: stopTrackTo,
		getValue: getValue,
		clear: clear
	};
};
