
'use strict'

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    copy = require('gulp-copy'),
    maps = require('gulp-sourcemaps'),
    image = require('gulp-imagemin'),
    del = require('del'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync');

var runSequence = require('run-sequence');

gulp.task('clean', function(){
    return del([
        'dist','js/all.min.js*','sass/all.min.css'
    ]);
});
gulp.task('scripts', function(){//task that concats the js files 
    return gulp.src([
        'js/circle/autogrow.js', 
        'js/circle/circle.js'
        //creates a readable stream of data
    ])
    .pipe(maps.init())
    .pipe(concat('./all.min.js'))
    .pipe(uglify())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('./dist/scripts'))
});

gulp.task('styles', function(){//compiles and minifies sass files
    return gulp.src([
        
        "./sass/global.scss",
        "./sass/_variables.scss",
        "./sass/circle/_components.sass",
        "./sass/circle/_core.sass"
                ])
        .pipe(sass({outputStyle:'compressed'}))
        .pipe(rename('all.min.css'))
        .pipe(maps.init())
        .pipe(concat('./all.min.css'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('./dist/styles'))
});

gulp.task('images',function(){
    return gulp.src('./images/*')
    .pipe(image())
    .pipe(gulp.dest('./dist/content'))
});

gulp.task('watchSass', function(){
    gulp.watch(['./sass/circle/**/*.sass','./sass/*.scss','./sass/circle/*.sass'],['styles'])
    gulp.watch('js/')
})

gulp.task('build', ['scripts','styles','images'],function(callback){
    return gulp.src(["index.html","sass/_variables.scss","sass/global.scss"], {base:'./'})
        .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchSass']);

gulp.task('default', ['clean'], function(){
    gulp.start('build', function(){
        connect.server({
            
        });
    });
});

