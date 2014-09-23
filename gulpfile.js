var gulp = require('gulp');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var fs = require('fs');

gulp.task('default', ['userscript', 'chrome'], function() {
});

gulp.task('userscript', function() {
    return gulp.src('src/undirect.userscript.js')
        .pipe(replace('//REPLACE_ME', undirectScript))
        .pipe(rename('undirect.js'))
        .pipe(gulp.dest('package/userscript'));
});

gulp.task('chrome', function() {
    gulp.src('src/undirect.chromeextension.js')
        .pipe(replace('//REPLACE_ME', undirectScript))
        .pipe(rename('undirect.js'))
        .pipe(gulp.dest('package/chrome'));

    gulp.src('assets/undirect*.png')
        .pipe(gulp.dest('package/chrome'));

    gulp.src('build/chrome/*')
        .pipe(gulp.dest('package/chrome'));
});

function undirectScript() {
    return fs.readFileSync('src/undirect.js');
}