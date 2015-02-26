var models = require('../models');
var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var incident = require('../models/traffic_data');

//GET Area
router.get('/area/:area', function(req, res) {
  console.log(req.param);
  models.incident
    .findAll({
      where: {
        area: req.params.area.toUpperCase()}
        // area: areas[req.params.area]}
      })
    .then(function(incidents){
      res.json(incidents);
    });
  });

//GET Types
router.get('/type/:type', function(req, res) {
  console.log(req.param("type"));
  var types = {
    "stalled": "STALLED/HAZARDOUS VEHICLE",
    "no-collision": "TRAFFIC INCIDENT - NO COLLISION",
    "nuisance-violation": "TRAFFIC NUISANCE OR PARKING VIOLATION",
    "collision": "MOTOR VEHICLE COLLISION",
    "hazardous": "HAZARDOUS DRIVER"
  };
  models.incident
    .findAll({
      where: {
        type: types[req.params.type]}
    })
    .then(function(incidents) {
      res.json(incidents);
    });
});


router.get('/incidents', function(req, res) {
  // console.log(req.param("incidents"));
  var date = new Date();
  
    console.log(date);
    models.incident
      .findAll ({
        where: {
          date: {
            gt: new Date(date.setFullYear(date.getFullYear()-2))
          }
        }
      })
      .then(function(incidents) {
        res.json(incidents);
      });
  });

module.exports = router;