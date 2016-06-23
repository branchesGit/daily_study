var gulp = require('gulp');
var uglify = require('gulp-uglify');

var rename = require('gulp-rename');
var del = require('del');
var webpack = require('gulp-webpack');
var config = require('./webpack.config');

var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;


gulp.task('clean', function(){
	del(['build/']);
});

gulp.task('server', ['pack_js'], function(){
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

	//修改html时，加载页面
	gulp.watch("*.html").on("change", reload);
	gulp.watch("./**/*.css").on("change", reload);
	gulp.watch('./src/**/*.js', ['reload_by_js']);
});

gulp.task('pack_js', ['clean'], function(){
	gulp.src('./src')
	.pipe(webpack(config))
	//.pipe(uglify())
	.pipe(gulp.dest("build/"))
	.pipe(reload({stream:true})); //在输出流里强行注入
});

//执行顺序并不对
gulp.task('reload_by_js', ['pack_js'], reload);

