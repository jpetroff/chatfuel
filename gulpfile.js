global.__src = __dirname
global.__local = (process.env.P != '1')
var gulp = require('gulp')

console.log(global.__local);

require('./build/gulp-build')
require('./build/gulp-server')
require('./build/gulp-pages')

gulp.task('start', ['build','server'])
gulp.task('build', ['js-libs', 'js-build', 'less', 'pages', 'assets'])

