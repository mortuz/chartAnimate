'use strict';

// Get all the dependincies
var gulp = require('gulp'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  browserSync = require('browser-sync'),
  plumber = require('gulp-plumber');

gulp.task('serve', ['sass', 'concat'], function () {

  browserSync.init({
    server: './',
    notify: false
  });

  gulp.watch(['./app/dev/sass/**/*.scss'], ['sass']);
  gulp.watch(['./app/dev/js/*.js'], ['concat']);

  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./app/dev/js/*.js').on('change', browserSync.reload);
  gulp.watch('./app/dev/sass/*.scss').on('change', browserSync.reload);

});

// sass task
gulp.task('sass', function () {
  return gulp.src('app/dev/sass/*.scss')
    .pipe(plumber())
    .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('app/css'));
});

// Concat task
gulp.task('concat', function () {
  return gulp.src([
    'app/dev/js/jquery.min.js',
    'app/dev/js/vjs.js',
    'app/dev/js/charlie.js',
    'app/dev/js/promise.js', 
    'app/dev/js/fetch.js', 
    'app/dev/js/pictor.js', 
    'app/dev/js/additional.js',
    // 'app/dev/js/fb-login.js',
    'app/dev/js/config.js',
  ])
    .pipe(concat('compiled.js'))
    .pipe(gulp.dest('app/js'))
});

// js compress task
gulp.task('compress-js', function () {
  return gulp.src('./app/dev/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});


// default task
gulp.task('default', ['serve']);