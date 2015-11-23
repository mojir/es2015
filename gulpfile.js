"use strict";

const gulp = require("gulp");
const path = require("path");
const glob = require("glob");
const del = require("del");
const vinylPaths = require("vinyl-paths");


const rollup = require("gulp-rollup");
const babel = require("gulp-babel");



gulp.task("default", function (cb) {
    glob("src/*", (err, files) => {
        const done = afterN(files.length, cb);
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

gulp.task("clean", () => {
    gulp.src("build", {read: false})
        .pipe(vinylPaths(del));
});

function afterN(n, fn) {
    return function() {
        n--;
        if (n === 0) {
            fn();
        }
    };
}



