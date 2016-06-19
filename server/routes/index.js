var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var Filter = require('bad-words');
var filter = new Filter();

var Subtitle = require('../db/models/subtitle');

filter.addWords(["suck", "sucks", "hate", "hates"]);

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.get('/', function(req, res, next){
  Subtitle.findAll({})
  .then(function(response){
    res.send(response);
  })
  .catch(next);
})

router.get('/:url', function(req, res, next){
  Subtitle.findAll({where: {url: req.params.url}})
  .then(function(response){
    res.send(response);
  })
  .catch(next);
})

router.post('/', function(req, res, next){
  req.body.content = filter.clean(req.body.content);
  Subtitle.create(req.body)
  .then(function(response){
    res.send(response.data);
  })
  .catch(next);
})

module.exports = router;