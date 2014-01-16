/*****
 * Bootstrap up the experience, dispatches the request
 * for the web fonts and, once loaded, initializes the
 *	app proper.
 */
window.addEventListener('load', function() {

	WebFontConfig = {
		custom: {
			families: ['Roboto','Roboto Bold','Roboto Light'],
			urls: ['css/fonts.css']
		},
		fontactive: function(familyName, fvd){
			if (familyName === "Roboto Light") {
					TA.App.init();
			}
		}
	};

	(function(){
		var  wf = document.createElement('script')
			, s = document.getElementsByTagName('script')[0];
		wf.src = 'libs/webfont.js';
		wf.type = 'text/javascript';
		wf.async = 'true';
		s.parentNode.insertBefore(wf, s);
	})();

	// TODO: Insert a Loading animation
	// 1.- How to append a element after the element body
   // 2.- The element is a div with a class called 'loading'
	// 3.- There will be an image inside the div.
   // 4.- Or the div will have the image inside (better).

	// TODO: Preload images
   // 1.- Search how to preload images with javascript
});

