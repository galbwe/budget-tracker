const gulp = require('gulp');
const watch = require('gulp-watch');
const gls = require('gulp-live-server');

const globs = ['api/*.js', 'api/*.json'];

function api() {
  var server = gls.new('api/server.js');
  server.start();
  watch(globs, function() {
    console.log('Detected change in api source code. Restarting.');
    server.stop();
    server.start();
  })
}

exports.api = api;
