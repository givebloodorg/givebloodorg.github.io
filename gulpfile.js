const
    gulp         = require('gulp')
    plumber      = require('gulp-plumber')
    pug          = require('gulp-pug')
    sass         = require('gulp-sass')
    autoprefixer = require('gulp-autoprefixer')

gulp.task('pug', function(){
    return gulp.src('./src/views/*.pug')
        .pipe(plumber())
        .pipe(pug())
        .pipe(gulp.dest('./'))
});

gulp.task('sass', function(){
    return gulp.src('./src/sass/master.sass')
        .pipe(plumber())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
                browsers: [
                    "Android 2.3",
                    "Android >= 4",
                    "Chrome >= 20",
                    "Firefox >= 24",
                    "Explorer >= 7",
                    "iOS >= 6",
                    "Opera >= 12",
                    "Safari >= 6"
                ],
                cascade: false,
        }))
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('bootstrap:build', function(){
    return gulp.src('./src/bootstrap/scss/bootstrap.scss')
        .pipe(plumber())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./dist/css'))
});