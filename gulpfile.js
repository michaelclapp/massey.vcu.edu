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
	appDir: './app/assets/',
    bowerDir: './bower_components/bootstrap/dist',
    buildDir: './build',
};

var onError = function (err) {  
  gutil.beep();
  console.log(err);
  this.emit('end');
};

// compile, concatinate & minify sass
gulp.task('css', function() {
    var styles = gulp.src(config.appDir + '/sass/*.scss')
    	.pipe(plumber({
      		errorHandler: onError
    	}))
    	.pipe(sourcemaps.init())
    	.pipe(sass())

    return es.merge(styles)
    .pipe(concat('all.css'))
  	.pipe(gulp.dest(config.buildDir + '/css'))
  	.pipe(minifyCss({compatibility: 'ie8'}))
  	.pipe(rename('all.min.css'))
  	.pipe(sourcemaps.write('.'))
  	.pipe(plumber.stop())
  	.pipe(gulp.dest(config.buildDir + '/css'))
});

// move bower components
gulp.task('bower', function() {
    return gulp.src([
      config.bowerDir + '/css/bootstrap.css',
      config.bowerDir + '/js/bootstrap.js',
      config.bowerDir + '/fonts/**/*'
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
    gulp.watch(config.appDir + '/sass/*.scss', ['css'])
    gulp.watch(config.appDir + '/images/**/*', ['images'])
});


// setup default task
gulp.task('default', ['css', 'bower', 'images', 'watch']);