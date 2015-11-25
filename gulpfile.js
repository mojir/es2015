"use strict";

const gulp = require("gulp");
const path = require("path");
const glob = require("glob");
const del = require("del");
const vinylPaths = require("vinyl-paths");
const runSequence = require("run-sequence");
const buildHtml = require("./src/build-html");
const afterN = require("./src/utils").afterN;


const rollup = require("gulp-rollup");
const babel = require("gulp-babel");



gulp.task("default", (cb) => {
    runSequence(
            "clean",
            "transform-js",
            "build-html",
            cb);
});

gulp.task("transform-js", cb => {
    glob("src/tutorials/*", (err, files) => {
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
                .pipe(gulp.dest(path.join("build/tutorials", snippet)))
                .on('end', done);
        });
    });
});

gulp.task("build-html", cb => {
    buildHtml(cb);
});


gulp.task("watch", ["default"], () => {
   gulp.watch('src/**/*.js', ["default"]);
});

gulp.task("clean", () => {
    gulp.src("build", {read: false})
        .pipe(vinylPaths(del));
});

