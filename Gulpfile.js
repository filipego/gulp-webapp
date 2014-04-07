(function() {
  'use strict';

  var gulp = require('gulp'),
      gutil = require('gulp-util'),
      compass = require('gulp-compass'),
      minifyCSS = require('gulp-minify-css'),
      rm = require('rimraf'),
      reload = require('gulp-livereload'),
      imagemin = require('gulp-imagemin'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      watch = require('gulp-watch'),
      header = require('gulp-header'),
      pkg = require('./package'),
      banner;

  banner = '/*!\n' +
               ' * ' + pkg.name + ' - ' + pkg.description + '\n' +
               ' * ' + pkg.url + '\n' +
               ' * @author ' + pkg.author + '\n' +
               ' * @version ' + pkg.version + '\n' +
               ' * Copyright ' + pkg.copyright + '. ' + pkg.license + ' licensed.\n' +
               ' */\n';

  var compassSources = [
    'app/sass/_*.scss',
    'app/sass/*.scss'
  ];

  var jsSources = [
    'app/components/lib/jquery/jquery.js',
    'app/components/*.js'
  ];

  gulp.task('serve', ['compass:dev', 'img:dev', 'js:dev', 'static', 'html:dev']);

  gulp.task('build', ['compass', 'img', 'js', 'html']);

  gulp.task('static', function(next) {
    var staticS = require('node-static');
    var server = new staticS.Server('./app');
    require('http').createServer(function (request, response) {
      request.addListener('end', function () {
        server.serve(request, response);
      }).resume();
    }).listen(8080, next);
  });


  gulp.task('img:dev', ['clean'], function() {
    return gulp.src(['app/img/**'])
      .pipe(watch())
      .pipe(reload());
  });

  gulp.task('img', ['clean'], function() {
    return gulp.src(['app/img/**'])
      .pipe(imagemin())
      .pipe(gulp.dest('dest/img'));
  });

  gulp.task('js:dev', ['clean'], function() {
    return gulp.src(jsSources)
      .pipe(concat('app.js'))
      .pipe(uglify())
      .pipe(gulp.dest('app/js'))
      .pipe(watch())
      .pipe(reload());
  });

  gulp.task('js', ['clean'], function() {
    return gulp.src(jsSources)
      .pipe(concat('app.js'))
      .pipe(uglify())
      .pipe(header(banner))
      .pipe(gulp.dest('dest/js'));
  });

  gulp.task('compass:dev', ['clean'], function() {
    return gulp.src(compassSources)
      .pipe(watch())
      .pipe(compass({
          css: 'app/css',
          sass: 'app/sass',
      })
        .on('error', gutil.log))
      .pipe(gulp.dest('app/css'))
      .pipe(reload());
  });

  gulp.task('compass', ['clean'], function() {
    return gulp.src(['app/css/style.css'])
      .pipe(header(banner))
      .pipe(minifyCSS())
      .pipe(gulp.dest('dest/css'));
  });

  gulp.task('html:dev', ['clean'], function() {
    return gulp.src(['app/*.html'])
      .pipe(watch())
      .pipe(reload());
  });

  gulp.task('html', ['clean'], function() {
    return gulp.src(['app/*.html'])
      .pipe(gulp.dest('dest'));
  });

  gulp.task('clean', function(next) {
    rm('dest/', function() {
      next();
    });
  });
})();
