// include gulp
var gulp = require('gulp');
var gutil = require('gulp-util');

// include plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var es = require('event-stream');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');

var config = {
	appDir: './app',
    bowerDir: './bower_components/bootstrap/dist',
    buildDir: './build',
};

var onError = function (err) {  
  gutil.beep();
  console.log(err);
  this.emit('end');
};

// compile, concatinate & minify sass
gulp.task('main-css', function() {
    var mainStyles = gulp.src(config.appDir + '/sass/main/*.scss')
    	.pipe(plumber({
      		errorHandler: onError
    	}))
    	.pipe(sourcemaps.init())
    	.pipe(sass())

    return es.merge(mainStyles)
    .pipe(concat('main.css'))
  	.pipe(gulp.dest(config.buildDir + '/css'))
  	.pipe(minifyCss({compatibility: 'ie8'}))
  	.pipe(rename('main.min.css'))
  	.pipe(sourcemaps.write('.'))
  	.pipe(plumber.stop())
  	.pipe(gulp.dest(config.buildDir + '/css'))
});

// compile, concatinate & minify sass
gulp.task('landing-css', function() {
    var landingStyles = gulp.src(config.appDir + '/sass/landing/*.scss')
      .pipe(plumber({
          errorHandler: onError
      }))
      .pipe(sourcemaps.init())
      .pipe(sass())

    return es.merge(landingStyles)
    .pipe(concat('landing.css'))
    .pipe(gulp.dest(config.buildDir + '/css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename('landing.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.buildDir + '/css'))
});

// concatinate & minify js
gulp.task('scripts', function () {
    return gulp.src(config.appDir + '/js/*.js')
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest(config.buildDir + '/js'))
});

// move bower components
gulp.task('vendor', function() {
    return gulp.src([
      config.bowerDir + '/css/bootstrap.css',
      config.bowerDir + '/js/bootstrap.js',
      config.bowerDir + '/fonts/**/*',
      config.appDir + '/vendor/**/*'
      ]) 
    .pipe(gulp.dest(config.buildDir + '/vendor'))
});

// compress images
gulp.task('images', function() {
  return gulp.src(config.appDir + '/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest(config.buildDir + '/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// watch files
gulp.task('watch', function() {
    gulp.watch(config.appDir + '/js/*.js', ['scripts'])
    gulp.watch(config.appDir + '/sass/main/*.scss', ['main-css'])
    gulp.watch(config.appDir + '/sass/landing/*.scss', ['landing-css'])
    gulp.watch(config.appDir + '/images/**/*', ['images'])
});


// setup default task
gulp.task('default', ['main-css', 'landing-css', 'vendor', 'images', 'watch']);