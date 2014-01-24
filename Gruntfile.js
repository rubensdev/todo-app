module.exports = function(grunt) {
	/**
	 * Load required Grunt tasks.
    */
	grunt.loadNpmTasks('grunt-bump');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-conventional-changelog');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-ngmin');
	grunt.loadNpmTasks('grunt-recess');

	/**
	 * Load in our build configuration file 
    */
	var userConfig = require('./build.config.js');
	/**
	 * The configuration object Grunt uses to give each 
	 * plugin its instructions.
	 **/
	var taskConfig = {
		/**
		 * We read in our 'package.json' file so we can access
		 * the package name and version. (Don't repeat yourself)
		 **/
		pkg: grunt.file.readJSON('package.json'),
		/**
		 * A banner is a comment placed at the top of our compiled 
       * source files.
		 **/
		meta: {
			banner:
				'/**\n' 
				+ ' * <%= pkg.name %> - v<%= pkg.version %> - ' 
            + ' <%= grunt.template.today('yyyy-mm-dd') %>\n' 
				+ ' * <%= pkg.homepage %>\n'
		},
		/**
		 * Creates a changelog on a new version
		 **/
		changelog: {
			options: {
				dest: 'CHANGELOG.md',
				template: 'changelog.tpl'
			}
		},
		/** 
		 * Increments the version number, etc.
		 **/
		bump : {
			options: {
				files: ['package.json', 'bower.json'],
				commit: false,
				commitMessage: 'chore(release): v%VERSION%',
				commitFiles: ['package.json', 'client/bower.json'],
				createTag: false,
				tagName: 'v%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: false,
				pushTo: 'origin'
			}
		},
		/**
		 * The directories to delete when 'grunt clean' is executed.
		 **/
		clean: ['<%= build_dir %>', '<%= compile_dir %>'],
		/**
		 * The 'copy' task just copies files from A to B.
		 **/
		copy: {

		},
		/**
		 * 'grunt concat' concatenates multiple source files into single file.
		 **/
		concat: {

		},
		/**
		 *	'ng-min' annotates the sources befores minifying. That is, allows us
		 * to code without the array syntax.
		 **/
		ngmin: {
		},
	};
}
