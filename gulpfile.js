var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');

gulp.task('default', ['watch']);

gulp.task('stylus', function() {
    return gulp.src('styles.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'));
});

gulp.task('babel', function () {
    return browserify({
        entries: './js/Index.jsx',
        extensions: ['.jsx'],
        debug: true
    })
        .transform(babelify.configure({
            experimental: true
        }))
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['stylus', 'babel'], function() {
    gulp.watch('styles.styl', ['stylus']);
    gulp.watch('./js/*.jsx', ['babel']);
});

gulp.task('clean', function () {
    gulp.src(['./dist'], {read: false})
        .pipe(clean());
});