module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig ({
		uglify: {
			dist: {
				src: ['Ajax.js'] ,
				dest: 'Ajax.min.js'
			}
		} ,
		jshint: {
			dist: {
				options: {
					globals: {
						Ext: true
					} ,
					eqeqeq: true ,
					undef: true ,
					eqnull: true ,
					browser: true ,
					smarttabs: true ,
					loopfunc: true
				} ,
				src: ['Ajax.js']
			}
		}
	});

	grunt.registerTask ('check', ['jshint']);
	grunt.registerTask ('minify', ['uglify']);
	grunt.registerTask ('build', ['check', 'minify']);
};
