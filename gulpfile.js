let gulp           = require('gulp'),
		gUtil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		cleanCSS       = require('gulp-clean-css'),
		autoPrefix     = require('gulp-autoprefixer'),
		bourbon        = require('node-bourbon'),
		ftp            = require('vinyl-ftp');

const folderName = 'adsgroup', // name folder where theme
			hostName = 'b3'; // name folder where project

gulp.task('browser-sync', function() {
	browserSync({
		proxy: hostName,
		notify: false
	});
});

gulp.task('sass', function() {
	return gulp.src('stylesheet/sass/stylesheet.sass')
		.pipe(sass({
			includePaths: bourbon.includePaths
		}).on('error', sass.logError))
		.pipe(autoPrefix(['last 4 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest(`stylesheet/css/`))
		.pipe(browserSync.reload({stream: true}))
});

// Наблюдение за файлами
gulp.task('watch', ['sass'], function() {
	gulp.watch(`stylesheet/sass/**/*.sass`, ['sass'])
});

// Выгрузка изменений на хостинг
gulp.task('deploy', function() {
	let conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gUtil.log
	});
	let globs = [
		`catalog/view/theme/${folderName}/**`
	];
	return gulp.src(globs, {buffer: false})
		.pipe(conn.dest('/path/to/folder/on/server'));
});

gulp.task('default', ['watch']);
