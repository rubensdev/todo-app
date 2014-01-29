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
				'/**\n' + 
				' * <%= pkg.name %> - v<%= pkg.version %> - ' +
            ' <%= grunt.template.today("yyyy-mm-dd") %>\n' +
				' * <%= pkg.homepage %>\n' +
				' **/'
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
		 * Creates a changelog on a new version
		 **/
		changelog: {
			options: {
				dest: 'CHANGELOG.md',
				template: 'changelog.tpl'
			}
		},
		/**
		 * The directories to delete when 'grunt clean' is executed.
		 **/
		clean: ['<%= build_dir %>', '<%= compile_dir %>'],
		/**
		 * 'grunt concat' concatenates multiple source files into single file.
		 **/
		concat: {
			/**
			 * The 'build_css' target concatenates compiled CSS and vendor CSS
			 * together.
			 **/
			build_css: {
				src: [
					'<%= vendor_files.css %>',
					'<%= recess.build.dest %>'
				],
				dest: '<%= recess.build.dest %>'
			},
			/** 
			 * The 'compile_js' target is the concatenation of our application source
			 * code and all specified vendor source code into a single file.
			 **/
			compile_js: {
				options: {
					banner: '<%= meta.banner %>'
				},
				src: [
					'<%= vendor_files.js %>',
					'module.prefix',
					'<%= build_dir %>/src/**/*.js',
					'<%= html2js.app.dest %>',
					'<%= html2js.common.dest %>',
					'module.suffix'
				],
				dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
			}
		},
		/**
		 * The 'copy' task just copies files from A to B.
		 * build_appjs, build_app_assets, etc. are targets
		 **/
		copy: {
			build_appjs : {
				files:  [{
					src: ['<%= app_files.js %>'],
					dest: '<%= build_dir %>/',
					cwd: '.',
					expand: true
				}]
			}, 
			build_app_assets: {
				files: [{
					src: ['**'],
					dest: '<%= build_dir %>/assets/',
					cwd: 'src/assets',
					expand: true
				}]
			},
			build_vendor_assets: {
				files: [{
					src: ['<%= app_files.js %>'],
					dest: '<%= build_dir %>/',
					cwd: '.',
					expand: true
				}]
			},
			build_vendorjs: {
				files: [{
					src: ['<%= vendor_files.js %>'],
					dest: '<%= build_dir %>/',
					cwd: '.',
					expand: true
				}]
			},
			compile_assets: {
				files: [{
					src: ['**'],
					dest: '<%= compile_dir %>/assets',
					cwd: '<%= build_dir %>/assets',
					expand: true
				}]
			}
		},
		/**
		 * The 'delta' task replaces the 'watch' default task that checks to see if
		 * any of the files listed below change.
		 **/
		delta: {
			options: {
				livereload: true /* it runs by default on port 35729 */
			},
			/**
			 * When the gruntfile changes it will be reloaded and we
          * want to lint it.
			 **/	
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['jshint:gruntfile'],
				options: {
					livereload: false
				}
			},
			/**
			 * When our JavaScript source files change, we want to runt lint them
			 * and run our unit tests.
			 **/
			jssrc: {
				files: ['<%= app_files.js %>'],
				tasks: ['jshint:src', 'karma:unit:run', 'copy:build_appjs']
			},
			/**
			 *	When assets are changed, copy them. Note that this will *not* copy
			 * new files, so this is probably not very useful.
			 **/
			assets: {
				files: ['src/assets/**/*'],
				tasks: ['copy:build_assets']
			},
			/**
			 * When index.html changes, we need to compile it.
			 **/
			html: {
				files: ['<%= app_files.html %>'],
				tasks: ['index:build']
			},
			/**	
			 * When our templates change, we only rewrite the
			 * template cache.
			 **/
			tpls: {
				files: ['<%= app_files.atpl %>', '<%= app_files.ctpl %>'],
				tasks: ['html2js']
			},
			/**
			 * When a Javascript unit test file changes, we only want to lint
          * it and run the unit tests. We don't want to do any live reloading.
			 **/
			jsunit: {
				files: ['<%= app_files.jsunit %>'],
				tasks: ['jshint:test', 'karma:unit:run'],
				options: {
					livereload: false
				}
			}
		},
		/**
		 * HTML2JS is a Grunt plugin that takes all your template files and places them
		 *	into JavaScript files as strings that are added to AngularJS's template cache.
		 **/
		html2js: {
			/**
			 *	These are the templates from 'src/app'
			 **/
			app: {
				options: { base: 'src/app'},
				src: ['<%= app_files.atpl %>'],
				dest: '<%= build_dir %>/templates-app.js'
			},
			/**
			 * These are the templates from 'src/common'.
			 **/
			common: {
				options: { base: 'src/common'},
				src: ['<%= app_files.ctpl %>'],
				dest: '<%= build_dir %>/templates-common.js'
			}
		},
		/**
		 * The 'index' task compiles the 'index.html' file as a Grunt template. CSS
		 *	and JS files co-exist here but they get split apart later.
		 **/
		index: {
			build: {
				dir: '<%= build_dir %>',
				src: [
					'<%= vendor_files.js %>',
					'<%= build_dir %>/src/**/*.js',
					'<%= html2js.common.dest %>',
					'<%= html2js.app.dest %>',
					'<%= vendor_files.css %>',
					'<%= recess.build.dest %>'
				]
			},
			compile: {
				dir: '<%= compile_dir %>',
				src: [
					'<%= concat.compile_js.dest %>',
					'<%= vendor_files.css %>',
					'<%= recess.compile.dest %>'
				]
			}
		},
		/**
		 * 'jshint' defines the rules of our linter as well as which files we 
		 *	should check (src, test and gruntfile are targets)
		 **/
		jshint: {
			src: ['<%= app_files.js %>'],
			test: ['<%= app_files.jsunit %>'],
			gruntfile: ['Gruntfile.js'],
			options: {
				curly: true, /* put curly brace ALWAYS */
				immed: true, /* force to wrap inmediate functions with parentheses */
				newcap: true, /* force to capitalize names of constructor functions */
				noarg: true, /* prohibits the use of arguments.caller and arguments.callee */
				sub: true, /* suppresses warnings about using [] notation. */
				boss: true, /* suppresses warnings about the use of assignments (for case) */
				eqnull: true /* suppresses warnings about == null comparisons */
			}
		},
		/**
		 * The karma configurations.
		 **/
		karma: {
			options: { configFile: '<%= build_dir %>/karma-unit.js'},
			unit: { runnerPort: 9101, background: true },
			continuous: { singleRun: true}
		},
		/**
		 * This task compiles the karma template so that changes to its file array
		 * don't have to be managed manually.
		 **/
		karmaconfig: {
			unit: {
				dir: '<%= build_dir %>',
				src: [
					'<%= vendor_files.js %>',
					'<%= html2js.app.dest %>',
					'<%= html2js.common.dest %>',
					'<%= test_files.js %>'	
				]
			}
		},
		/**
		 *	'ng-min' annotates the sources befores minifying. That is, allows us
		 * to code without the array syntax.
		 **/
		ngmin: {
			compile: {
				files: [
					{ 
						src: ['<%= app_files.js %>'],
						cwd: '<%= build_dir %>',
						dest: '<%= build_dir %>',
						expand: true
					}
				]
			}
		},
		/**
		 * 'recess' handles our LESS compilation and uglification automatically.
		 **/
		recess: {
			build: {
				src: ['<%= app_files.css %>'],
				dest: '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css',
				options: {
					compile: true, /* outputs your compiled source */
					compress: false,
					noUnderscores: false,
					noIDs: false,
					zeroUnits: false
				}
			},
			compile:	{
				src: ['<%= recess.build.dest %>' ],
				dest: '<%= recess.build.dest %>',
				options: {
					compile: true,
					compress: true, /* outputs your compile source, but minified */
					noUnderscores: false,
					noIDs: false,
					zeroUnits: false
				}
			}
		},
		/**
		 * Minify the sources
		 **/
		uglify: {
			compile: {
				options: {	banner: '<%= meta.banner %>'	},
				files: { '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'}
			}
		}
	};

	grunt.initConfig(grunt.util._.extend(taskConfig,userConfig)); 

	/**
	 * Renaming 'watch' task to 'delta' in order to make safe to just compile 
    * or copy *only* what was changed.
	 **/	
	grunt.renameTask('watch', 'delta');
	grunt.registerTask('watch', ['build', 'karma:unit', 'delta']);

	/** 
	 * The Default task is to build and compile 
	 **/
	grunt.registerTask('default', ['build', 'compile']);
	/**
	 * The 'build' task gets your app ready to run for development and testing
	 **/
	grunt.registerTask('build', [
		'clean', 'html2js', 'jshint', 'recess:build', 'concat:build_css', 
		'copy:build_app_assets', 'copy:build_vendor_assets','copy:build_appjs',
		'copy:build_vendorjs','index:build', 'karmaconfig', 'karma:continuous'
	]);
	/**
	 * The 'compile' task gets your app ready for deployment by concatenating
	 * and minifying your code.
	 **/
	grunt.registerTask('compile', [
		'recess:compile', 'copy:compile_assets', 'ngmin', 
		'concat:compile_js', 'uglify', 'index:compile'
	]);
	/**
	 * A utility function to get all app JavaScript sources.
	 **/
	function filterForFileType(files, type){
		return files.filter(function(file){
			return file.match(type);
		});
	}

	/**
	 *
	 **/
	function processIndexTemplate(){
		var buildDir = grunt.config('build_dir');
		var compileDir = grunt.config('compile_dir');
		var dirRE = new RegExp('^(' + buildDir + '|' + compileDir +')\/', 'g');
		var jsFiles = filterForFileType(this.filesSrc,/\.js$/).map(function(file){
				return file.replace(dirRE, '');});
		var cssFiles = filterForFileType(this.filesSrc,/\.css$/).map(function(file){
				return file.replace(dirRE, '');});

		grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
			process: function(contents, path) {
				return grunt.template.process(contents, {
					data: {
						scripts: jsFiles,
						styles: cssFiles,
						version: grunt.config('pkg.version')
					}	
				});
			}
		});
	}

	function processKarmaTemplate(){
		var  buildDir = grunt.config('build_dir');
		var  jsFiles = filterForFileType(this.filesSrc);
		grunt.file.copy('karma/karma-unit.tpl.js', buildDir + '/karma-unit.js', {
			process: function(contents, path){
				return grunt.template.process(contents, {
					data:  {
						scripts: jsFiles
					}
				});
			}
		});
	}

	/**
	 * The index.html template includes the stylesheet and javascript sources
	 * based on dynamic names calculated in this Gruntfile. This task assembles
	 * the list into variables for the template to use and then runs the
	 * compilation.
	 **/
	grunt.registerMultiTask('index', 'Process index.html template', 
		processIndexTemplate);

	
	/**
	 * In order to avoid having to specify manually the files needed for karma to
	 *	run, we use grunt to manage the list for us. The 'karma/*' files are
	 * compiled as grunt templates for use by Karma.
	 **/
	grunt.registerMultiTask('karmaconfig', 'Process karma config templates', 
		processKarmaTemplate);
};

