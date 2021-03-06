'use strict';

const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const gcmq = require('gulp-group-css-media-queries');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
const plumber = require('gulp-plumber');
const rigger = require('gulp-rigger');
const stylelint = require('gulp-stylelint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const server = require('browser-sync').create();
const pug = require('gulp-pug');

function html() {
	return src('src/*.html').pipe(rigger()).pipe(htmlmin({ collapseWhitespace: true })).pipe(dest('build'));
}

function styles() {
	return src('src/scss/styles.scss')
		.pipe(plumber())
		.pipe(
			stylelint({
				reporters: [ { formatter: 'string', console: true } ]
			})
		)
		.pipe(sass())
		.pipe(postcss([ autoprefixer() ]))
		.pipe(gcmq())
		.pipe(dest('build/css'))
		.pipe(csso())
		.pipe(rename('styles.min.css'))
		.pipe(dest('build/css'))
		.pipe(server.stream());
}

function scripts() {
	return src('src/js/*.js')
		.pipe(plumber())
		.pipe(babel())
		.pipe(concat('index.js'))
		.pipe(dest('build/js'))
		.pipe(uglify())
		.pipe(rename('index.min.js'))
		.pipe(dest('build/js'));
}

function sprite() {
	return src('src/img/sprite/icon-*.svg')
		.pipe(svgstore({ inlineSvg: true }))
		.pipe(rename('sprite.svg'))
		.pipe(dest('build/img'));
}

function images() {
	return src([ 'src/img/*.{png,jpg,jpeg,svg,pdf,ico}', '!src/img/icons/**/*' ])
		.pipe(
			imagemin([
				imagemin.jpegtran({ progressive: true }),
				imagemin.optipng({ optimizationLevel: 3 }),
				imagemin.svgo({
					plugins: [ { removeViewBox: false }, { cleanupIDs: false } ]
				})
			])
		)
		.pipe(dest('build/img'));
}

function fonts() {
	return src('src/fonts/**/*').pipe(dest('build/fonts'));
}

function watcher(done) {
	watch('src/views/*.*').on('change', series(gulpPug, server.reload));
	watch('src/scss/**/*.scss').on('change', series(styles, server.reload));
	watch('src/js/*.js').on('change', series(scripts, server.reload));

	done();
}

function serve() {
	return server.init({
		server: './build',
		notify: false,
		open: false,
		cors: true,
		ui: false,
		logPrefix: 'DevServer',
		host: 'localhost',
		port: 8080
	});
}

function clean() {
	return del('./build');
}

function prepare() {
	return del([ '**/.gitkeep', 'README.md' ]);
}

function gulpPug() {
	return src('src/views/*.pug')
		.pipe(plumber())
		.pipe(
			pug({
				pretty: true
			})
		)
		.pipe(dest('build'))
		.pipe(server.stream());
}

const build = series(clean, parallel(sprite, images, fonts, html, scripts));

const start = series(build, watcher, gulpPug, styles, serve);

exports.prepare = prepare;
exports.build = build;
exports.start = start;
exports.pug = gulpPug;
