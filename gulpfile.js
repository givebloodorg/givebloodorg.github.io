var gulp = require('gulp');
var sass = require('gulp-sass');
var gulpConnect = require('gulp-connect');


// Task: Webserver
// Serve the website locally using gulp-connect
gulp.task('webserver', function(){
  gulpConnect.server({
    livereload: true,
    port: '4000'
    root: '.'
  });
});

// Task: Assets.
// Minify and Concatenate the js, css, css
gulp.task('assets', function() {
 //
});
// Task: Styles
gulp.task('styles', function () {
   return gulp.src('assets/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'})on('error', sass.logError))
    .pipe(gulp.dest('build/css/doesangue.css'))
    .pipe(gulpConnect.reload());
});

// Task: images. Minify images
gulp.task('images', function() {
   return gulp.src('assets/images/**/*{.png,.jpg,.gif,.svg}')
     .pipe(imagefy({
       progressive: true,
       optimizationLevel: 5
     }))
     .pipe(gulp.dest('build/images/'));
});

// Wait for changes and execute the task.
gulp.task('watch', function() {
   gulp.watch('assets/sass/**/*.scss', ['styles'])
   gulp.watch('assets/scripts/**/*.js', ['scripts'])
   gulp.watch('assets/images/**/*{.png,jpg,svg,gif}', ['images'])
});

gulp.task('default', ['assets', 'watch']);
