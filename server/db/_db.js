'use strict';

// var config = require('../../config/config.json');
var Sequelize = require('sequelize');

module.exports = new Sequelize("postgres://localhost:5432/caption", {
	logging: false
});