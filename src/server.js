const express = require("express");
const server = express();








server.use(express.static(__dirname + "/../public"));

const instance = server.listen(3000, () => {
    console.log(`Listening on port ${instance.address().port}`);
});


