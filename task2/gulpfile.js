const gulp = require('gulp');
const rename = require('gulp-rename'); // Переименование файлов
const sass = require('gulp-sass'); // переводит SASS в CSS
const autoprefixer = require('gulp-autoprefixer'); // Проставлет вендорные префиксы в CSS для поддержки старых браузеров
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();


//   cssnano = require("gulp-cssnano"), // Минимизация CSS
// ещё почитать про gulp-clean-css
//   imagemin = require('gulp-imagemin'), // Сжатие изображений
//   concat = require("gulp-concat"), // Объединение файлов - конкатенация
//   uglify = require("gulp-uglify"), // Минимизация javascript
// jshint ??
// Tinypng — сжатие изображений. Работает по той же аналогии, что и imagemin, но сжимает значительно лучше.

function css_style(done) {
  gulp.src('./src/sass/**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errorLogToConsole: true
      // outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(rename({
      dirname: '.',
      basename: 'style',
      suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src/css/'))
    .pipe(browserSync.stream());
  done();
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

function watchSass() {
  gulp.watch('./src/sass/**/*', css_style);
}
function watchFiles() {
  gulp.watch('./src/**/*', browserReload);
  gulp.watch('./src/**/*.html', browserReload);
  gulp.watch('./src/**/*.php', browserReload);
  gulp.watch('./src/**/*.js', browserReload);
}

// gulp.task('default', gulp.series(hello, watchSass));
gulp.task('default', gulp.parallel(serve, watchSass, watchFiles ));

// exports.default = defaultSomeTask;