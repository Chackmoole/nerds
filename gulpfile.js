'use strict';

var gulp = require('gulp');
var csso = require('gulp-csso');
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var rename = require('gulp-rename');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var csscomb = require('gulp-csscomb');
var watch = require('gulp-watch');


//сборка стилей
gulp.task('style', function() {
  gulp.src("css/style.css")
  .pipe(plumber())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(csso())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('css/'))
  .pipe(server.reload({stream: true}));
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: "./",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("css/style.css", ["style"]);
  gulp.watch("*.html").on("change", server.reload);
});

gulp.task('csscomb', function() {
  return gulp.src('css/style.css')
  .pipe(plumber())
  .pipe(csscomb())
  .pipe(gulp.dest('css/'))
});
