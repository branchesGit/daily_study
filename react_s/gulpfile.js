var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var webpack = require('gulp-webpack');
var config = require('./webpack.config');

gulp.task('clean', function(){
	del(['build/'])
});

gulp.task('default', ['clean'], function() {
  gulp.src('./src')
  	.pipe(webpack(config))
  	.pipe(uglify())
  	.pipe(gulp.dest("build/"));
});