'use strict';

var gulp = require('gulp')
var karmaServer = require('karma').Server;

// Run tests
gulp.task('test', function (done) {
    new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
});