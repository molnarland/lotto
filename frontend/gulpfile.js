const gulp = require('gulp');
const run = require('gulp-run-command').default;
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug2');

gulp.task('html', function ()
{
    gulp.src('./src/pug/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./dist/html'));
});
gulp.task('whtml', ['html'], function ()
{
    gulp.watch('src/pug/**/*.pug', ['html']);
});

gulp.task('css', function ()
{
    gulp.src('./src/sass/**/*.sass')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({grid: true}))
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('wcss', ['css'], function ()
{
    gulp.watch('src/sass/**/*.sass', ['css']);
});


gulp.task('js', run('webpack'));
gulp.task('wjs', ['js'], function ()
{
    gulp.watch(['src/js/**/*.tsx', 'src/js/**/*.ts', 'src/js/**/*.json'], ['js']);
});
