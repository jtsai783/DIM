var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var crisper = require('gulp-crisper');
 
gulp.task('source', function () {
    return gulp.src('src/window.html')
        .pipe(vulcanize({
            abspath: '',
            excludes: [],
            stripExcludes: false,
            inlineScripts: false
        }))
        .pipe(crisper())
        .pipe(gulp.dest('dest'));
});

gulp.task('watch', function() {
  gulp.watch('src/*', ['source']);
});

gulp.task('default', ['watch', 'source']);