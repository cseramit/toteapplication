const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const server = express();
var dividendCalculator = require("./server_scripts/calculator/dividendCalculator");
server.listen('3000');

//Middleware setup
server.use('/assets/background/', express.static(__dirname + '/public/images/background'));
server.use('/assets/icons/', express.static(__dirname + '/public/images/icons'));
server.use('/assets/css/', express.static(__dirname + '/public/css/'));
server.use('/assets/scripts/', express.static(__dirname + '/public/scripts/'));
server.use('/assets/controllers/', express.static(__dirname + '/public/scripts/controllers/'));
server.use('/assets/services/', express.static(__dirname + '/public/scripts/services/'));
server.use('/assets/filters/', express.static(__dirname + '/public/scripts/filters/'));
server.use('/assets/directives/', express.static(__dirname + '/public/scripts/directives/'));
server.use('/assets/templates/', express.static(__dirname + '/public/templates/'));


/* Get hold of http request */
server.get('/', function(req, resp){
    resp.sendFile(__dirname + "/index.html");
});

/* Get hold of http request */
server.post('/calculateWinDividend', jsonParser, function(req, resp){
    var winObject = dividendCalculator.calculateWinDividend(req.body.request.winList, req.body.request.winObject);
    resp.json({"winObject": winObject});
});


/* Get hold of http request */
server.post('/calculatePlaceDividend', jsonParser, function(req, resp){
    var winObject = dividendCalculator.calculatePlaceDividend(req.body.request.placeList, req.body.request.winObject);
    resp.json({"placeObject": winObject});
});