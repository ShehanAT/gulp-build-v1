
'use strict'

var gulp = require('gulp'),//importing all the third party gulp libraries 
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

gulp.task('clean', function(){//task that deletes all the files in the dist folder
    return del([
        'dist','js/all.min.js*','sass/all.min.css'
    ]);
});
gulp.task('scripts', function(){//task that concats, minifies and copys the js files into the dist/scripts folder 
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

gulp.task('styles', function(){//task that compiles, minifies, and copys the sass files into the dist/styles folder
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

gulp.task('images',function(){//task that optimizes the image size and copys them to the dist/content folder
    return gulp.src('./images/*')
    .pipe(image())
    .pipe(gulp.dest('./dist/content'))
});

gulp.task('watchSass', function(){//task that watch any changes to the sass files and recompiles on change
    gulp.watch(['./sass/circle/**/*.sass','./sass/*.scss','./sass/circle/*.sass'],['styles'])
})

gulp.task('build', ['scripts','styles','images','watchSass'],function(callback){//task that runs the above tasks synchronously
    return gulp.src([], {base:'./'})
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean'], function(){//task that runs clean first then build and connects to the server on port 3000
    gulp.start('build', function(){ 
    });
    connect.server({  
    });
});

