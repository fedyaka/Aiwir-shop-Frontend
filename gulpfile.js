
let progect_folder = "build";
let source_folder = "src";


let path={
  build:{
    html: progect_folder + "/",
    css: progect_folder + "/css/",
    js: progect_folder + "/js/",
    img: progect_folder + "/img/",
    icon: progect_folder + "/img/icons/",
    fonts: progect_folder + "/fonts/"
  },
  src:{
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
    scss: source_folder + "/scss/style.scss",
    css: source_folder + "/scss/css/*.css",
    js: [source_folder + "/js/**/*.js", "!" + source_folder + "/js/**/*.min.js"],
    js_min: source_folder + "/js/**/*.min.js",
    json: source_folder + "/js/**/*.json",
    img: source_folder + "/img/**/*",
    icon: source_folder + "/img/logo.png",
    fonts: source_folder + "/fonts/*"
  },
  watch:{
    html: source_folder + "/**/*.html",
    scss: source_folder + "/scss/**/*",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*",
  },
  clean: "./" + progect_folder + "/"
}

let {src, dest} = require('gulp'),
  gulp = require('gulp'),
  browser_sync = require('browser-sync').create(),
  file_include = require('gulp-file-include'),
  del = require('del'),
  scss = require('gulp-sass')(require('sass')),
  auto_prefixer = require('gulp-autoprefixer'),
  group_media = require('gulp-group-css-media-queries'),
  clean_css = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify-es').default,
  newer = require('gulp-newer'),
  webp = require('gulp-webp'),
  webp_html = require('gulp-webp-html'),
  webp_css = require('gulp-webpcss');



function browserSync(){
  browser_sync.init({
    server:{
      baseDir: "./" + progect_folder + "/"
    },
    port: 3000,
    notify: false
  })
}

function htmlBuild(){
  return src(path.src.html)
    .pipe(file_include())
    .pipe(webp_html())
    .pipe(dest(path.build.html))
    .pipe(browser_sync.stream())
}

function cssBuild(){
  return src(path.src.scss)
    .pipe(scss({outputStyle: 'expanded'}).on('error', scss.logError))
    .pipe(group_media())
    .pipe(webp_css({
      webpClass: ".webp",
      noWebpClass: ".no-webp"
    }))
    .pipe(auto_prefixer({
      overrideBrowserslist: ['last 5 version'],
      cascade: true
    }))
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(dest(path.build.css))



    .pipe(src(path.src.css))
    .pipe(dest(path.build.css))

    .pipe(browser_sync.stream())
}

function jsBuild(){
  return src(path.src.js)
    .pipe(file_include())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(rename({
      extname: ".min.js"
    }))
    .pipe(dest(path.build.js))

    .pipe(src(path.src.js_min))
    .pipe(dest(path.build.js))

    .pipe(src(path.src.json))
    .pipe(dest(path.build.js))
    .pipe(browser_sync.stream())
}


function imageBuild(){
  return src(path.src.img)
    .pipe(newer(path.build.img))
    .pipe(webp())
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(dest(path.build.img))
    .pipe(browser_sync.stream())
}


var realFavicon = require ('gulp-real-favicon');
var fs = require('fs');

// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
function generate_favicon(done) {
	realFavicon.generateFavicon({
		masterPicture: path.src.icon,
		dest: path.build.icon,
		iconsPath: 'icons/',
		design: {
			ios: {
				pictureAspect: 'backgroundAndMargin',
				backgroundColor: '#96ddeb',
				margin: '14%',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {
				design: 'raw'
			},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#2d89ef',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: false,
						rectangle: false
					}
				}
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#ffffff',
				manifest: {
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			},
			safariPinnedTab: {
				pictureAspect: 'silhouette',
				themeColor: '#5bbad5'
			}
		},
		settings: {
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false,
			readmeFile: false,
			htmlCodeFile: false,
			usePathAsIs: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function() {
		done();
	});
};

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
function inject_favicon_markups() {
	return src(progect_folder + "/**/*.html")
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(dest(path.build.html))
    .pipe(browser_sync.stream());
};

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
function check_for_favicon_update(done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function(err) {
		if (err) {
			throw err;
		}
	});
};



function fontsBuild(){
  return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
    .pipe(browser_sync.stream())
}

function watchFiles(){
  gulp.watch([path.watch.html], htmlBuild);
  gulp.watch([path.watch.scss], cssBuild);
  gulp.watch([path.watch.js], jsBuild);
  gulp.watch([path.watch.img], imageBuild);
}

function clean(){
  return del(path.clean);
}


  
let build = gulp.series(clean, gulp.parallel(htmlBuild, cssBuild, jsBuild, imageBuild, fontsBuild, generate_favicon), inject_favicon_markups, check_for_favicon_update);
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.generate_favicon = generate_favicon;
exports.check_for_favicon_update = check_for_favicon_update;
exports.inject_favicon_markups = inject_favicon_markups;
exports.fontsBuild = fontsBuild;
exports.imageBuild = imageBuild;
exports.jsBuild = jsBuild;
exports.cssBuild = cssBuild;
exports.htmlBuild = htmlBuild;
exports.build = build;
exports.watch = watch;
exports.default = watch;