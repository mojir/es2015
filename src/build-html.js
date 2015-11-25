"use strict";

const handlebars = require("handlebars");
const fs = require("fs");
const tutorialsDir = __dirname + "/tutorials";
const transpiledDir = __dirname + "/../build/tutorials";
const afterN = require("./utils").afterN;
const path = require("path");

module.exports = cb => {
    const tutorials = getTutorials();
    let data = {tutorials};
};


function getTutorials() {
    const files = fs.readdirSync(tutorialsDir);
    const tutorials = [];

    files.forEach(file => {
        const tutorial = {
            name: file,
            sources: []
        };
        tutorials.push(tutorial);
        parseTutorial(file, "", tutorial.sources);
        tutorial.transpiledSource = getTranspiledSource(file);
    });

    return tutorials;
}

function getTranspiledSource(tutorial) {
    const dir = path.join(transpiledDir, tutorial);
    const file = fs.readdirSync(dir)[0];
    
    return {
        path: path.join(dir, file),
        name: file,
        content: fs.readFileSync(path.join(dir, file), "utf-8")
    };
}

function parseTutorial(tutorial, subPath, scripts) {
    const dir = path.join(tutorialsDir, tutorial, subPath);
    const files = fs.readdirSync(dir);
    const dirs = files.filter(file => fs.lstatSync(path.join(dir, file)).isDirectory());
    const jsFiles = files.filter(file => {
        if (!file.match(/\.js$/)) {
            return false;
        }
        return fs.lstatSync(path.join(dir, file)).isFile();
    })

    jsFiles.map(jsFile => path.join(dir, jsFile)).forEach(jsFile => {
        const tutorial = {
            path: jsFile,
            name: path.join(subPath, path.basename(jsFile)),
        };

        tutorial.content = fs.readFileSync(jsFile, "utf-8");
        scripts.push(tutorial);
    });

    dirs.forEach(dir => parseTutorial(tutorial, path.join(subPath, dir), scripts));
}


