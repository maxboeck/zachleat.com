/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Task configuration.
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			js: {
				src: ['web/js/initial.js'],
				dest: 'web/dist/initial.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			js: {
				src: '<%= concat.js.dest %>',
				dest: 'web/dist/initial.min.js'
			}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				unused: true,
				boss: true,
				eqnull: true,
				browser: true,
				globals: {}
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			js: {
				src: ['js/**/*.js']
			}
		},
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'web/dist/global.css': ['web/css/buttsweater.scss', 'web/css/socialmenu.scss', 'web/css/thirdparty.scss'],
					'web/dist/icons.css': 'web/css/foundicons.scss'
				}
			}
		},
		shell: {
			jekyll: {
				command: 'jekyll --no-auto',
				options: {
					stdout: true,
					execOptions: {
						cwd: 'web'
					}
				}
			}
		},
		watch: {
			assets: {
				files: ['web/css/**/*', 'web/js/**/*'],
				tasks: ['default']
			},
			content: {
				files: ['web/_posts/**/*'],
				tasks: ['content']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-shell');

	// Default task.
	grunt.registerTask('content', ['shell:jekyll']);
	grunt.registerTask('assets', ['sass', 'jshint', 'concat:js', 'uglify']);
	grunt.registerTask('default', ['assets', 'content']);

};
