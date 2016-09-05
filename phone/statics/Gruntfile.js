module.exports = function (grunt) {
    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            my_target: {
                files: {
                    'public/base.js': [
                        'src/util/zepto.min.js',
                        'src/util/zepto.fx.js',
                        'src/util/jquery.lettering.js',
                        'src/util/name_space.js',
                        'src/util/conf.js',
                        'src/util/api.js',
                        'src/util/get_init_info.js'
                    ]
                }
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            compress: {
                files: {
                    'css/phone.min.css': [
                        "css/phone.css"
                    ],
                    'css/style.min.css': [
                        "css/style.css"
                    ]
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // 默认任务
    grunt.registerTask('default', ['uglify','cssmin']);
}