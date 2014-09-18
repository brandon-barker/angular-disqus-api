module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    library: grunt.file.readJSON('bower.json'),
    concat: {
      options: {
        separator: ''
      },
      library: {
        src: [
          'src/disqusApi.js'
        ],
        dest: 'dist/disqusApi.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      jid: {
        files: {
          'dist/disqusApi.min.js': ['<%= concat.library.dest %>']
        }
      }
    },
    jshint: {
      beforeConcat: {
        src: ['gruntfile.js', 'src/*.js']
      },
      afterConcat: {
        src: [
          '<%= concat.library.dest %>'
        ]
      },
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true,
          angular: true
        },
        globalstrict: false
      }
    },
    watch: {
      options: {
        livereload: true
      },
      files: [
        'Gruntfile.js',
        'src/*'
      ],
      tasks: ['default']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint:beforeConcat', 'concat', 'jshint:afterConcat', 'uglify']);
  grunt.registerTask('livereload', ['default', 'watch']);

};