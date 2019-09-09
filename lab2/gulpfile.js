const gulp = require("gulp");
const imagemin = require('gulp-imagemin');
const concatenate = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const autoPrefix = require("gulp-autoprefixer");
const gulpSASS = require("gulp-sass");
const rename = require("gulp-rename");

const sassFiles = [
  "./src/styles/variables.scss",
  "./src/styles/custom.scss",
  
];

const vendorJsFiles = [
  "./node_modules/jquery/dist/jquery.js",
  "./node_modules/bootstrap/dist/js/bootstrap.js"
];

gulp.task('sass', async () => {
  gulp
    .src(sassFiles)
    .pipe(gulpSASS())
    .pipe(concatenate("styles.css"))
    .pipe(gulp.dest("./public/css/"))

  });

  gulp.task('js:vendor', async () => {
    gulp
    .src(vendorJsFiles)
    .pipe(concatenate("vendor.min.js"))
    .pipe(gulp.dest("./public/js/"));
    
    });


  
  gulp.task('img', async() =>    
   gulp.src('src/images/*')        
   .pipe(imagemin())         
   .pipe(gulp.dest('./public/images')) );

  gulp.task("watch", async() => {   gulp.watch(sassFiles, gulp.series("sass")); });
  gulp.task('default', gulp.series('watch', 'sass', 'js:vendor', 'img'));
