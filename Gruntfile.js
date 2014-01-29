/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        'pkg': grunt.file.readJSON('package.json'),
        'banner': '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
        '* Thanks to:\n*\t<%= pkg.thanks.join("\\n*\\t") %> */\n\n',

        // Task configuration.
        'browserify': {
            dist: {
                files: {
                    'dist/<%= pkg.name %>.js': ['src/*.js']
                }
            }
        },
        'concat': {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['dist/<%= pkg.name %>.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        'uglify': {
            options: {
                banner: '<%= banner %>',
                sourceMap: true,
                report: 'gzip'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        'compress': {
            main: {
                options: {
                    mode: 'gzip'
                },
                files: [
                    {
                        expand: true,
                        cwd: './',
                        src: ['<%= uglify.dist.dest %>'],
                        dest: './',
                        ext: '.gz.js'
                    }
                ]
            }
        },
        'jshint': {
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
                globals: {
                    xe: true,
                    console: true,
                    alert: true,
                    module: true,
                    require: true,
                    describe: true,
                    it: true,
                    beforeEach: true,
                    assert: true,
                    sinon: true
                }
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib_test: {
                src: ['src/**/*.js', 'test/**/*.js']
            }
        },
        'mocha-chai-sinon': {
            build: {
                src: ['test/**/*.js'],
                options: {
                    ui: 'bdd',
                    reporter: 'spec'
                }
            },
            coverage: {
                src: ['test/**/*.js'],
                options: {
                    ui: 'bdd',
                    reporter: 'html-cov',
                    quiet: true,
                    captureFile: './coverage.html'
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-mocha-chai-sinon');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // Testing
    grunt.registerTask('test', [
        'mocha-chai-sinon'
    ]);

    // Default
    grunt.registerTask('default', [
        'jshint',
        'browserify',
        'concat',
        'uglify',
        'compress'
    ]);

};
