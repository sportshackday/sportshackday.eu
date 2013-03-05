'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      livereload: {
        options: {
          port: 9001,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, '.')]
          }
        }
      }
    },
    regarde: {
      fred: {
        files: '*.txt',
        tasks: ['livereload']
      }
    },
    concat: {
      dist: {
        src: ['js/*.js'],
        dest: 'js/compiled/site.js'
      }
    },
    compass: {
      build: {
        src: 'css/scss',
        dest: 'css',
        outputstyle: 'compressed',
        linecomments: false,
        forcecompile: true
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'js/',
          src: '*.js',
          dest: 'js/compiled'
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['js/main.js']
    }
  });

  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', [
    'compass:server',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('build', [
    'jshint',
    'compass',
    'concat',
    'ngmin'
  ]);

  grunt.registerTask('default', ['build']);
};
