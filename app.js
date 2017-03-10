const express = require("express");
const server = express();

server.listen('3000');
server.use('/assets/scripts/', express.static(__dirname + '/public/scripts/'));
server.use('/assets/controllers/', express.static(__dirname + '/public/scripts/controllers/'));
server.use('/assets/services/', express.static(__dirname + '/public/scripts/services/'));
server.use('/assets/filters/', express.static(__dirname + '/public/scripts/filters/'));
server.use('/assets/templates/', express.static(__dirname + '/public/templates/'));



server.get('/', function(req, resp){
    resp.sendFile(__dirname + "/index.html");
});
