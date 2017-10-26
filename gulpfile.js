var gulp    = require("gulp");
var sass    = require("gulp-sass");
var htmlmin   = require("gulp-htmlmin");
var notify    = require("gulp-notify");
var concat    = require("gulp-concat");
var uglify    = require("gulp-uglify");
var browserSync = require("browser-sync").create();
var del     = require("del");
var jshint    = require("gulp-jshint");
var cssmin    = require("gulp-cssmin");
var runSequence = require("run-sequence");
var imagemin  = require("gulp-imagemin");

/* Tasks cached */
gulp.task("cache:css", function() {
  del("build/css/style.css")
});

gulp.task("cache:js", function() {
  del("build/js/app.js")
});

gulp.task("cache:html", function(){
  del("build/index.html")
});

/*Task minfy PNG, JPEG, GIF and SVG images*/
gulp.task("imagemin", function(){
  return gulp.src("source/img/**/*")
         //.pipe(imagemin())
         .pipe(gulp.dest("build/img"));
});


/* Task compile scss to css */
gulp.task("sass", ['cache:css'], function() {
  return gulp.src("source/scss/style.scss")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest("build/css"))
        .pipe(browserSync.stream());
});


/* Task minify html */
gulp.task("html", ['cache:html'], function() {
  return gulp.src("source/index.html")
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("build"))
        .pipe(browserSync.stream());
});

/*Task jshint js*/
gulp.task("jshint", function(){
  return gulp.src("source/js/app.js")
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/* Task minify js */
gulp.task("js", ['cache:js'], function() {
  return gulp.src("source/js/app.js")
        .pipe(uglify())
        .pipe(gulp.dest("build/js"))
        .pipe(browserSync.stream());
});

/* Task concat js */
gulp.task("concat-js", function() {
  return gulp.src([
          'node_modules/jquery/dist/jquery.js',
          'node_modules/tether/dist/js/tether.js',
          'node_modules/bootstrap/dist/js/bootstrap.js'
        ])
        //.pipe(concat("main.js"))
        //.pipe(uglify())
        .pipe(gulp.dest("build/js"))
});

/*Task move fonts to font awesome*/
gulp.task("move-fonts", function(){
  return gulp.src('node_modules/font-awesome/fonts/**')
       .pipe(gulp.dest("build/fonts"))
});

/* Task server local */
gulp.task("server", function() {
  browserSync.init({
    server: {
      baseDir: "build/"
    }
  });

  /* Watch */
  gulp.watch("source/scss/**/*.scss", ['sass']);
  gulp.watch("node_modules/bootstrap/scss/**/*.scss", ['sass']);
  gulp.watch("source/js/**/*.js", ['js']);
  gulp.watch("source/index.html", ['html']);
});

gulp.task("default", function(cb){
  return runSequence(['imagemin', 'sass', 'html', 'jshint', 'js', 'concat-js', 'move-fonts', 'server'], cb)
});
