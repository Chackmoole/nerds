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
var ghPages = require('gulp-gh-pages');


//сборка стилей
gulp.task('style', function() {
  gulp.src("source/css/style.css")
  .pipe(plumber())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(csso())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('source/css/'))
  .pipe(server.reload({stream: true}));
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/css/style.css", ["style"]);
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task('csscomb', function() {
  return gulp.src('source/css/style.css')
  .pipe(plumber())
  .pipe(csscomb())
  .pipe(gulp.dest('source/css/'))
});

gulp.task('page', function() {
  return gulp.src('source/**/*')
    .pipe(ghPages());
});
