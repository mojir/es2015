const express = require("express");
const server = express();
const argv = require("yargs")
                .alias("p", "port")
                .default("port", 3000)
                .argv;

server.use(express.static(__dirname + "/../web-assets"));
server.use(express.static(__dirname + "/../build/public"));

const instance = server.listen(argv.port, () => {
    
    console.log(`Listening on port ${instance.address().port}`);
});


