module.exports = function(karma) {
	karma.set({
		/**
		 * Where to look for files.
		 **/
		basePath: '../',
		/**
		 * This is the list of file patterns to load into the browser during testing.
		 **/
		files: [
			<% scripts.forEach(function(file) { %> '<%= file %>', <% }); %>
			'src/**/*.js'
		],
		exclude: ['src/assets/**/*.js'],
		frameworks: ['jasmine'],
		plugins: ['karma-jasmine','karma-firefox-launcher','karma-chrome-launcher',
         'karma-phantomjs-launcher'],
		/**
		 * How to report, by default.
		 **/
		reporters: 'dots',
		/**
		 * On which port should the browser connect, on which port is the test runner
       * operating, and what is the URL path for the browser to use.
		 **/
		port: 9018,
		runnerPort: 9100,
		urlRoot: '/',
		/**
		 * Disable file watching by default
		 **/
		autoWatch: false,
		/**
		 * List of browsers to launch to test on. You may leave this blank and go
       * to http://localhost:9018.
		 **/
		browsers: ['Firefox']
	});
}
