const autoPrefixer = require('gulp-autoprefixer');

let progect_folder = "build";
let source_folder = "src";


let path={
  build:{
    html: progect_folder + "/",
    css: progect_folder + "/css/",
    js: progect_folder + "/js/",
    img: progect_folder + "/img/",
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


  
let build = gulp.series(clean, gulp.parallel(htmlBuild, cssBuild, jsBuild, imageBuild, fontsBuild));
let watch = gulp.parallel(build, watchFiles, browserSync);



exports.fontsBuild = fontsBuild;
exports.imageBuild = imageBuild;
exports.jsBuild = jsBuild;
exports.cssBuild = cssBuild;
exports.htmlBuild = htmlBuild;
exports.build = build;
exports.watch = watch;
exports.default = watch;