'use strict';
var db = require('./_db');
module.exports = db;

var Subtitle = require('./models/subtitle');

db.sync();