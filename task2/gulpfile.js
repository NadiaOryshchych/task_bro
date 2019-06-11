const gulp = require('gulp');
const rename = require('gulp-rename'); // Переименование файлов
const sass = require('gulp-sass'); // переводит SASS в CSS
const autoprefixer = require('gulp-autoprefixer'); // Проставлет вендорные префиксы в CSS для поддержки старых браузеров
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser'); // Минимизация javascript 
const htmlmin = require('gulp-htmlmin'); // сжатие html
const browserSync = require('browser-sync').create();

// cssnano = require("gulp-cssnano"), // Минимизация CSS
// ещё почитать про gulp-clean-css
//   concat = require("gulp-concat"), // Объединение файлов - конкатенация
// jshint / eslint ??
// const uglify = require('gulp-uglify-es'); // Минимизация javascript
// const minify = require('gulp-minify'); // Минимизация javascript 
// imagemin = require('gulp-imagemin'), // Сжатие изображений
// Tinypng — сжатие изображений. Работает по той же аналогии, что и imagemin, но сжимает значительно лучше.

// CSS task
function cssStyle(done) {
  gulp.src('src/sass/**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename({
      dirname: '.',
      basename: 'style',
      suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(gulp.dest('src/css/'))
    .pipe(browserSync.stream());
  done();
}

// JS task
function compressedJs(done) {
  gulp.src('src/js/*.js')
    .pipe(terser())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.stream());
  done();
}

// HTML task
function minifyHtml(done) {
  gulp.src('src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist'));
  done();
}

function serve(done) {
  browserSync.init({
    server: {
      baseDir: 'dist/'
    },
    port: 3000
  });
  done();
}

function browserReload(done) {
  browserSync.reload();
  done();
}

// function watchSass() {
//   gulp.watch('./src/sass/**/*', cssStyle);
// }

// function watchJs() {
//   gulp.watch('./src/js/**/*.js', compressedJs);
// }

// function watchHtml() {
//   gulp.watch('./src/*.html', minifyHtml);
// }

function watchFiles() {
  gulp.watch('./src/**/*.html', gulp.parallel(minifyHtml, browserReload));
  gulp.watch('./src/sass/**/*', gulp.parallel(cssStyle, browserReload));
  gulp.watch('./src/**/*.js', gulp.parallel(compressedJs, browserReload));
  gulp.watch('./src/**/*', browserReload);
}

gulp.task('default', gulp.parallel(serve,  watchFiles));
