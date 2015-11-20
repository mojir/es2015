"use strict";

const gulp = require("gulp");
const path = require("path");
const fs = require("fs");
const glob = require("glob");
const watch = require('gulp-watch');

const rollup = require("gulp-rollup");
const babel = require("gulp-babel");



gulp.task("default", function () {
    glob("src/*", (err, files) => {
        const done = afterN(files.length, () => { console.log("DONE"); });
        files.forEach(dir => {
            let snippet = path.basename(dir);
            let index = path.join(dir, "index.js");
            gulp.src(index, {read: false})
            .pipe(rollup())
            .pipe(babel({
                presets: ["es2015"],
                plugins: ["transform-runtime"]
            }))
            .pipe(gulp.dest(path.join("build", snippet)))
            .on('end', done);
        });
    });
});


gulp.task("watch", ["default"], () => {
   gulp.watch('src/**/*.js', ["default"]);
});

function afterN(n, fn) {
    return function() {
        n--;
        if (n === 0) {
            fn();
        }
    }
}



