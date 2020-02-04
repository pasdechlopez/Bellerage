var gulp = require('gulp');
	merge = require('gulp-concat');
	bsync = require('browser-sync').create();
	concat = require('gulp-concat');
	del = require('del');

var htmlFiles = [
	// './html/head.html',
	// './html/header.html',
	// './html/about.html',
	'./html/main.html',
	// './html/footer.html'
]


function html() {
	return gulp.src(htmlFiles)
				.pipe(concat('all.html'))
				.pipe(gulp.dest('./build'))
				.pipe(bsync.stream());

}

var cssFiles = [
	'./styles/head.css',
	// './styles/header.css',
	'./styles/about.css',
	'./styles/main.css',
	// './styles/footer.css'
]

function styles() {
	return gulp.src(cssFiles)
				.pipe(concat('all.css'))
				.pipe(gulp.dest('./build'))
				.pipe(bsync.stream());

}

// function script() {
	
// }

function serve() {

	bsync.init( {
		server: {
			baseDir: "./build",
			 index: "all.html"
		}
	});

	gulp.watch('./build/**/*.*').on('change', bsync.reload);

	// gulp.watch('./build/**/*.html', bsync.reload);
	// gulp.watch('./build/**/*.css', bsync.reload);
}

function sync() {
	gulp.watch('./html/**/*.html', html);
	gulp.watch('./styles/**/*.css', styles);
}

function clean_html() {
	return del(['build/*.html']);
}
function clean_css() {
	return del(['build/*.css']);
}


gulp.task('html', html);
gulp.task('styles', styles);
// gulp.task('script', script);
// gulp.task('watch', watch);
// gulp.task('bsync', function() {
// 	bsync.init( {
// 		baseDir: "./"
// 	});
// });
gulp.task('clean_html', clean_html);
gulp.task('clean_css', clean_css);
gulp.task('build', gulp.series(clean_html, clean_css, html, styles, gulp.parallel(serve, sync)));