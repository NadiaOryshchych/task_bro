const gulp = require('gulp');
const rename = require('gulp-rename'); // Переименование файлов
const sass = require('gulp-sass'); // переводит SASS в CSS
const autoprefixer = require('gulp-autoprefixer'); // Проставлет вендорные префиксы в CSS для поддержки старых браузеров
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify-es'); // Минимизация javascript
const minify = require('gulp-minify'); // Минимизация javascript 
const browserSync = require('browser-sync').create();

// cssnano = require("gulp-cssnano"), // Минимизация CSS
// ещё почитать про gulp-clean-css
//   concat = require("gulp-concat"), // Объединение файлов - конкатенация
// jshint / eslint ??
// imagemin = require('gulp-imagemin'), // Сжатие изображений
// Tinypng — сжатие изображений. Работает по той же аналогии, что и imagemin, но сжимает значительно лучше.

// CSS task
function cssStyle(done) {
  gulp.src('./src/sass/**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer())
    .pipe(rename({
      dirname: '.',
      basename: 'style',
      suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src/css/'))
    .pipe(browserSync.stream());
  done();
}

// JS task
function compressedJs() {
  return gulp.src('./src/js/*.js')
    .pipe(minify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('.src/js'));
}

function serve(done) {
  browserSync.init({
    server: {
      baseDir: './src/'
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
//   gulp.watch('./src/js/**/*.js', gulp.parallel(compressedJs));
// }

function watchFiles() {
  gulp.watch('./src/**/*', browserReload);
  gulp.watch('./src/**/*.html', browserReload);
  gulp.watch('./src/**/*.css', gulp.parallel(cssStyle, browserReload));
  gulp.watch('./src/**/*.js', gulp.parallel(compressedJs, browserReload));
}

gulp.task('default', gulp.parallel(serve, watchFiles));
