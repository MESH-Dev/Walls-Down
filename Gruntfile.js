module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // concat - combine files to production version
        compass: {
          dist: {
            options: {
              sassDir : 'assets/sass/',
              cssDir: './',
              environment: 'production'
            }
          }
        },
        concat: {
          js: {
            // add/remove/edit files and order to project needs
            src: ['assets/js/jquery-1.11.1.min.js','assets/js/featherlight.min.js','assets/js/impress.js','assets/js/scripts.js'],
            dest: 'assets/prod/<%= pkg.name %>.js'
          }
        },
        // uglify - minify production js file created through concat
        uglify: {
          js: {
            files: {
              'assets/prod/<%= pkg.name %>.min.js': ['assets/prod/<%= pkg.name %>.js']
            }
          }
        },
        // watch - tasks triggered with [grunt watch] is initiated in the cli
        watch:{
          cssconcat:{
            files: ['assets/css/*.css','!assets/css/*.min.css'],
            tasks: ['concat']
          },
          jsconcat:{
            files: ['assets/js/jquery-1.11.1.min.js','assets/js/featherlight.min.js','assets/js/impress.js','assets/js/scripts.js'],
            tasks: ['concat']
          } /*,
          jsuglify:{
            files: ['prod/*.js'],
            tasks: ['uglify']
          }*/,
          css: {
            files: 'assets/sass/*.scss',
            tasks: ['compass']
          }
        }

    });
    // load tasks from node_modules
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // tasks that will be triggered with [grunt] in the cli
    grunt.registerTask('default', ['compass', 'concat:js', 'uglify:js']);
};
