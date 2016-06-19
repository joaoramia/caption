'use strict';
var chalk = require('chalk');
var db = require('./db');
var fs = require('fs');
var https = require('https');
var app = require('./app');
var path = require('path');

// HTTPS was created in order to fix security issues with Youtube.

var server = https.createServer({
  cert: fs.readFileSync(path.join(__dirname + '/cert.pem')),
  key: fs.readFileSync(path.join(__dirname + '/key.pem'))
});


var createApplication = function () {
    var app = require('./app')(db);
    //for http server
    server.on('request', app); // Attach the Express application.
};

var startServer = function () {

    var PORT = process.env.PORT || 1337;

    //for http server
    server.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });

};

db.sync().then(createApplication).then(startServer).catch(function (err) {
    console.error(chalk.red(err.stack));
    process.kill(1);
});
