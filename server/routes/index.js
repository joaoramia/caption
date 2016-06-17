var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var Subtitle = require('../db/models/subtitle');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.get('/', function(req, res, next){
  Subtitle.findAll({})
  .then(function(response){
    res.send(response);
  })
  .catch(next);
})

router.post('/', function(req, res, next){
  console.log("POSTED: ", req.body);
  Subtitle.create(req.body)
  .then(function(response){
    res.send(response.data);
  })
  .catch(next);
})

module.exports = router;