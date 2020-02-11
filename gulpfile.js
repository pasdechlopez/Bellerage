
var gulp = require('gulp');
	merge = require('gulp-concat');
	bsync = require('browser-sync').create();
	concat = require('gulp-concat');
	del = require('del');
	sprity = require('gulp-sprity');
	sass = require('gulp-sass');
	gulpif = require('gulp-if');
	path = require('path');
	sass = require('gulp-sass');
	compiler = require('node-sass');

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
var sassFiles = [
	'./styles/head.scss',
	// './styles/header.css',
	'./styles/about.scss',
	'./styles/main.scss',
	// './styles/footer.css'
]
function scss() {
	return gulp.src(sassFiles)
	  			.pipe(concat('all.scss'))
	 			.pipe(sass()) // Using gulp-sass
	 			.pipe(gulp.dest('./build'))
	  			.pipe(bsync.stream());
  };

function serve() {

	bsync.init( {
		server: {
			baseDir: "./build",
			 index: "all.html"
		}
	});

	gulp.watch('./build/**/*.*').on('change', bsync.reload);
	// gulp.watch('./build/**/*.scss').on('change', bsync.reload);

	// gulp.watch('./sass/**/*.scss', ['sass']);
	// gulp.watch('./build/**/*.html', bsync.reload);
	// gulp.watch('./build/**/*.css', bsync.reload);
}

function sync() {
	gulp.watch('./html/**/*.html', html);
	gulp.watch('./styles/**/*.css', styles);
	gulp.watch('./styles/**/*.scss', scss);
	// gulp.watch('./build/**/*.scss', sass);
}

function clean_html() {
	return del(['build/*.html']);
}
function clean_css() {
	return del(['build/*.css']);
}

gulp.task('scss', scss);
gulp.task('html', html);
gulp.task('styles', styles);
gulp.task('clean_html', clean_html);
gulp.task('clean_css', clean_css);
gulp.task('build', gulp.series(clean_html, clean_css, html, scss,  gulp.parallel(serve, sync)));