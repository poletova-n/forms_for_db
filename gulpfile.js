const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const rebaseUrls = require('gulp-css-rebase-urls');


gulp.task('images-clean-dist', () =>
gulp.src('./src/main/resources/static/images', {read: false})
    .pipe(clean())
);

gulp.task('images', ['images-clean-dist'], () =>
gulp.src('./src/main/markup/src/images/**/*')
    .pipe(gulp.dest('./src/main/resources/static/images'))
);

gulp.task('images:watch', ['images'],  () =>
gulp.watch('./src/main/markup/src/images/**/*', ['images'])
);

gulp.task('sass', () =>
gulp.src('./src/main/markup/src/styles/default.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rebaseUrls())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src/main/resources/static/styles'))
);

gulp.task('sass:watch', ['sass'], () =>
gulp.watch('./src/main/resources/static/styles/**/*.scss', ['sass'])
);


// common
gulp.task('build', ['sass', 'images']);
gulp.task('default', ['sass:watch', 'images:watch']);