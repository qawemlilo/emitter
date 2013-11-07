module.exports = function(grunt) {

    grunt.initConfig({
        uglify: {
            options: {
                mangle: false
            },
            
            my_target: {
                files: {
                    'dest/emitter.min.js': ['lib/emitter.js']
                }
            }
        },
        
        
        jshint: {
            options: {
                 jshintrc: '.jshintrc'
            },
            
            all: [
                'Gruntfile.js',
                'index.js',
                'lib/*.js'
            ]
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    
    grunt.registerTask('default', ['jshint', 'uglify']);
};

