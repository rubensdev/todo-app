module.exports = {
	/* The stuff in the '/src' directory */
	app_files: {
		js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js'],
		jsunit: [ 'src/**/*.spec.js'],
		atpl : [ 'src/app/**/*.tpl.html'], 
		ctpl : [ 'src/common/**/*.tpl.html'], /* Reusable components */
		html : [ 'src/index.html'],
		css : ['src/css/*.css'],
		manifest : ['src/cache.manifest']
	},
	build_dir: 'build',
	compile_dir: 'bin',
	/* Third party libraries which will be concatenated and
		minified with our project source files. */
	vendor_files: {
		js: [
			'vendor/angular/angular.js',
			'vendor/angular-route/angular-route.js',
			'vendor/angular-touch/angular-touch.js',
			'vendor/rzslider/rzslider.js'
			//'vendor/angular-ui-router/release/angular-ui-router.js'
		],
		css: [],
		assets: []
	},
	test_files: {
		js : ['vendor/angular-mocks/angular-mocks.js']
	}
}
