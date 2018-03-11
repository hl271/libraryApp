var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var jsFile = ['*.js', 'public/js/*.js']
var ejsFile = ['views/*.ejs']
gulp.task('inject', function () {
  //var wiredep = require('wiredep').stream
  var inject = require('gulp-inject')
  var injectSrc = gulp.src(['./public/css/*.css', 
														'./public/js/*.js', 
														'./public/libs/bootstrap/css/bootstrap.min.css', 
														'./public/libs/jquery/jquery.js',
														'./public/libs/bootstrap/js/bootstrap.bundle.min.js'
														], {read: false})

 /* var options = {
    bowerJson: require('./bower.json'),
    directory: './public/libs',
    ignorePath: '../public/libs'
  }
*/
  var injectOptions = {
    ignorePath: '/public'
  }
  return gulp.src('./views/*.ejs')
  //  .pipe(wiredep(options))
    .pipe(inject(injectSrc, injectOptions))
    .pipe(gulp.dest('./views'))
})

gulp.task('serve', ['inject'], function () {
  var serve = nodemon({
    script: 'app.js',
    delayTime: 1,
    env: {
      'PORT': 2710
    },
    watch: [jsFile, ejsFile]
  })
  return serve
    .on('restart', function (ev) {
      console.log('restarted!!!')
    })
})
