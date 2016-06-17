'use strict';
var db = require('../_db.js');
var Sequelize = require('sequelize');

var Subtitle = db.define('subtitle', {
    url: {
    	type: Sequelize.STRING,
    	allowNull: false,
    	notEmpty: true
    },

    content: {
    	type: Sequelize.TEXT,
    	allowNull: false,
    	notEmpty: true
    }
    
});

module.exports = Subtitle;