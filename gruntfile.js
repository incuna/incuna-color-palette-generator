/* eslint-env node */
'use strict';

module.exports = function (grunt) {

    if (grunt.option('help')) {
        // Load all tasks so they can be viewed in the help: grunt -h or --help.
        require('load-grunt-tasks')(grunt);
    } else {
        // Use jit-grunt to only load necessary tasks for each invocation of grunt.
        require('jit-grunt')(grunt);
    }

    grunt.initConfig({ });

    grunt.config.merge({
        watch: {
            sass: {
                files: 'styles/sass/**/*.sass',
                tasks: 'sass',
            },
        },
        sass: {
            options: {
                sourceMap: true,
                sourceMapContents: true,
                includePaths: [
                    require('node-bourbon').includePaths,
                    require('incuna-sass').includePaths,
                    require('incuna-transitions').includePaths,
                    'styles',
                ],
            },
            dev: {files: {'styles/css/main.css': 'styles/sass/main.sass'} },
        },
        eslint: {all: 'scripts/'},

    });

    // - - - T A S K S - - -
    grunt.registerTask('default', 'dev');

    grunt.registerTask('dev', [
        'sass',
        'watch',
    ]);

    grunt.registerTask('build', [
        'sass',
    ]);

    grunt.registerTask('test', [
        'sass',
        'eslint',
    ]);

};
