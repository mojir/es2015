"use strict";

const gulp = require("gulp");
const path = require("path");
const glob = require("glob");
const del = require("del");
const vinylPaths = require("vinyl-paths");
const runSequence = require("run-sequence");
const buildHtml = require("./src/build-html");
const afterN = require("./src/utils").afterN;
const watch = require("gulp-watch");
const nodemon = require("gulp-nodemon");
const browserSync = require("browser-sync");

const rollup = require("gulp-rollup");
const webpack = require("gulp-webpack");
const babel = require("gulp-babel");

gulp.task("default", cb => {
    runSequence(
            "clean",
            "transform-js",
            "build-html",
            cb);
});

gulp.task("transform-js", cb => {
    glob("tutorials/*", (err, files) => {
        const done = afterN(files.length, cb);
        files.forEach(dir => {
            let snippet = path.basename(dir);
            let index = path.join(dir, "index.js");
            gulp.src(index)
                .pipe(webpack({
                    output: {
                        filename: "index.js"
                    },
                    module: {
                        loaders: [
                            {
                                exclude: /node_modules/,
                                loader: "babel",
                                query: {
                                    presets: ["es2015"],
                                    plugins: ["transform-runtime"]
                                }
                            }
                        ]
                    }
                }))
                //.pipe(babel({
                    //presets: ["es2015"],
                    //plugins: ["transform-runtime"]
                //}))
                .pipe(gulp.dest(path.join("build/tutorials", snippet)))
                .on('end', done);
        });
    });
});

gulp.task("build-html", (cb) => {
    buildHtml(cb);
});


gulp.task("serve", () => {
   runSequence("default", "browser-sync");
   watch(['tutorials/**/*.js'], () => {
       runSequence("default", "reload-browser-sync");
   });
   watch(['web-assets/**/*.hbs'], () => {
       runSequence("build-html");
   });
});

gulp.task("reload-browser-sync", () => {
    browserSync.reload();
});

gulp.task("clean", () => {
    return gulp.src("build", {read: false})
        .pipe(vinylPaths(del));
});

gulp.task('nodemon', cb => {
	let called = false;
	return nodemon({script: 'src/server.js'}).on('start', () => {
		if (!called) {
			called = true;
			cb();
		}
	});
});

gulp.task('browser-sync', ["nodemon"], () => {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        port: 4000,
        files: ["web-assets/**/*.{js,css}", "build/public/index.html"]
    });
});


gulp.task("nodemon", cb => {
    var called = false;
    return nodemon({

        // nodemon our expressjs server
        script: "src/server.js",

        // watch core server file(s) that require server restart on change
        watch: ["src/*.js"]
    })
    .on("start", function onStart() {
        // ensure start only got called once
        if (!called) { cb(); }
        called = true;
    })
    .on("restart", function onRestart() {
        // reload connected browsers after a slight delay
        setTimeout(function reload() {
            browserSync.reload({
                stream: false
            });
        }, 500);
    });
});
