const gulp            = require('gulp');
const fs              = require('fs');
const babel           = require('gulp-babel');
const browserSync     = require('browser-sync').create();
const Builder = require('systemjs-builder');

function es5() {
  return new Promise( (res,rej)=>{
    gulp.src('src/es6/le-promise.js')
      .pipe(gulp.dest('dist/es6'))
      .pipe(babel({
        presets: ['es2015']
      }))
          .on('error', rej)
      .pipe(gulp.dest('dist/es5'))
          .on('end', res);
  });
}
gulp.task('es5',es5);

function es5_copy() {
  return new Promise( (res,rej)=>{
    fs.access('src/es5.html',fs.constants.R_OK,function(err) {
      if ( err ) rej(err);
      else {
        fs.access('src/systemjs.config.js',fs.constants.R_OK,function() {
          if ( err ) rej(err);
          else {
            gulp.src(['src/es5.html','src/systemjs.config.js'])
              .pipe(gulp.dest('dist'))
              .on('end',res)
              .on('error',rej);
            }
          });
        }
      });
  });
}
gulp.task('es5:copy',es5_copy);

function es5_serve() {
  return es5().then(es5_copy)
  .then(ignore=>{
    return new Promise( (res,rej) => {
        browserSync.init({
          server: {
            baseDir: "dist",
            index: "es5.html",
            routes: {
              "/node_modules":"node_modules"
            }
          }
        },res);
      });
  });
}
gulp.task('es5:serve',es5_serve);

function es5_serve_watch() {
  es5_serve().then(ignore=>{
    gulp.watch(['src/**/*.html','src/systemjs.config.js'],function(event){
      es5_copy().then(browserSync.reload);
    });
    gulp.watch('src/es6/le-promise.js',function(event) { es5().then(browserSync.reload);});
  });
}
gulp.task('es5:serve:watch',es5_serve_watch);


function polyfill() {
  es5().then(
    ignore=>{
      return new Promise( (res,rej)=>{
        gulp.src('src/es6/promise-polyfill-wrapper.js')
          .pipe(babel({
            'presets':['es2015']
          }))
          .on('error',function(err) {this.emit('end');rej();})
          .pipe(gulp.dest('dist/es5'))
          .on('end',function() {
            const builder = new Builder('dist','src/systemjs.config.js');
            builder.buildStatic('es5/promise-polyfill-wrapper.js','dist/polyfill/promise.js',{
              minify: false,
              mangle: false
            })
            .then(function(ignore) {
              return new Promise( (res2,rej2)=>{
                  fs.unlink('dist/es5/promise-polyfill-wrapper.js',err=>{
                    if ( err ) rej2(err);
                    else {
                      
                    }
                  });
                });
            },rej);
          });
      });
  });
}
gulp.task('polyfill',polyfill);
