var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function () {

	browserSync.init({
		notify: false,
		server: {
			proxy: "https://localhost/Portfolio"
		},
		browser:'firefox'
	});

	watch('/home/brandon/Dev/Portfolio/index.html', function () {
		browserSync.reload();
	});

	watch('./app/assets/styles/**/*.css', function () {
		gulp.start('cssInject');
	});

	watch('./app/assets/scripts/**/*.js', function () {
		gulp.start('scriptsRefresh');
	});

});

gulp.task('cssInject', ['styles'], function () {
	return gulp.src('./app/temp/styles/styles.css')
		.pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function () {
	browserSync.reload();
});