"use strict";

const handlebars = require("handlebars");
const fs = require("fs");
const tutorialsDir = __dirname + "/tutorials";
const transpiledDir = __dirname + "/../build/tutorials";
const templatesDir = __dirname + "/../web-assets";
const publicDir = __dirname + "/../build/public";
const path = require("path");
const cp = require("child_process");

module.exports = cb => {
    createPublicDir();
    const tutorials = getTutorials();
    const data = {tutorials};
    const templateSource = fs.readFileSync(path.join(templatesDir, "index.hbs"), "utf-8");
    const template = handlebars.compile(templateSource);
    const indexContent = template(data);
    
    fs.writeFileSync(path.join(publicDir, "index.html"), indexContent);
    cb();
};

function createPublicDir() {
    try {
        fs.mkdirSync(publicDir);
    } catch (e) {
        if (e.code !== 'EEXIST') {
            throw e;
        }
    }
}


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
        if (tutorial.sources.length) {
            tutorial.sources[0].index = true;
        }
        tutorial.transpiledSource = getTranspiledSource(file);
        tutorial.output = getOutput(file);
    });
    return tutorials;
}

function getOutput(tutorial) {
    const file = path.join(transpiledDir, tutorial, "index.js");
    return cp.execFileSync("node", [file], {encoding: "utf8"});
}

function getTranspiledSource(tutorial) {
    const dir = path.join(transpiledDir, tutorial);
    const fileName = "index.js";
    const fullPath = path.join(dir, fileName);
    
    return {
        path: fullPath,
        name: fileName,
        content: fs.readFileSync(fullPath, "utf-8")
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
    });

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


