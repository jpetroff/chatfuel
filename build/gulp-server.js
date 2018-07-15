var gulp = require('gulp')
var express = require('express')
var livereload = require('livereload')
var path = require('path')

var changeLog = function(watcher, name) {
	watcher.on('change', function(ev) {
		console.log('['+name+'] → File '+path.basename(ev.path)+' was '+ev.type)
	})
}

gulp.task('server', function() {
	var lr = livereload.createServer()
	lr.watch(__src + '/public')

	var wJSLibs = gulp.watch('./src/libs/js/*.js', ['js-libs'])
	changeLog(wJSLibs, 'js-libs')

	var wJSBuild = gulp.watch(['./src/js/**/*.js','./src/**/*.vue'], ['js-build'])
	changeLog(wJSBuild, 'js-build')

	var wLess = gulp.watch(['./src/less/**/*.less','./src/**/*.vue'], ['less'])
	changeLog(wLess, 'less')

	var wPages = gulp.watch('./src/pages/*.html', ['pages'])
	changeLog(wPages, 'pages')

	var app = express()

	app.use(express.static('./public'))

	app.get('/', function(req, res) {
		res.sendFile(__src + '/public/pages/home.html')
	})

	app.get('/get-started', function (req, res) {
		res.sendFile(__src + '/public/pages/index.html')
	})

	app.listen('8000', '0.0.0.0', function() {
		console.log('express has took off')
	})
})