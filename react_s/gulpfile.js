var gulp = require('gulp');
var uglify = require('gulp-uglify');

var rename = require('gulp-rename');
var del = require('del');
var webpack = require('gulp-webpack');
var config = require('./webpack.config');
var connect = require("gulp-connect");
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

gulp.task('clean', function(){
	del(['build/']);
});

gulp.task('server', ['js'], function(){
	 browserSync.init({
		server: {
			baseDir: "./"
			}
    });

    gulp.watch("*.html").on("change", reload);
    gulp.watch('./src/*/*.js', ['js-watch']);
});

gulp.task('js', ['clean'], function() {
  gulp.src('./src')
  	.pipe(webpack(config))
  	.pipe(uglify())
  	.pipe(gulp.dest("build/"));
});

gulp.task('js-watch', ['js'], reload);
